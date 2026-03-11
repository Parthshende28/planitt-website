import { NextResponse } from "next/server";
import { answerTechnicalFaq } from "@/lib/technicalFaq";

export const runtime = "nodejs";

type TechnicalFaqRequest = {
  message?: unknown;
  pathname?: unknown;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TechnicalFaqRequest;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const pathname = typeof body.pathname === "string" ? body.pathname : undefined;

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    return NextResponse.json(answerTechnicalFaq(message, pathname));
  } catch {
    return NextResponse.json({ error: "Unable to answer technical FAQ right now." }, { status: 500 });
  }
}
