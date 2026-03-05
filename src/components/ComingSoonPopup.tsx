"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComingSoonPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seenKey = "planitt_coming_soon_seen";
    const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(seenKey) === "1";
    if (alreadySeen) return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(seenKey, "1");
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/20 bg-[#0f1117] text-white shadow-2xl"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#b78622]/35 blur-3xl" />
              <div className="absolute -bottom-20 -right-12 h-72 w-72 rounded-full bg-zinc-400/20 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_45%)]" />
            </div>

            <button
              aria-label="Close popup"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-black/35 hover:bg-black/55 border border-white/20 flex items-center justify-center"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10 grid lg:grid-cols-5 gap-0">
              <div className="lg:col-span-3 px-7 py-8 sm:px-10 sm:py-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0d996]/40 bg-[#b78622]/20 px-3 py-1 text-xs font-semibold text-[#f6df9f] mb-5">
                  <Sparkles className="h-3.5 w-3.5" />
                  New In-house Product
                </div>

                <h2 className="font-heading text-4xl sm:text-5xl font-bold leading-tight mb-3">
                  Coming Soon
                </h2>
                <p className="max-w-xl text-lg text-zinc-200 leading-relaxed mb-6">
                  A recommendation app that will recommend stocks, mutual funds,
                  futures and options, forex and crypto.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-semibold">In-house</span>
                  <span className="px-4 py-2 rounded-full bg-[#b78622]/20 border border-[#f0d996]/30 text-sm font-semibold text-[#f6df9f]">Fintech</span>
                  <span className="px-4 py-2 rounded-full bg-zinc-500/25 border border-zinc-300/25 text-sm font-semibold">Dashboard</span>
                </div>

              </div>

              <div className="lg:col-span-2 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/20 p-7 sm:p-8">
                <div className="h-full rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-5 flex flex-col items-center justify-center text-center">
                  <div className="relative w-full overflow-hidden rounded-2xl bg-white/10 border border-white/20 mb-4">
                    <video
                      className="w-full h-52 object-cover"
                      src="/planitt-animated-video-remake.mp4"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  </div>

                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-400 mb-2">Project Status</p>
                  <p className="text-2xl font-bold text-[#f2d789] mb-1">Launching Soon</p>
                  <p className="text-sm text-zinc-300">Private beta preview is under development.</p>
                  <Link
                    href="/in-house-product"
                    onClick={() => setOpen(false)}
                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#b78622]/85 hover:bg-[#b78622] border border-[#f0d996]/30 px-6 py-2.5 font-semibold text-[#fff1ca] transition-colors duration-200"
                  >
                    Know more
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
