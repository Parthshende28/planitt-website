"use client";

import { useEffect, useState } from "react";
import { Bot, Maximize2, Minimize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WealthAdvisoryChatClient from "@/components/WealthAdvisoryChatClient";

export default function WealthAdvisoryFab() {
  const [open, setOpen] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

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
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-[90] ${
              fullScreen
                ? "inset-4 sm:inset-6 lg:inset-10"
                : "bottom-20 right-5 w-[92vw] sm:w-[420px] lg:w-[520px] h-[80vh] sm:h-[70vh] max-h-[720px]"
            }`}
          >
            <div className="h-full w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-[#111318] text-white">
                <div className="flex items-center gap-2">
                  <Bot className="h-4 w-4 text-[#b78622]" />
                  <span className="text-sm font-semibold">Wealth Advisory</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFullScreen((v) => !v)}
                    className="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"
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
                    className="h-8 w-8 inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="h-[calc(100%-48px)] overflow-hidden">
                <WealthAdvisoryChatClient embedded />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-5 right-5 z-[90]"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Wealth Advisory Bot"
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#111318] text-white px-4 py-3 shadow-2xl hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] transition-all"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#b78622] text-white shadow-inner">
            <Bot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border border-[#111318]" />
          </span>
          <span className="text-sm font-semibold hidden sm:inline">Wealth Advisory</span>
        </button>
      </motion.div>
    </>
  );
}
