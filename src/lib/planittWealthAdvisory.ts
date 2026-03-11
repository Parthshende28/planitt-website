import dataset from "@/data/mutualFundsDataset.json";

export type InvestmentMode = "sip" | "lumpsum";
export type RiskPreference = "low" | "moderate" | "high";

export interface FundRow {
  amc: string;
  fundName: string;
  commissionPct: number;
  sipAvailable?: boolean | null;
  lumpsumAvailable?: boolean | null;
  riskCategory?: string | null;
  minDurationYears?: number | null;
}

export interface UserProfile {
  name: string;
  profession: string;
  durationYears: number;
  investmentMode: InvestmentMode;
  fundCount: number;
  investmentAmount?: number;
  riskPreference?: RiskPreference;
  exclusiveMode?: "sip_only" | "lumpsum_only";
}

export interface RecommendedFund {
  amc: string;
  fundName: string;
  reasons: string[];
}

export interface RecommendOutput {
  inferredRisk: RiskPreference;
  recommendations: RecommendedFund[];
  notes: string[];
  investmentSplit?: number;
}

const clampInt = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.trunc(value)));

export const inferRiskFromProfession = (professionRaw: string): RiskPreference => {
  const profession = (professionRaw || "").toLowerCase();

  const low = ["retired", "retiree", "pension", "senior", "homemaker"];
  const high = ["business", "entrepreneur", "trader", "self-employed", "startup", "founder"];

  if (low.some((k) => profession.includes(k))) return "low";
  if (high.some((k) => profession.includes(k))) return "high";
  return "moderate";
};

const normalizeRisk = (raw?: string | null): RiskPreference | null => {
  if (!raw) return null;
  const v = raw.toLowerCase();
  if (v.includes("low")) return "low";
  if (v.includes("moderate") || v.includes("medium")) return "moderate";
  if (v.includes("very high") || v.includes("very-high") || v.includes("veryhigh")) return "high";
  if (v.includes("high")) return "high";
  return null;
};

const getFundsFromDataset = (): FundRow[] => {
  const funds = (dataset as unknown as { funds?: FundRow[] }).funds ?? [];
  return funds.filter(
    (f) =>
      typeof f?.amc === "string" &&
      typeof f?.fundName === "string" &&
      typeof (f as FundRow).commissionPct === "number" &&
      Number.isFinite((f as FundRow).commissionPct),
  );
};

export const recommendFunds = (profile: UserProfile): RecommendOutput => {
  const inferredRisk = profile.riskPreference ?? inferRiskFromProfession(profile.profession);
  const desiredCount = clampInt(profile.fundCount, 1, 20);
  const durationYears = clampInt(profile.durationYears, 0, 50);

  const allFunds = getFundsFromDataset();
  const availableRisk = new Set<RiskPreference>();
  let sipOnlyCount = 0;
  let lumpsumOnlyCount = 0;
  let bothModesCount = 0;
  for (const fund of allFunds) {
    const r = normalizeRisk(fund.riskCategory);
    if (r) availableRisk.add(r);
    const sip = fund.sipAvailable === true;
    const lump = fund.lumpsumAvailable === true;
    if (sip && lump) bothModesCount += 1;
    else if (sip) sipOnlyCount += 1;
    else if (lump) lumpsumOnlyCount += 1;
  }

  const eligible = allFunds
    .map((f) => {
      const fundRisk = normalizeRisk(f.riskCategory);
      const reasons: string[] = [];

      reasons.push("Selected strictly from the provided dataset.");
      reasons.push(`${profile.riskPreference ? 'Risk preference specified by user:' : 'Profession-based risk profile inferred as:'} ${inferredRisk}.`);

      if (!fundRisk) {
        return { fund: f, fundRisk: null, reasons };
      }

      if (fundRisk === inferredRisk || inferredRisk === "high") {
        reasons.push(`Risk category in dataset: ${fundRisk}.`);
      } else if (inferredRisk === "moderate" && fundRisk === "low") {
        reasons.push(`Risk category in dataset: ${fundRisk}.`);
      } else if (inferredRisk === "low" && fundRisk !== "low") {
        reasons.push(`Risk category in dataset: ${fundRisk} (higher than your profile).`);
      } else if (inferredRisk === "moderate" && fundRisk === "high") {
        reasons.push(`Risk category in dataset: ${fundRisk} (higher than your profile).`);
      }

      if (typeof f.minDurationYears === "number" && Number.isFinite(f.minDurationYears)) {
        reasons.push(`Minimum duration in dataset: ${f.minDurationYears} years.`);
      } else {
        reasons.push("Minimum duration not specified in dataset.");
      }

      return { fund: f, fundRisk, reasons };
    })
    .filter(({ fund, fundRisk }) => {
      if (!fundRisk) return false;

      if (profile.investmentMode === "sip" && fund.sipAvailable !== true) return false;
      if (profile.investmentMode === "lumpsum" && fund.lumpsumAvailable !== true) return false;
      if (profile.exclusiveMode === "sip_only") {
        if (fund.sipAvailable !== true) return false;
        if (fund.lumpsumAvailable === true) return false;
      }
      if (profile.exclusiveMode === "lumpsum_only") {
        if (fund.lumpsumAvailable !== true) return false;
        if (fund.sipAvailable === true) return false;
      }

      // Strict risk filtering:
      // If user is low, only low is allowed.
      // If user is moderate, low or moderate is allowed.
      // If user is high, everything is allowed.
      if (inferredRisk === "low" && fundRisk !== "low") return false;
      if (inferredRisk === "moderate" && (fundRisk !== "low" && fundRisk !== "moderate")) return false;

      if (typeof fund.minDurationYears === "number" && Number.isFinite(fund.minDurationYears)) {
        if (durationYears < fund.minDurationYears) return false;
      }

      return true;
    })
    .sort((a, b) => b.fund.commissionPct - a.fund.commissionPct);

  const recommendations = eligible.slice(0, desiredCount).map(({ fund, reasons }) => ({
    amc: fund.amc,
    fundName: fund.fundName,
    reasons: reasons.slice(0, 3),
  }));

  const notes: string[] = [];
  notes.push("Not financial advice. Mutual funds are subject to market risks.");
  notes.push("Recommendations are filtered only by dataset fields (risk, SIP/Lumpsum availability, duration).");
  notes.push("Duration filtering is skipped for funds missing a minimum duration in the dataset.");
  if (profile.exclusiveMode === "sip_only") {
    notes.push("Exclusive filter applied: SIP-only (funds that are not marked as Lumpsum).");
  }
  if (profile.exclusiveMode === "lumpsum_only") {
    notes.push("Exclusive filter applied: Lumpsum-only (funds that are not marked as SIP).");
  }
  if (bothModesCount >= Math.max(5, Math.round(allFunds.length * 0.5))) {
    notes.push("Many funds in the dataset allow both SIP and Lumpsum, so results can repeat across modes.");
  }
  if (!availableRisk.has("low")) {
    notes.push("Dataset contains no low-risk funds. Low-risk requests may return no matches.");
  }
  if (!availableRisk.has("moderate")) {
    notes.push("Dataset contains no moderate-risk funds. Moderate-risk requests may return no matches.");
  }

  if (recommendations.length === 0) {
    notes.push("No funds matched all required filters in the provided dataset.");
  }

  const investmentSplit = profile.investmentAmount && recommendations.length > 0
    ? profile.investmentAmount / recommendations.length
    : undefined;

  return { inferredRisk, recommendations, notes, investmentSplit };
};
