"use client";

import { useRef, useState, useEffect } from "react";

const skills = [
  {
    category: "Languages",
    items: [
      "JavaScript (ES6+)",
      "TypeScript",
      "Python",
      "Java",
      "C++",
      "Kotlin",
      "HTML5",
      "CSS3",
      "SQL",
      "NoSQL",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Material UI",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs",
      "Authentication (JWT, OAuth)",
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
      "Render",
      "Android Studio",
    ],
  },
  {
    category: "Machine Learning",
    items: [
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "XGBoost",
      "LightGBM",
      "CatBoost",
    ],
  },
];

export default function Skills() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll position for active indicator
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.children[0]?.clientWidth || 300;
      const gap = 24;
      const idx = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, skills.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.children[0]?.clientWidth || 300;
    const gap = 24;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="text-slate-100" style={{ perspective: "1200px" }}>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white">Skills & Tech Stack</h2>
        <div className="h-[1px] bg-navy-600 flex-grow max-w-xs" />
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {skills.map((skillGroup, i) => (
          <div
            key={skillGroup.category}
            className="flex-shrink-0 w-[280px] md:w-[320px] snap-center bg-navy-700/60 backdrop-blur-xl p-6 rounded-lg hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] hover:scale-[1.02] transition-all duration-700 border border-white/10 hover:border-green/40 group"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-green transition-colors">
              {skillGroup.category}
            </h3>
            <ul className="space-y-2">
              {skillGroup.items.map((item) => (
                <li
                  key={item}
                  className="text-slate-300 font-light text-base flex items-center gap-2"
                >
                  <span className="text-green text-xs">▹</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {skills.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-green w-6"
                : "bg-slate-500/50 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="text-center text-slate-500 text-xs mt-2 tracking-widest uppercase">
        ← swipe →
      </p>
    </div>
  );
}
