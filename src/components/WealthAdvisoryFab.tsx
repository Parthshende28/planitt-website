"use client";

import { useEffect, useState } from "react";
import { Bot, Maximize2, Minimize2, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WealthAdvisoryChatClient from "@/components/WealthAdvisoryChatClient";

export default function WealthAdvisoryFab() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setFullScreen(false);
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setOpen(false);
              setFullScreen(false);
            }}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-[100] ${
              fullScreen
                ? "inset-4 sm:inset-6 lg:inset-10"
                : "bottom-[5.75rem] right-4 sm:bottom-24 sm:right-6 lg:right-8 w-[calc(100vw-2rem)] sm:w-[440px] lg:w-[540px] h-[78vh] sm:h-[72vh] max-h-[760px]"
            }`}
          >
            <div className="h-full w-full overflow-hidden rounded-[2rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,244,238,0.98))] shadow-[0_28px_80px_-28px_rgba(15,17,23,0.5)] dark:border-[#243047] dark:bg-[linear-gradient(180deg,rgba(4,10,18,0.98),rgba(8,17,31,0.98))]">
              <div className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(135deg,#0b0e14_0%,#121926_52%,#1e2837_100%)] px-4 py-3.5 text-white sm:px-5 sm:py-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(183,134,34,0.26),transparent_32%),radial-gradient(circle_at_left,rgba(255,255,255,0.06),transparent_26%)]" />
                <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#d8b66a] via-[#b78622] to-[#8f651a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                        <Bot className="h-5 w-5" />
                        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#111318] bg-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">AI Wealth Desk</p>
                        <span className="block text-lg font-semibold leading-tight text-white">Wealth Advisory</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 sm:justify-end">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/60">
                      <Sparkles className="h-3 w-3 text-[#f2d789]" />
                      Live
                    </span>
                    <button
                      type="button"
                      onClick={() => setFullScreen((v) => !v)}
                      className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label={fullScreen ? "Exit full screen" : "Full screen"}
                    >
                      {fullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        setFullScreen(false);
                      }}
                      className="h-9 w-9 inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="h-[calc(100%-92px)] sm:h-[calc(100%-86px)] overflow-hidden">
                <WealthAdvisoryChatClient embedded />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6 lg:right-8"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Wealth Advisory Bot"
          className="group inline-flex items-center gap-3 rounded-[1.75rem] border border-white/60 bg-[linear-gradient(135deg,rgba(8,11,18,0.98),rgba(17,23,33,0.98))] px-3.5 py-3 text-left text-white shadow-[0_24px_60px_-24px_rgba(15,17,23,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-24px_rgba(15,17,23,0.8)] dark:border-[#243047] dark:bg-[linear-gradient(135deg,rgba(5,10,18,0.98),rgba(11,20,35,0.98))]"
        >
          <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ddb866] via-[#b78622] to-[#8f651a] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-[#111318] bg-emerald-400" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-[10px] uppercase tracking-[0.28em] text-white/45">AI Wealth Desk</span>
            <span className="mt-0.5 block text-sm font-semibold">Wealth Advisory</span>
            <span className="mt-0.5 block text-xs text-white/60">Ask about SIP, lumpsum, and fund ideas</span>
          </span>
          <span className="hidden h-9 items-center rounded-full border border-white/10 bg-white/5 px-3 text-[11px] font-semibold text-[#f2d789] sm:inline-flex">
            Open
          </span>
        </button>
      </motion.div>
    </>
  );
}
