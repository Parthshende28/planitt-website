"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Blogs() {
  return (
    <section id="blogs" className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors">
            Insights & Blogs
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            Articles written by our team sharing insights on technology, finance,
            and digital innovation.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <div className="flex justify-center items-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center p-12 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
          >
            <div className="inline-flex items-center justify-center p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
              <Loader2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              Our team is working on insightful articles. Stay tuned for updates on technology, finance, and innovation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
