"use client";

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
        setShowCursor1(true);
        for (let i = 0; i <= name.length; i++) {
          if (isCancelled) break;
          setText1(name.slice(0, i));
          await new Promise((r) => setTimeout(r, 100));
        }
        setShowCursor1(false);

        setShowCursor2(true);
        for (let i = 0; i <= title.length; i++) {
          if (isCancelled) break;
          setText2(title.slice(0, i));
          await new Promise((r) => setTimeout(r, 50));
        }

        await new Promise((r) => setTimeout(r, 3000));

        for (let i = title.length; i >= 0; i--) {
          if (isCancelled) break;
          setText2(title.slice(0, i));
          await new Promise((r) => setTimeout(r, 30));
        }
        setShowCursor2(false);

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
    <div className="min-h-[80vh] flex flex-col justify-center text-slate-100 pt-24 md:pt-32">
      <p className="text-green font-mono text-lg md:text-xl mb-6 tracking-wider">
        Hi, my name is
      </p>

      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight min-h-[1.2em]">
        {text1}
        {showCursor1 && <span className="animate-pulse text-green">_</span>}
      </h1>

      <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-6 tracking-tight min-h-[1.2em]">
        {text2}
        {showCursor2 && <span className="animate-pulse text-green">_</span>}
      </h2>

      <p className="text-slate-400 max-w-xl text-lg mb-10 leading-relaxed">
        I&apos;m a software engineer specializing in building (and occasionally
        designing) exceptional digital experiences. Currently, I&apos;m focused
        on building accessible, human-centered products.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => {
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-4 rounded bg-transparent border border-green text-green font-mono text-sm hover:bg-green/10 transition-colors flex items-center gap-2 group"
        >
          Check out my work
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
        <button className="px-6 py-4 rounded bg-green/10 text-green font-mono text-sm hover:bg-green/20 transition-colors flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Resume
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-16 text-slate-400 text-center animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-400 to-transparent mx-auto mb-2 opacity-50" />
        <p className="text-xs font-mono tracking-widest opacity-70">SCROLL</p>
      </div>
    </div>
  );
}
