"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, RefreshCcw } from "lucide-react";
import type { InvestorGoal, RiskTolerance } from "@/lib/mutualFundBot";

type BotStep = "goal" | "horizon" | "risk" | "amount" | "results";

type Suggestion = {
  fund: {
    id: string;
    name: string;
    category: string;
    riskLevel: 1 | 2 | 3 | 4 | 5;
    minHorizonYears: number;
  };
  score: number;
  reasons: string[];
};

type ApiResponse = {
  normalizedProfile: {
    goal: InvestorGoal;
    horizonYears: number;
    riskTolerance: RiskTolerance;
    monthlyInvestment?: number;
    lumpSumInvestment?: number;
  };
  suggestions: Suggestion[];
  disclaimer: string;
  investmentSplit?: number;
};

const riskLabel = (risk: 1 | 2 | 3 | 4 | 5) => {
  if (risk === 1) return "Very Low";
  if (risk === 2) return "Low";
  if (risk === 3) return "Moderate";
  if (risk === 4) return "High";
  return "Very High";
};

const goalLabel: Record<InvestorGoal, string> = {
  emergency: "Emergency Fund",
  short_term: "Short-term (1–3 years)",
  home_purchase: "Home Purchase",
  retirement: "Retirement",
  wealth_creation: "Wealth Creation",
  tax_saving: "Tax Saving (80C)",
};

const prettyNumber = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

