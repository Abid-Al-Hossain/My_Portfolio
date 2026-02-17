"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  const name = "Swakkhar.";
  const title = "I build things for the web.";

  useEffect(() => {
    let isCancelled = false;

    const loop = async () => {
      while (!isCancelled) {
        // 1. Type Name
        setShowCursor1(true);
        for (let i = 0; i <= name.length; i++) {
          if (isCancelled) break;
          setText1(name.slice(0, i));
          await new Promise((r) => setTimeout(r, 100)); // Typing speed
        }
        setShowCursor1(false);

        // 2. Type Title
        setShowCursor2(true);
        for (let i = 0; i <= title.length; i++) {
          if (isCancelled) break;
          setText2(title.slice(0, i));
          await new Promise((r) => setTimeout(r, 50)); // Faster typing for longer text
        }

        // 3. Wait
        await new Promise((r) => setTimeout(r, 3000));

        // 4. Delete Title
        for (let i = title.length; i >= 0; i--) {
          if (isCancelled) break;
          setText2(title.slice(0, i));
          await new Promise((r) => setTimeout(r, 30)); // Deleting speed
        }
        setShowCursor2(false);

        // 5. Delete Name
        setShowCursor1(true);
        for (let i = name.length; i >= 0; i--) {
          if (isCancelled) break;
          setText1(name.slice(0, i));
          await new Promise((r) => setTimeout(r, 50));
        }

        await new Promise((r) => setTimeout(r, 1000));
      }
    };

    loop();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 lg:px-32 max-w-7xl mx-auto pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-green font-mono text-lg md:text-xl mb-6 tracking-wider">
          Hi, my name is
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight min-h-[1.2em]">
          {text1}
          {showCursor1 && <span className="animate-pulse text-green">_</span>}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-6 tracking-tight min-h-[1.2em]">
          {text2}
          {showCursor2 && <span className="animate-pulse text-green">_</span>}
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-400 to-transparent mx-auto mb-2 opacity-50"></div>
        <p className="text-xs font-mono tracking-widest text-center opacity-70">
          SCROLL
        </p>
      </motion.div>
    </section>
  );
}
