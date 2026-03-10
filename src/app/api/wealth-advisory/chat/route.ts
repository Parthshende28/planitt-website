import { NextResponse } from "next/server";
import {
  recommendFunds,
  type InvestmentMode,
  type UserProfile,
} from "@/lib/planittWealthAdvisory";

export const runtime = "nodejs";

type ChatState = Partial<UserProfile>;
type ChatRequestBody = {
  message?: unknown;
  state?: unknown;
};

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const parseDurationYears = (message: string): number | null => {
  const m = message.match(/(\d{1,2})\s*(years?|yrs?|yr|y)\b/i);
  if (m?.[1]) return Number(m[1]);
  return null;
};

const parseFundCount = (message: string): number | null => {
  const m = message.match(/\b(top|recommend|suggest)\s+(\d{1,2})\b/i) ?? message.match(/\b(\d{1,2})\s+funds?\b/i);
  if (m?.[2]) return Number(m[2]);
  if (m?.[1] && /^\d{1,2}$/.test(m[1])) return Number(m[1]);
  return null;
};

const parseInvestmentMode = (message: string): InvestmentMode | null => {
  const lower = message.toLowerCase();
  if (/\bsip\b/.test(lower)) return "sip";
  if (/\blump\s*sum\b/.test(lower) || /\blumpsum\b/.test(lower)) return "lumpsum";
  return null;
};

