"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

type ChatState = Record<string, unknown>;

type Recommendation = {
  amc: string;
  fundName: string;
  reasons: string[];
};

type ChatResponse = {
  reply: string;
  state: ChatState;
  inferredRisk?: "low" | "moderate" | "high";
  recommendations?: Recommendation[];
  notes?: string[];
  error?: string;
};

type Msg = { id: string; role: "user" | "bot"; text: string };

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:-0.2s]" />
    <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce [animation-delay:-0.1s]" />
    <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" />
  </div>
);

type WealthAdvisoryChatClientProps = {
  embedded?: boolean;
};

export default function WealthAdvisoryChatClient({ embedded = false }: WealthAdvisoryChatClientProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ChatState>({});
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [notes, setNotes] = useState<string[] | null>(null);
  const [inferredRisk, setInferredRisk] = useState<string | null>(null);
  const [showQuickPrompts, setShowQuickPrompts] = useState(true);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const callApi = async (message: string) => {
    const res = await fetch("/api/wealth-advisory/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, state }),
    });
    const data = (await res.json()) as ChatResponse;
    if (!res.ok || data.error) throw new Error(data.error || `Request failed (${res.status}).`);
    return data;
  };

  useEffect(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, recommendations]);

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || loading) return;

    setInput("");
    setRecommendations(null);
    setNotes(null);
    setInferredRisk(null);
    setShowQuickPrompts(false);

    setMessages((prev) => [...prev, { id: uid(), role: "user", text }]);
    setLoading(true);
    try {
    const data = await callApi(text);
      setState(data.state ?? {});
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text: data.reply }]);
      if (data.recommendations?.length) setRecommendations(data.recommendations);
      if (data.notes?.length) setNotes(data.notes);
      if (data.inferredRisk) setInferredRisk(data.inferredRisk);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "bot", text: e instanceof Error ? e.message : "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    await sendMessage(input);
  };

  const quickPrompts = [
    "Recommend top 5 mutual funds for me",
    "I want SIP-based mutual fund suggestions",
    "Suggest best funds for a doctor for 10 years",
    "Filter funds for lumpsum investment with low risk",
  ];

  if (embedded) {
    return (
      <div className="h-full flex flex-col p-4 gap-3">
        <div className="grid gap-2 sm:grid-cols-2" suppressHydrationWarning>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => {
                void sendMessage(prompt);
              }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200 hover:border-[#b78622]/40 hover:shadow-sm transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950/40 dark:to-gray-900 p-4 overflow-y-auto flex-1 min-h-0">
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-4 text-sm text-gray-600 dark:text-gray-300">
                Select a quick option above or type your details below to begin.
              </div>
            ) : null}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                  m.role === "user"
                    ? "ml-auto bg-[#b78622] text-white"
                    : "mr-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
              </div>
            ))}

            {loading ? (
              <div className="mr-auto inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
                <TypingIndicator />
                Assistant is typing
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            placeholder="Type your answer..."
            rows={3}
            className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b78622]/40"
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={!canSend}
            className="inline-flex items-center gap-2 rounded-xl bg-[#b78622] hover:bg-[#a06f16] disabled:opacity-60 text-white px-4 py-3 text-sm font-semibold"
          >
            <SendHorizonal className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-3xl overflow-hidden border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-gray-900 ${
        embedded ? "h-full" : "shadow-[0_30px_80px_-50px_rgba(15,17,23,0.5)]"
      }`}
      suppressHydrationWarning
    >
      {!embedded ? (
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(183,134,34,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.15),transparent_45%)]" />
          <div className="relative bg-gradient-to-r from-[#0f1117] to-[#1c2230] p-6 sm:p-8 text-white">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">Planitt Wealth Advisory</p>
                <h2 className="text-2xl sm:text-3xl font-bold mt-2">Dataset‑Driven Mutual Fund Bot</h2>
                <p className="text-white/80 mt-2 text-sm max-w-2xl">
                  Recommends strictly from your uploaded dataset. Commissions are used only for internal ranking and are never shown.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white/80">
                <div>
                  <div className="text-white/90 font-semibold">Modes</div>
                  <div>SIP · Lumpsum</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <div className="text-white/90 font-semibold">Status</div>
                  <div>Live Preview</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`p-6 sm:p-8 grid lg:grid-cols-[1.4fr_0.9fr] gap-6 h-full ${
          embedded ? "lg:grid-cols-1" : ""
        }`}
      >
        <div className="min-h-0">
          {showQuickPrompts ? (
            <div className="mb-4 grid gap-2 sm:grid-cols-2" suppressHydrationWarning>
              {[
                "Recommend top 5 mutual funds for me",
                "I want SIP-based mutual fund suggestions",
                "Suggest best funds for a doctor for 10 years",
                "Filter funds for lumpsum investment with low risk",
              ].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    void sendMessage(prompt);
                  }}
                  className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 px-4 py-3 text-left text-sm font-medium text-gray-800 dark:text-gray-200 hover:border-[#b78622]/40 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span>{prompt}</span>
                    <span className="text-xs text-[#b78622]/80 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </button>
              ))}
            </div>
          ) : null}

          <div
            className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950/40 dark:to-gray-900 p-4 overflow-y-auto ${
              embedded ? "h-[45vh] sm:h-[52vh]" : "h-[50vh] sm:h-[460px]"
            }`}
          >
            <div className="space-y-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    m.role === "user"
                      ? "ml-auto bg-[#b78622] text-white"
                      : "mr-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>
                </div>
              ))}

              {loading ? (
                <div className="mr-auto inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
                  <TypingIndicator />
                  Assistant is typing
                </div>
              ) : null}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Type your answer…"
              rows={3}
              className="flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#b78622]/40"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={!canSend}
              className="inline-flex items-center gap-2 rounded-xl bg-[#b78622] hover:bg-[#a06f16] disabled:opacity-60 text-white px-4 py-3 text-sm font-semibold"
            >
              <SendHorizonal className="h-4 w-4" />
              Send
            </button>
          </div>
        </div>

        <div className={`space-y-4 ${embedded ? "hidden" : "hidden lg:block"}`}>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">How it works</h3>
            <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc pl-5">
              <li>Collects your profile details in a multi‑turn flow.</li>
              <li>Filters strictly using dataset fields (risk, SIP/Lumpsum).</li>
              <li>Ranks internally by commission percentage (never shown).</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Inferred profile</h3>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {inferredRisk ? `Risk profile: ${inferredRisk}` : "Share your profession to infer risk preference."}
            </p>
          </div>

          {recommendations?.length ? (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 p-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Top recommendations</h3>
              <div className="mt-3 space-y-3">
                {recommendations.map((r) => (
                  <div key={`${r.amc}-${r.fundName}`} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/30 p-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{r.fundName}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{r.amc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {notes?.length ? (
            <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/25 p-5">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">Notes</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-amber-900/80 dark:text-amber-100/80 space-y-1">
                {notes.map((n, idx) => (
                  <li key={idx}>{n}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
