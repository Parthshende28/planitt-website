"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

type HomeMode = "financial" | "technical";

export default function ProofHighlights({ mode }: { mode: HomeMode }) {
  const isTechnical = mode === "technical";

  const metrics = isTechnical
    ? [
        { label: "Solutions Delivered", value: "30+" },
        { label: "Deployment Reliability", value: "99.9%" },
        { label: "Avg Release Speedup", value: "2.3x" },
      ]
    : [
        { label: "Clients Supported", value: "50+" },
        { label: "Advisory AUM", value: "Rs 50L+" },
        { label: "Plan Retention", value: "92%" },
      ];

  const logos = isTechnical
    ? ["/Zeynix.png", "/Krypsm.png", "/Lancers.png"]
    : ["/hdfc-life.png", "/icici-pru.png", "/bajaj-allianz.png", "/care.png"];

  const accent = isTechnical
    ? {
        wrap: "glass-silver",
        text: "text-zinc-700 dark:text-zinc-300",
        chip: "from-zinc-600 to-slate-600",
      }
    : {
        wrap: "glass-gold",
        text: "text-[#9f7220] dark:text-[#e7c973]",
        chip: "from-[#b78622] to-[#d8b35c]",
      };

  return (
    <section className="py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`${accent.wrap} rounded-3xl p-6 lg:p-8 premium-card`}
        >
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div>
              <h3 className={`font-heading text-2xl lg:text-3xl font-bold mb-3 ${accent.text}`}>
                {isTechnical ? "Execution Outcomes" : "Advisory Outcomes"}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base max-w-sm">
                {isTechnical
                  ? "Recent project outcomes from app, web, cloud and automation initiatives."
                  : "Real client progress across planning, protection and long-term wealth execution."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {metrics.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/30 dark:border-white/10 bg-white/60 dark:bg-black/20 px-4 py-3"
                >
                  <p className={`text-2xl font-bold ${accent.text}`}>{item.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {logos.map((src) => (
                  <div
                    key={src}
                    className="h-24 rounded-xl bg-white/90 dark:bg-zinc-900/80 border border-white/50 dark:border-zinc-700 flex items-center justify-center px-4 shadow-sm"
                  >
                    <Image
                      src={src}
                      alt="partner logo"
                      width={180}
                      height={72}
                      className="max-h-14 w-auto max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/case-studies"
                  className={`btn-depth inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r ${accent.chip}`}
                >
                  View Case Studies
                </Link>
                <Link
                  href={isTechnical ? "/services/technical-training" : "/services/financial-services/budgeting"}
                  className="btn-depth inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-white/80 dark:bg-zinc-900 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-zinc-700"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
