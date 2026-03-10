import { NextResponse } from "next/server";
import { recommendMutualFunds, type InvestorProfile } from "@/lib/mutualFundBot";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const rawProfile = (body as { profile?: Partial<InvestorProfile> } | null)?.profile ?? body;
  const result = recommendMutualFunds((rawProfile ?? {}) as Partial<InvestorProfile>);

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

