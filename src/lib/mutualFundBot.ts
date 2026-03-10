export type RiskTolerance = "conservative" | "moderate" | "aggressive";
export type InvestorGoal =
  | "emergency"
  | "short_term"
  | "home_purchase"
  | "retirement"
  | "wealth_creation"
  | "tax_saving";

export type RiskLevel = 1 | 2 | 3 | 4 | 5;

export interface InvestorProfile {
  goal: InvestorGoal;
  horizonYears: number;
  riskTolerance: RiskTolerance;
  monthlyInvestment?: number;
  lumpSumInvestment?: number;
}

export interface MutualFund {
  id: string;
  name: string;
  category: string;
  riskLevel: RiskLevel;
  minHorizonYears: number;
  tags: InvestorGoal[];
}

export interface FundSuggestion {
  fund: MutualFund;
  score: number;
  reasons: string[];
}

export interface RecommendResult {
  normalizedProfile: InvestorProfile;
  suggestions: FundSuggestion[];
  disclaimer: string;
}

const clampNumber = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const toFiniteNumber = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

export const MUTUAL_FUNDS: MutualFund[] = [
  {
    id: "liquid-1",
    name: "Liquid Fund (Example)",
    category: "Liquid",
    riskLevel: 1,
    minHorizonYears: 0,
    tags: ["emergency", "short_term", "home_purchase"],
  },
  {
    id: "ultra-short-1",
    name: "Ultra Short Duration Fund (Example)",
    category: "Ultra Short Duration",
    riskLevel: 2,
    minHorizonYears: 1,
    tags: ["emergency", "short_term", "home_purchase"],
  },
  {
    id: "short-duration-1",
    name: "Short Duration Fund (Example)",
    category: "Short Duration",
    riskLevel: 2,
    minHorizonYears: 2,
    tags: ["short_term", "home_purchase"],
  },
  {
    id: "corp-bond-1",
    name: "Corporate Bond Fund (Example)",
    category: "Corporate Bond",
    riskLevel: 2,
    minHorizonYears: 2,
    tags: ["short_term", "home_purchase"],
  },
  {
    id: "gilt-1",
    name: "Gilt Fund (Example)",
    category: "Gilt",
    riskLevel: 3,
    minHorizonYears: 3,
    tags: ["short_term", "retirement"],
  },
  {
    id: "cons-hybrid-1",
    name: "Conservative Hybrid Fund (Example)",
    category: "Conservative Hybrid",
    riskLevel: 3,
    minHorizonYears: 3,
    tags: ["home_purchase", "retirement", "wealth_creation"],
  },
  {
    id: "bal-adv-1",
    name: "Balanced Advantage Fund (Example)",
    category: "Balanced Advantage",
    riskLevel: 3,
    minHorizonYears: 4,
    tags: ["retirement", "wealth_creation"],
  },
  {
    id: "aggr-hybrid-1",
    name: "Aggressive Hybrid Fund (Example)",
    category: "Aggressive Hybrid",
    riskLevel: 4,
    minHorizonYears: 5,
    tags: ["retirement", "wealth_creation"],
  },
  {
    id: "index-large-1",
    name: "Large Cap Index Fund (Example)",
    category: "Index (Large Cap)",
    riskLevel: 4,
    minHorizonYears: 5,
    tags: ["retirement", "wealth_creation"],
  },
  {
    id: "flexi-1",
    name: "Flexi Cap Fund (Example)",
    category: "Flexi Cap",
    riskLevel: 4,
    minHorizonYears: 5,
    tags: ["retirement", "wealth_creation"],
  },
  {
    id: "mid-1",
    name: "Mid Cap Fund (Example)",
    category: "Mid Cap",
    riskLevel: 5,
    minHorizonYears: 7,
    tags: ["wealth_creation", "retirement"],
  },
  {
    id: "small-1",
    name: "Small Cap Fund (Example)",
    category: "Small Cap",
    riskLevel: 5,
    minHorizonYears: 8,
    tags: ["wealth_creation"],
  },
  {
    id: "elss-1",
    name: "ELSS (Tax Saving) Fund (Example)",
    category: "ELSS",
    riskLevel: 4,
    minHorizonYears: 3,
    tags: ["tax_saving", "wealth_creation", "retirement"],
  },
];

