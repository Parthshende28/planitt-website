import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

export const metadata = {
  title: "In-house Product | Planitt",
  description:
    "Planitt's upcoming in-house recommendation platform for stocks, mutual funds, futures, options, forex, and crypto.",
};

const whoIsItFor = [
  "New investors who need guided recommendations with clear explanations.",
  "Working professionals who want a faster way to shortlist opportunities.",
  "Active traders looking for structured market insights in one place.",
  "Users who want both long-term investing and short-term market signals.",
];

const plannedModules = [
  "Stocks recommendations and watchlists",
  "Mutual fund recommendations by goals and risk profile",
  "Futures and options opportunities with key context",
  "Forex and crypto market insights",
  "Dashboard for tracking picks, performance, and updates",
  "Alerts and notifications for important market events",
];

export default function InHouseProductPage() {
  return (
    <section className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#444747] dark:text-[#c7cccc] hover:text-[#525555] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="mt-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#eef0f0] via-white to-[#dde1e1] dark:from-[#141717] dark:via-[#1b1e1e] dark:to-[#232626] p-8 md:p-10 shadow-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#bcc0c0] dark:border-[#4b4f4f] bg-white/60 dark:bg-white/5 px-3 py-1 text-xs font-semibold text-[#444747] dark:text-[#c7cccc]">
            <Sparkles className="h-3.5 w-3.5" />
            New In-house Product
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Planitt Recommendation Platform
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-4xl">
            We are building an in-house platform that helps users discover
            recommendations across stocks, mutual funds, futures and options,
            forex, and crypto in one unified experience.
          </p>

          <div className="mt-8 rounded-2xl overflow-hidden border border-[#c3ccd6] dark:border-[#4c5764] bg-black/80">
            <video
              className="w-full h-[260px] md:h-[420px] object-cover"
              src="/planitt-animated-video-remake.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/70 p-6">
            <h2 className="text-2xl font-bold mb-4">Who Can Use It</h2>
            <ul className="space-y-3">
              {whoIsItFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#525555] dark:text-[#bcc0c0]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/70 p-6">
            <h2 className="text-2xl font-bold mb-4">Planned Modules</h2>
            <ul className="space-y-3">
              {plannedModules.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="h-5 w-5 mt-0.5 text-[#525555] dark:text-[#bcc0c0]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <h3 className="text-xl font-bold mb-2">Current Status</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Private beta preview is under development. We are currently
            validating recommendations flow, user experience, and reporting.
          </p>
        </div>
      </div>
    </section>
  );
}


