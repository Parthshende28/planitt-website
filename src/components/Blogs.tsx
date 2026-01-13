"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Blog {
  title: string;
  excerpt: string;
  image: string;
  url: string;
  platform?: string;
}

const blogs: Blog[] = [
  {
    title: "How Technology Is Transforming Financial Planning",
    excerpt:
      "Discover how modern applications, dashboards, and automation are reshaping investment management.",
    image: "/blogs/fintech.jpg",
    url: "https://yourblog.blogspot.com/2024/technology-financial-planning",
    platform: "Blogger",
  },
  {
    title: "Why Scalable App Architecture Matters",
    excerpt:
      "Learn why scalability, security, and performance are critical when building modern mobile apps.",
    image: "/blogs/app-architecture.jpg",
    url: "https://yourblog.blogspot.com/2024/scalable-app-architecture",
    platform: "Blogger",
  },
  {
    title: "Web Performance Optimization Best Practices",
    excerpt:
      "Practical techniques to improve website speed, UX, and Core Web Vitals.",
    image: "/blogs/web-performance.jpg",
    url: "https://yourblog.blogspot.com/2024/web-performance",
    platform: "Blogger",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {blogs.map((blog, index) => (
            <motion.a
              key={index}
              variants={cardVariants}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden
                         border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900
                         transition-all duration-300
                         hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500
                             group-hover:scale-105"
                />
              </div>

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm
                           opacity-0 group-hover:opacity-100
                           transition-opacity duration-300
                           flex flex-col justify-end p-6"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-indigo-300 mb-2">
                  {blog.platform}
                </span>

                <h3 className="text-xl font-semibold text-white mb-2">
                  {blog.title}
                </h3>

                <p className="text-gray-200 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                <div className="flex items-center gap-2 text-indigo-300 font-medium">
                  Read Article
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
