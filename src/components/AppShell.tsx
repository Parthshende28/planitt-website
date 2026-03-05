"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      setIsLoadingRoute(true);
      const timer = setTimeout(() => setIsLoadingRoute(false), 650);
      prevPathRef.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoadingRoute && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-white/88 dark:bg-zinc-950/88 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full border-4 border-[#d8b35c]/30 border-t-[#b78622] dark:border-zinc-700 dark:border-t-zinc-300 animate-spin" />
              <p className="text-sm font-medium text-[#9f7220] dark:text-zinc-300">Loading experience...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