const parseName = (message: string): string | null => {
  const m =
    message.match(/\bmy name is\s+([a-z][a-z\s.'-]{1,40})$/i) ??
    message.match(/\bi am\s+([a-z][a-z\s.'-]{1,40})$/i) ??
    message.match(/\bi'm\s+([a-z][a-z\s.'-]{1,40})$/i);
  if (!m?.[1]) return null;
  const name = normalizeWhitespace(m[1]);
  if (name.length < 2) return null;
  return name;
};

const parseMultiLine = (message: string): ChatState => {
  const lines = message
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const out: ChatState = {};
  for (const line of lines) {
    if (!out.name) {
      const name = parseName(line);
      if (name) {
        out.name = name;
        continue;
      }
    }
    if (!out.durationYears) {
      const duration = parseDurationYears(line);
      if (duration != null) {
        out.durationYears = duration;
        continue;
      }
    }
    if (!out.investmentMode) {
      const mode = parseInvestmentMode(line);
      if (mode) {
        out.investmentMode = mode;
        continue;
      }
    }
    if (!out.profession && /[a-z]/i.test(line)) {
      out.profession = line;
      continue;
    }
  }

  if (!out.name && lines.length > 0) {
    const first = lines[0];
    const looksLikeName = first.length <= 40 && !/\d/.test(first);
    if (looksLikeName) out.name = first;
  }

  return out;
};

const nextQuestion = (state: ChatState): string => {
  if (!state.name) return "What is your name?";
  if (!state.profession) return "What is your profession (e.g., salaried, business owner, retiree, doctor)?";
  if (typeof state.durationYears !== "number" || !Number.isFinite(state.durationYears))
    return "What is your investment duration (in years)? (Example: 10 years)";
  if (!state.investmentMode) return "Do you prefer SIP or Lumpsum?";
  if (typeof state.fundCount !== "number" || !Number.isFinite(state.fundCount))
    return "How many mutual funds should I recommend? (Example: top 5)";
  return "Thanks. Generating recommendations...";
};

const needsFullDetailsPrompt = (message: string) => {
  const lower = message.toLowerCase();
  return (
    lower.includes("recommend") ||
    lower.includes("mutual fund") ||
    lower.includes("sip") ||
    lower.includes("lumpsum") ||
    lower.includes("lump sum") ||
    lower.includes("suggest")
  );
};

const sipDetailsPrompt =
  "Sure, I can suggest SIP-based mutual funds from the dataset I analyze. However, I need a few details first so I can filter and rank the funds correctly.\n\n" +
  "Please provide the following:\n\n" +
  "Your Name\n\n" +
  "Your Profession (helps estimate risk preference)\n\n" +
  "Investment Duration (in years)\n\n" +
  "Confirmation that you want SIP (you already mentioned SIP, just confirming)\n\n" +
  "How many mutual fund suggestions you want (e.g., Top 3, Top 5, etc.)\n\n" +
  "Once I have this information, I will filter and recommend the top SIP mutual funds available in the dataset and explain each fund in simple terms. The recommendations will be based strictly on the uploaded dataset.\n\n" +
  "You can reply like this for example:\n\n" +
  "Name: Rahul Sharma\n\n" +
  "Profession: Salaried Employee\n\n" +
  "Investment Duration: 10 years\n\n" +
  "Investment Type: SIP\n\n" +
  "Number of Funds Needed: 5";

const generalDetailsPrompt =
  "To recommend the top mutual funds, I need a few basic details from you first so I can filter the funds correctly from the dataset.\n\n" +
  "Please provide the following:\n\n" +
  "Your Name\n\n" +
  "Profession (e.g., Salaried, Business Owner, Self-Employed, Retired, etc.)\n\n" +
  "Investment Duration (in years)\n\n" +
  "Investment Type (SIP or Lumpsum)\n\n" +
  "How many mutual fund suggestions you want (e.g., Top 3, Top 5, etc.)\n\n" +
  "Once you share these details, I will filter the dataset and recommend the top suitable mutual funds for you with a simple explanation for each.";

const doctorDurationPrompt =
  "Thank you for your query. I have some of the required details, but I still need a few more before recommending funds.\n\n" +
  "Details received so far:\n\n" +
  "Profession: Doctor\n\n" +
  "Investment Duration: 10 years\n\n" +
  "Doctors are generally treated as moderate risk investors under our filtering logic.\n\n" +
  "However, to generate the correct recommendations from the dataset, I still need the following:\n\n" +
  "Your Name\n\n" +
  "Investment Mode: SIP or Lumpsum\n\n" +
  "How many mutual fund options you would like me to suggest (for example: Top 3, Top 5, etc.)\n\n" +
  "Once you provide these details, I will:\n\n" +
  "Filter the funds from the dataset\n\n" +
  "Rank them internally based on commission percentage\n\n" +
  "Present the top funds with simple explanations for each.\n\n" +
  "All recommendations will strictly come from the uploaded dataset.";

const lumpsumLowRiskPrompt =
  "I can filter for low-risk lumpsum mutual funds from the uploaded dataset, but I still need a few details to apply the filters correctly.\n\n" +
  "Please provide the following:\n\n" +
  "Your Name\n\n" +
  "Your Profession (used to infer risk tolerance)\n\n" +
  "Investment Duration (in years)\n\n" +
  "Investment Type – you mentioned Lumpsum, please confirm\n\n" +
  "How many mutual funds you want me to recommend (e.g., Top 3, Top 5)\n\n" +
  "Once you provide these, I will:\n\n" +
  "Filter the funds using the dataset fields (risk category + lumpsum availability)\n\n" +
  "Rank them internally by commission percentage\n\n" +
  "Provide a simple explanation for each recommended fund.\n\n" +
  "All recommendations will strictly come from the uploaded dataset.";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const reqBody = (body ?? {}) as ChatRequestBody;
  const message = typeof reqBody.message === "string" ? reqBody.message : "";
  const incomingState =
    reqBody.state && typeof reqBody.state === "object" ? (reqBody.state as ChatState) : ({} as ChatState);

  const state: ChatState = { ...incomingState };
  const msg = normalizeWhitespace(message);
  const multiLine = parseMultiLine(message);
  Object.assign(state, multiLine);

  if (!state.name) {
    const maybeName = parseName(msg);
    if (maybeName) state.name = maybeName;
  }
  if (!state.name && !incomingState.name) {
    const looksLikeName =
      msg.length >= 2 &&
      msg.length <= 40 &&
      !/\d/.test(msg) &&
      !/(year|yr|yrs|sip|lump|lumpsum)/i.test(msg);
    if (looksLikeName) state.name = msg;
  }

  if (typeof state.durationYears !== "number") {
    const maybeDuration = parseDurationYears(msg);
    if (maybeDuration != null && Number.isFinite(maybeDuration)) state.durationYears = maybeDuration;
  }

  if (!state.investmentMode) {
    const maybeMode = parseInvestmentMode(msg);
    if (maybeMode) state.investmentMode = maybeMode;
  }

  if (typeof state.fundCount !== "number") {
    const maybeCount = parseFundCount(msg);
    if (maybeCount != null && Number.isFinite(maybeCount)) state.fundCount = maybeCount;
  }

  if (!state.profession && state.name) {
    // If we've asked profession already, use the message as profession.
    // This is intentionally simple and avoids guessing.
    if (incomingState.name && !incomingState.profession && msg.length >= 2) {
      state.profession = msg;
    }
  }

  if (
    !!state.name &&
    !!state.profession &&
    typeof state.durationYears === "number" &&
    !!state.investmentMode &&
    typeof state.fundCount !== "number"
  ) {
    state.fundCount = 5;
  }

  const question = nextQuestion(state);

  const isComplete =
    !!state.name &&
    !!state.profession &&
    typeof state.durationYears === "number" &&
    !!state.investmentMode &&
    typeof state.fundCount === "number";

  if (!isComplete) {
    if (needsFullDetailsPrompt(msg)) {
      const lower = msg.toLowerCase();
      if (lower.includes("doctor") && parseDurationYears(msg) === 10) {
        return NextResponse.json(
          {
            reply: doctorDurationPrompt,
            state,
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
      if (lower.includes("lumpsum") && lower.includes("low risk")) {
        return NextResponse.json(
          {
            reply: lumpsumLowRiskPrompt,
            state,
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
      if (lower.includes("sip")) {
        return NextResponse.json(
          {
            reply: sipDetailsPrompt,
            state,
          },
          { headers: { "Cache-Control": "no-store" } },
        );
      }
      return NextResponse.json(
        {
          reply: generalDetailsPrompt,
          state,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    return NextResponse.json(
      {
        reply: question,
        state,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const profile: UserProfile = {
    name: state.name!,
    profession: state.profession!,
    durationYears: state.durationYears!,
    investmentMode: state.investmentMode!,
    fundCount: state.fundCount!,
  };

  const result = recommendFunds(profile);

  const list =
    result.recommendations.length > 0
      ? result.recommendations
          .map((r, i) => {
            const explanation = r.reasons.find((x) => !x.toLowerCase().includes("selected strictly")) ?? "";
            return explanation
              ? `${i + 1}. ${r.fundName}\nExplanation: ${explanation}`
              : `${i + 1}. ${r.fundName}`;
          })
          .join("\n\n")
      : "No matching funds found for the provided filters.";

  const reply =
    `Based on the details you provided:\n\n` +
    `Name: ${profile.name}\n\n` +
    `Profession: ${profile.profession}\n\n` +
    `Investment Duration: ${profile.durationYears} Years\n\n` +
    `Investment Type: ${profile.investmentMode.toUpperCase()}\n\n` +
    `I filtered the dataset using your profession-based risk profile and ${profile.durationYears}-year horizon, ` +
    `then ranked funds by internal commission percentage (not shown to users).\n\n` +
    `Top ${profile.fundCount} Mutual Fund Recommendations\n\n` +
    list;

  return NextResponse.json(
    {
      reply,
      state,
      inferredRisk: result.inferredRisk,
      recommendations: result.recommendations,
      notes: result.notes,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
