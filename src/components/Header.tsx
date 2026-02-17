"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 w-full z-50 bg-navy-900/80 backdrop-blur-md border-b border-navy-700/50 shadow-sm"
    >
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <a
          href="#"
          className="text-green font-bold text-xl md:text-2xl font-mono"
        >
          &lt;S/&gt;
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, i) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-slate-400 hover:text-green text-sm font-mono transition-colors"
              >
                <span className="text-green mr-1">0{i + 1}.</span>
                {link.name}
              </a>
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
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 bg-navy-800 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-slate-200 hover:text-green text-lg font-mono"
              >
                <span className="text-green mr-2">0{i + 1}.</span>
                {link.name}
              </a>
            ))}
            <a
              href="/resume.pdf"
              className="px-8 py-3 border border-green text-green font-mono rounded hover:bg-green/10 transition-colors"
            >
              Resume
            </a>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