const riskTarget: Record<RiskTolerance, RiskLevel> = {
  conservative: 2,
  moderate: 3,
  aggressive: 4,
};

const goalCategoryBoost: Record<InvestorGoal, string[]> = {
  emergency: ["Liquid", "Ultra Short Duration"],
  short_term: ["Ultra Short Duration", "Short Duration", "Corporate Bond"],
  home_purchase: ["Short Duration", "Corporate Bond", "Conservative Hybrid"],
  retirement: ["Balanced Advantage", "Aggressive Hybrid", "Index (Large Cap)", "Flexi Cap"],
  wealth_creation: ["Index (Large Cap)", "Flexi Cap", "Mid Cap", "Small Cap", "Aggressive Hybrid"],
  tax_saving: ["ELSS"],
};

export const normalizeProfile = (input: Partial<InvestorProfile>): InvestorProfile => {
  const horizonYears = clampNumber(toFiniteNumber(input.horizonYears) ?? 5, 0, 50);
  const monthlyInvestment = toFiniteNumber(input.monthlyInvestment ?? null);
  const lumpSumInvestment = toFiniteNumber(input.lumpSumInvestment ?? null);

  const riskTolerance: RiskTolerance =
    input.riskTolerance === "conservative" ||
    input.riskTolerance === "moderate" ||
    input.riskTolerance === "aggressive"
      ? input.riskTolerance
      : "moderate";

  const goal: InvestorGoal =
    input.goal === "emergency" ||
    input.goal === "short_term" ||
    input.goal === "home_purchase" ||
    input.goal === "retirement" ||
    input.goal === "wealth_creation" ||
    input.goal === "tax_saving"
      ? input.goal
      : "wealth_creation";

  return {
    goal,
    horizonYears,
    riskTolerance,
    monthlyInvestment: monthlyInvestment ?? undefined,
    lumpSumInvestment: lumpSumInvestment ?? undefined,
  };
};

const scoreFund = (fund: MutualFund, profile: InvestorProfile): { score: number; reasons: string[] } => {
  const reasons: string[] = [];
  const target = riskTarget[profile.riskTolerance];

  let score = 100;
  const riskDistance = Math.abs(fund.riskLevel - target);
  score -= 18 * riskDistance;
  if (riskDistance === 0) reasons.push("Risk level closely matches your tolerance.");
  else if (riskDistance === 1) reasons.push("Risk level is near your tolerance.");
  else reasons.push("Risk level is farther from your tolerance (consider carefully).");

  if (profile.horizonYears < fund.minHorizonYears) {
    const gap = fund.minHorizonYears - profile.horizonYears;
    score -= 25 * gap;
    reasons.push(`Your time horizon is shorter than the suggested minimum (${fund.minHorizonYears}y).`);
  } else {
    reasons.push(`Horizon fit: designed for ${fund.minHorizonYears}y+ holding period.`);
  }

  const preferred = goalCategoryBoost[profile.goal] ?? [];
  if (preferred.includes(fund.category)) {
    score += 18;
    reasons.push("Category aligns well with your goal.");
  } else if (fund.tags.includes(profile.goal)) {
    score += 8;
    reasons.push("Goal tag alignment looks reasonable.");
  } else {
    score -= 10;
    reasons.push("Category may be less aligned with your stated goal.");
  }

  if (profile.horizonYears < 5 && fund.riskLevel >= 5) {
    score -= 18;
    reasons.push("High-volatility category is usually better for longer horizons.");
  }

  if (profile.goal === "tax_saving" && fund.category !== "ELSS") {
    score -= 35;
    reasons.push("For tax saving (80C), ELSS is typically the relevant category.");
  }

  return { score: clampNumber(score, 0, 140), reasons };
};

export const recommendMutualFunds = (rawProfile: Partial<InvestorProfile>): RecommendResult => {
  const normalizedProfile = normalizeProfile(rawProfile);

  const suggestions = MUTUAL_FUNDS.map((fund) => {
    const { score, reasons } = scoreFund(fund, normalizedProfile);
    return { fund, score, reasons };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const disclaimer =
    "Educational preview only — not financial advice. Mutual funds are subject to market risk. Past performance doesn’t guarantee future results. Verify scheme details, risks, and costs (TER) before investing.";

  return { normalizedProfile, suggestions, disclaimer };
};