export default function MutualFundBotClient() {
  const [step, setStep] = useState<BotStep>("goal");
  const [goal, setGoal] = useState<InvestorGoal>("wealth_creation");
  const [horizonYears, setHorizonYears] = useState<number>(5);
  const [riskTolerance, setRiskTolerance] = useState<RiskTolerance>("moderate");
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(5000);
  const [lumpSumInvestment, setLumpSumInvestment] = useState<number>(0);
  const [totalToInvest, setTotalToInvest] = useState<number>(5000);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const profile = useMemo(
    () => ({
      goal,
      horizonYears,
      riskTolerance,
      monthlyInvestment,
      lumpSumInvestment,
      investmentAmount: totalToInvest,
    }),
    [goal, horizonYears, riskTolerance, monthlyInvestment, lumpSumInvestment, totalToInvest],
  );

  const reset = () => {
    setStep("goal");
    setResult(null);
    setApiError(null);
    setLoading(false);
  };

  const runRecommendation = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch("/api/mutual-fund-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });

      if (!res.ok) {
        const maybeJson = await res.json().catch(() => null);
        const message =
          (maybeJson && typeof maybeJson.error === "string" && maybeJson.error) ||
          `Request failed (${res.status}).`;
        throw new Error(message);
      }

      const data = (await res.json()) as ApiResponse;
      setResult(data);
      setStep("results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/70 dark:border-gray-800/70"
    >
      <div className="bg-gradient-to-r from-[#b78622] to-[#6b4a0f] p-6 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold">Mutual Fund Bot (Preview)</h2>
        <p className="text-white/85 mt-1">
          Answer a few questions to get a shortlist matched to you.
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Your inputs:</span>{" "}
            {goalLabel[goal]} · {horizonYears}y · {riskTolerance} · ₹{prettyNumber(totalToInvest)} Total
            {monthlyInvestment > 0 ? ` · SIP ₹${prettyNumber(monthlyInvestment)}` : ""}
            {lumpSumInvestment > 0 ? ` · Lump sum ₹${prettyNumber(lumpSumInvestment)}` : ""}
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <RefreshCcw className="h-4 w-4" />
            Restart
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          {step === "goal" && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">1) What’s your primary goal?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(Object.keys(goalLabel) as InvestorGoal[]).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGoal(g);
                      setStep("horizon");
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      goal === g
                        ? "bg-white dark:bg-gray-900 border-[#b78622]/60 text-gray-900 dark:text-gray-100"
                        : "bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900"
                    }`}
                  >
                    {goalLabel[g]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "horizon" && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">2) How long can you stay invested?</p>
              <div className="mt-3 flex flex-col sm:flex-row gap-3 sm:items-center">
                <input
                  type="number"
                  min={0}
                  max={50}
                  value={horizonYears}
                  onChange={(e) => setHorizonYears(Math.max(0, Math.min(50, Number(e.target.value))))}
                  className="w-full sm:w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">years</span>
                <div className="flex gap-2 sm:ml-auto">
                  <button
                    type="button"
                    onClick={() => setStep("goal")}
                    className="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("risk")}
                    className="px-3 py-2 rounded-lg text-sm font-semibold bg-[#b78622] hover:bg-[#a06f16] text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === "risk" && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">3) Risk comfort level?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["conservative", "moderate", "aggressive"] as RiskTolerance[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRiskTolerance(r);
                      setStep("amount");
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                      riskTolerance === r
                        ? "bg-white dark:bg-gray-900 border-[#b78622]/60 text-gray-900 dark:text-gray-100"
                        : "bg-white/60 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 hover:bg-white dark:hover:bg-gray-900"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("horizon")}
                  className="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === "amount" && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 p-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">4) Investment amount</p>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  Total Investment (to split across funds) (₹)
                  <input
                    type="number"
                    min={0}
                    max={100000000}
                    value={totalToInvest}
                    onChange={(e) =>
                      setTotalToInvest(Math.max(0, Math.min(100000000, Number(e.target.value))))
                    }
                    className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
                  />
                </label>
                <div className="flex flex-col gap-3">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Monthly SIP (₹) (optional)
                    <input
                      type="number"
                      min={0}
                      max={10000000}
                      value={monthlyInvestment}
                      onChange={(e) =>
                        setMonthlyInvestment(Math.max(0, Math.min(10000000, Number(e.target.value))))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Lump sum (₹) (optional)
                    <input
                      type="number"
                      min={0}
                      max={100000000}
                      value={lumpSumInvestment}
                      onChange={(e) =>
                        setLumpSumInvestment(Math.max(0, Math.min(100000000, Number(e.target.value))))
                      }
                      className="mt-1 w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <button
                  type="button"
                  onClick={() => setStep("risk")}
                  className="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={runRecommendation}
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-[#b78622] hover:bg-[#a06f16] disabled:opacity-60 text-white"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Get suggestions
                </button>
                {apiError ? <span className="text-sm text-red-600 dark:text-red-400">{apiError}</span> : null}
              </div>
            </div>
          )}

          {step === "results" && result && (
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/20 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Top matches for you</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Goal: {goalLabel[result.normalizedProfile.goal]} · Horizon: {result.normalizedProfile.horizonYears}y · Risk:{" "}
                    {result.normalizedProfile.riskTolerance}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setResult(null);
                    setApiError(null);
                    setStep("goal");
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Edit answers
                </button>
              </div>

              <div className="mt-4 grid gap-3">
                {result.suggestions.map((s) => (
                  <div
                    key={s.fund.id}
                    className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/40 p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">{s.fund.name}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {s.fund.category} · Risk: {riskLabel(s.fund.riskLevel)} · Suggested horizon: {s.fund.minHorizonYears}y+
                        </p>
                        {(result.investmentSplit || totalToInvest > 0) && (
                          <p className="text-sm font-semibold text-[#b78622] mt-1">
                            Suggested Investment: ₹{prettyNumber(result.investmentSplit || (totalToInvest / result.suggestions.length))}
                          </p>
                        )}
                      </div>
                      <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#b78622]/15 border border-[#b78622]/30 text-[#7a5611] dark:text-[#f2d789] dark:border-[#f2d789]/25">
                        Match score: {Math.round(s.score)}
                      </div>
                    </div>
                    <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {s.reasons.slice(0, 4).map((r, idx) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/25 p-4">
                <p className="text-sm text-amber-900 dark:text-amber-100 font-semibold">Important</p>
                <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mt-1">
                  {result.disclaimer}
                </p>
                <p className="text-xs text-amber-900/70 dark:text-amber-100/70 mt-2">
                  Replace “Example” schemes with real schemes + live data from your preferred data source before using in production.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

