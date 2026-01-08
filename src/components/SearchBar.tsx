"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { searchIndex } from "@/lib/searchIndex";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results =
    query.length > 0
      ? searchIndex.filter((item) =>
          `${item.title} ${item.description}`
            .toLowerCase()
            .includes(query.toLowerCase())
        )
      : [];

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input Container */}
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${isOpen ? 'w-64 border-blue-500 ring-2 ring-blue-100 bg-white dark:bg-gray-900' : 'w-48 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50 dark:bg-gray-900/50'}`}>
        <Search size={18} className={`${isOpen ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'}`} />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          className="w-full bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Recommendations Dropdown */}
      <AnimatePresence>
        {isOpen && (query.length > 0 || results.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-[60]"
          >
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {results.length > 0 ? (
                <div className="p-2">
                  <p className="px-3 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Search Results
                  </p>
                  {results.map((item, index) => (
                    <Link
                      key={index}
                      href={item.url}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery("");
                      }}
                      className="flex flex-col gap-0.5 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                          {item.title}
                        </span>
                        <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                        {item.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : query.length > 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No results found for &quot;{query}&quot;</p>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
