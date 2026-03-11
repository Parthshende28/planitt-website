"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  RefreshCcw,
  SendHorizonal,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

type ChatState = Record<string, unknown>;

type Recommendation = {
  amc: string;
  fundName: string;
  reasons: string[];
  explanation?: string;
  suggestedInvestment?: number | null;
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

type WealthAdvisoryChatClientProps = {
  embedded?: boolean;
};

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

const quickPrompts = [
  "Recommend top 5 mutual funds for me",
  "I want SIP-based mutual fund suggestions",
  "Suggest best funds for a doctor for 10 years",
  "Filter funds for lumpsum investment with low risk",
  "Show SIP-only funds (exclude lumpsum)",
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.2s] dark:bg-gray-500" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.1s] dark:bg-gray-500" />
    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500" />
  </div>
);

export default function WealthAdvisoryChatClient({ embedded = false }: WealthAdvisoryChatClientProps) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ChatState>({});
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [notes, setNotes] = useState<string[] | null>(null);
  const [selectedQuickPrompt, setSelectedQuickPrompt] = useState<string | null>(null);
  const [expandedQuickPrompts, setExpandedQuickPrompts] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);
  const hasConversation = messages.length > 0 || loading;
  const visibleQuickPrompts = expandedQuickPrompts ? quickPrompts : quickPrompts.slice(0, 3);

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

  const reset = () => {
    setMessages([]);
    setInput("");
    setState({});
    setRecommendations(null);
    setNotes(null);
    setSelectedQuickPrompt(null);
    setExpandedQuickPrompts(false);
  };

  const sendMessage = async (rawText: string, isQuickPrompt = false) => {
    const text = rawText.trim();
    if (!text || loading) return;

    setInput("");
    setRecommendations(null);
    setNotes(null);
    if (isQuickPrompt) setSelectedQuickPrompt(text);

    setMessages((prev) => [...prev, { id: uid(), role: "user", text }]);
    setLoading(true);

    try {
      const data = await callApi(text);
      setState(data.state ?? {});
      setMessages((prev) => [...prev, { id: uid(), role: "bot", text: data.reply }]);
      if (data.recommendations?.length) setRecommendations(data.recommendations);
      if (data.notes?.length) setNotes(data.notes);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages, recommendations, notes]);

  const starterSection = (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Quick Start</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Pick a starter or type your own question below.
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-gray-700 shadow-sm sm:inline-flex dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200">
          <Clock3 className="h-3.5 w-3.5 text-[#b78622]" />
          Guided flow
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {visibleQuickPrompts.map((prompt) => (
          <motion.button
            key={prompt}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => {
              void sendMessage(prompt, true);
            }}
            className="group rounded-[1.4rem] border border-gray-200 bg-white p-4 text-left shadow-sm transition-all hover:border-[#b78622]/45 hover:shadow-[0_18px_38px_-28px_rgba(183,134,34,0.7)] dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-medium leading-6 text-gray-800 dark:text-gray-100">{prompt}</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-500 transition-colors group-hover:border-[#b78622]/30 group-hover:bg-[#b78622] group-hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {quickPrompts.length > 3 ? (
        <button
          type="button"
          onClick={() => setExpandedQuickPrompts((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-xl border border-dashed border-[#b78622]/35 px-4 py-2.5 text-sm font-semibold text-[#b78622] transition-colors hover:bg-[#b78622]/5"
        >
          {expandedQuickPrompts ? "Show fewer options" : `Show ${quickPrompts.length - 3} more options`}
        </button>
      ) : null}
    </div>
  );

  const activeSessionBar = hasConversation ? (
    <div className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">Current Session</p>
        <div className="mt-1 inline-flex max-w-full items-center gap-2 rounded-full bg-[#b78622]/10 px-3 py-1.5 text-xs font-semibold text-[#a67417] dark:text-[#e7c973]">
          <WandSparkles className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{selectedQuickPrompt || "Custom wealth query"}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:border-[#b78622]/30 hover:text-[#b78622] dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
      >
        <RefreshCcw className="h-3.5 w-3.5" />
        New chat
      </button>
    </div>
  ) : null;

  const chatThread = (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.8rem] border border-gray-200 bg-white shadow-[0_24px_60px_-44px_rgba(15,17,23,0.45)] dark:border-gray-800 dark:bg-gray-950/60">
      <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Conversation</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#111318] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white">
            <ShieldCheck className="h-3.5 w-3.5 text-[#f2d789]" />
            Guided
          </span>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <div className="space-y-3">
          {!hasConversation ? (
            <div className="rounded-[1.4rem] border border-dashed border-gray-200 bg-gray-50/80 p-4 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-300">
              <p className="font-semibold text-gray-900 dark:text-white">Start with a prompt or ask your question directly.</p>
              <p className="mt-1.5 leading-relaxed">Best results come from adding your amount, duration, goal, and preferred investment mode.</p>
            </div>
          ) : null}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[92%] rounded-[1.45rem] px-4 py-3 text-sm leading-relaxed shadow-sm ${
                m.role === "user"
                  ? "ml-auto bg-[linear-gradient(135deg,#cc9a3d_0%,#b78622_55%,#8f651a_100%)] text-white"
                  : "mr-auto border border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
              }`}
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] opacity-60">
                {m.role === "user" ? "You" : "Advisor"}
              </div>
              <div className="whitespace-pre-line">{m.text}</div>
            </div>
          ))}

          {loading ? (
            <div className="mr-auto inline-flex items-center gap-2 rounded-[1.45rem] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
              <TypingIndicator />
              Assistant is typing
            </div>
          ) : null}

          {recommendations?.length ? (
            <div className="rounded-[1.45rem] border border-[#b78622]/20 bg-[#b78622]/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#946815] dark:text-[#e7c973]">
                <Sparkles className="h-4 w-4" />
                Top recommendations
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {recommendations.map((r) => (
                  <div
                    key={`${r.amc}-${r.fundName}`}
                    className="rounded-[1.2rem] border border-[#b78622]/15 bg-white p-3 shadow-sm dark:bg-gray-900"
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{r.fundName}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">{r.amc}</p>
                    {r.suggestedInvestment ? (
                      <div className="mt-3 rounded-xl bg-[#b78622]/10 px-3 py-2 text-xs font-semibold text-[#946815] dark:text-[#e7c973]">
                        Suggested Investment: ₹{r.suggestedInvestment.toLocaleString("en-IN")}
                      </div>
                    ) : null}
                    {r.explanation ? (
                      <p className="mt-3 text-xs leading-5 text-gray-600 dark:text-gray-300">{r.explanation}</p>
                    ) : r.reasons?.length ? (
                      <ul className="mt-2 space-y-1">
                        {r.reasons.slice(0, 2).map((reason) => (
                          <li key={reason} className="text-xs text-gray-600 dark:text-gray-300">
                            {reason}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {notes?.length ? (
            <div className="rounded-[1.3rem] border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-900/80 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-100/75">
              <p className="mb-2 font-semibold uppercase tracking-[0.22em]">Notes</p>
              <ul className="space-y-1.5">
                {notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );

  const composer = (
    <div className="shrink-0 rounded-[1.7rem] border border-gray-200 bg-white p-3 shadow-[0_20px_50px_-40px_rgba(15,17,23,0.45)] dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder="Type your message..."
          rows={2}
          className="min-h-[64px] flex-1 resize-none rounded-[1.35rem] border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#b78622]/35 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
        />
        <button
          type="button"
          onClick={() => void send()}
          disabled={!canSend}
          className="inline-flex min-h-[64px] items-center justify-center gap-2 rounded-[1.35rem] bg-[linear-gradient(135deg,#d4b067_0%,#b78622_58%,#946815_100%)] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_34px_-18px_rgba(183,134,34,0.9)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:min-w-[124px]"
        >
          <SendHorizonal className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div className="flex h-full min-h-0 flex-col gap-3 bg-[radial-gradient(circle_at_15%_0%,rgba(183,134,34,0.12),transparent_32%),linear-gradient(180deg,#f8f5ee_0%,#fcfbf8_45%,#ffffff_100%)] p-3 sm:p-4">
        {hasConversation ? activeSessionBar : starterSection}
        {chatThread}
        {composer}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-[2rem] border border-gray-200 bg-[linear-gradient(180deg,#f6f2e8_0%,#ffffff_28%)] shadow-[0_34px_90px_-55px_rgba(15,17,23,0.55)] dark:border-gray-800 dark:bg-gray-950"
    >
      <div className="border-b border-gray-200 bg-[linear-gradient(135deg,#0b0e14_0%,#152033_50%,#233247_100%)] px-6 py-8 text-white dark:border-gray-800 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-[#f2d789]" />
              Wealth Advisory
            </div>
            <h2 className="mt-3 text-3xl font-heading font-bold tracking-tight sm:text-4xl">A cleaner, guided mutual fund chatbot</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              Ask directly or begin with a starter. The bot keeps the flow simple and gives dataset-based responses without clutter.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="flex min-h-[70vh] flex-col gap-4">
          {hasConversation ? activeSessionBar : starterSection}
          {chatThread}
          {composer}
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.6rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">How To Use</p>
            <div className="mt-3 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-950">
                Start with a goal like retirement, income, or capital growth.
              </div>
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-950">
                Add your investment amount and expected duration.
              </div>
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-950">
                Mention SIP or lumpsum so the filtering stays precise.
              </div>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400 dark:text-gray-500">What Changed</p>
            <div className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[#b78622]" />
                Chat-first layout with less clutter.
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[#b78622]" />
                Recommendations now appear inside the chat flow.
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[#b78622]" />
                Reset and follow-up actions are easier to find.
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
