'use client';

import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from "@/components/SearchBar";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: 'Services', href: '/#services' },
    { name: 'Blogs', href: '/#blogs' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'About Us', href: '/#about' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Join Us', href: '/careers' },
  ];

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-xl
        bg-white/80 dark:bg-black/70
        border-b border-gray-200 dark:border-gray-800
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" aria-label="Planitt Home" className="flex items-center">
            <Image
              src="/planitt-logo.png"
              alt="Planitt Logo"
              width={48}
              height={48}
              priority
              className="transition-transform duration-200 hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                    text-gray-700 dark:text-gray-300
                    hover:text-blue-600 dark:hover:text-blue-400
                    font-medium transition-colors
                  "
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search + Theme */}
            <div className="flex items-center gap-4">
              <SearchBar />

              <button
                onClick={toggleTheme}
                className="
                  p-2 rounded-lg
                  border border-gray-200 dark:border-gray-800
                  bg-gray-100 dark:bg-gray-900
                  hover:bg-gray-200 dark:hover:bg-gray-800
                  transition
                "
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="
                p-2 rounded-lg
                border border-gray-200 dark:border-gray-800
                bg-gray-100 dark:bg-gray-900
              "
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">

              {/* 🔍 Mobile Search */}
              <div className="mb-3">
                <SearchBar />
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    block px-3 py-2 rounded-md
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-900
                  "
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
