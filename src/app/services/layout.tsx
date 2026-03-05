"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 520);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-3xl border border-white/20 dark:border-zinc-700 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl p-8 shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-[#d8b35c]/35 border-t-[#b78622] dark:border-zinc-700 dark:border-t-zinc-300 animate-spin" />
            <p className="text-sm font-semibold text-[#9f7220] dark:text-zinc-300">Loading service experience...</p>
            <div className="w-full space-y-3 mt-2">
              <div className="h-3 rounded-full bg-[#f3dfad]/70 dark:bg-zinc-700/70 animate-pulse" />
              <div className="h-3 rounded-full w-5/6 mx-auto bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
              <div className="h-3 rounded-full w-2/3 mx-auto bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
