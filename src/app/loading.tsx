export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-12 w-12 rounded-full border-4 border-[#d8b35c]/30 border-t-[#b78622] dark:border-zinc-700 dark:border-t-zinc-300 animate-spin" />
        <p className="text-sm font-medium text-[#9f7220] dark:text-zinc-300">Loading...</p>
      </div>
    </div>
  );
}
