"use client";

import { useState, useEffect, useCallback } from "react";
import { scrollToSection, SECTION_IDS } from "@/lib/useScrollCamera";

const navLinks = [
  { name: "About", index: 1 },
  { name: "Skills", index: 2 },
  { name: "Projects", index: 3 },
  { name: "Contact", index: 5 },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  const handleNavClick = useCallback((index: number) => {
    scrollToSection(index);
    setIsOpen(false);
  }, []);

  return (
    <header
      style={{ backgroundColor: "rgba(17, 34, 64, 0.60)" }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-navy-700/50 shadow-sm transition-all duration-700 ${
        hidden
          ? "opacity-0 -translate-y-5 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => handleNavClick(0)}
          className="text-green font-bold text-xl md:text-2xl font-mono"
        >
          &lt;S/&gt;
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleNavClick(link.index)}
                className="text-slate-400 hover:text-green text-sm font-mono transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            </li>
          ))}
          <a
            href="/resume.pdf"
            className="px-4 py-2 border border-green text-green text-xs font-mono rounded hover:bg-green/10 transition-colors"
          >
            Resume
          </a>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-navy-800 z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.index)}
                className="text-slate-200 hover:text-green text-lg font-mono bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <a
              href="/resume.pdf"
              className="px-8 py-3 border border-green text-green font-mono rounded hover:bg-green/10 transition-colors"
            >
              Resume
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
