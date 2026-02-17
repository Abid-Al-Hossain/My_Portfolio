"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-7xl mx-auto pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-green font-mono text-sm md:text-base mb-4 tracking-wider">
          Hi, my name is
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Swakkhar.
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-6 tracking-tight">
          I build things for the web.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-slate-400 max-w-xl text-lg mb-10 leading-relaxed">
          I’m a software engineer specializing in building (and occasionally
          designing) exceptional digital experiences. Currently, I’m focused on
          building accessible, human-centered products.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex gap-4"
      >
        <a
          href="#projects"
          className="px-6 py-4 rounded bg-transparent border border-green text-green font-mono text-sm hover:bg-green/10 transition-colors flex items-center gap-2 group"
        >
          Check out my work
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <button className="px-6 py-4 rounded bg-green/10 text-green font-mono text-sm hover:bg-green/20 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Resume
        </button>
      </motion.div>
    </section>
  );
}
