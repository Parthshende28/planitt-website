import { NextResponse } from "next/server";
import { answerTechnicalFaq } from "@/lib/technicalFaq";

export const runtime = "nodejs";

type TechnicalFaqRequest = {
  message?: unknown;
  pathname?: unknown;
};

const ctoPromotion = {
  title: "Technical Support",
  lines: [
    "For the next step, if you want help with the technical process, we can assist you.",
    "Please contact our CTO, Parth Shende, for further assistance.",
    "Contact Number: +91 9145402183",
  ],
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TechnicalFaqRequest;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const pathname = typeof body.pathname === "string" ? body.pathname : undefined;

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const answer = answerTechnicalFaq(message, pathname);

    return NextResponse.json({
      ...answer,
      ctoPromotion,
    });
  } catch {
    return NextResponse.json({ error: "Unable to answer technical FAQ right now." }, { status: 500 });
  }
}
