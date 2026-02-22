"use client";

import { useRef, useState, useEffect } from "react";

const projects = [
  {
    title: "UI Foundry / UI Kit System",
    description:
      "A large reusable UI component library built for scalability. Features theme customization and accessibility.",
    tech: ["React", "Typescript", "Tailwind CSS"],
    links: { github: "#", external: "#" },
  },
  {
    title: "Student Hall Management System",
    description:
      "Admin panel for managing university halls. Handles student data, fees, and room allocation.",
    tech: ["Next.js", "Node.js", "MongoDB", "Express"],
    links: { github: "#", external: "#" },
  },
  {
    title: "Lettery",
    description:
      "Modern Android app built with Kotlin and XML following Material Design 3 guidelines.",
    tech: ["Kotlin", "XML", "Material 3"],
    links: { github: "#", external: "#" },
  },
  {
    title: "Class Routine Management",
    description:
      "Automated timetable generation and attendance tracking system with conflict-free scheduling.",
    tech: ["React", "Node.js", "SQL"],
    links: { github: "#", external: "#" },
  },
  {
    title: "ML Ensembles",
    description:
      "Predictive models for CKD and Car Prices using XGBoost, LightGBM, and CatBoost.",
    tech: ["Python", "XGBoost", "Pandas"],
    links: { github: "#", external: "#" },
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      setIsAtStart(el.scrollLeft <= 5);
      setIsAtEnd(
        el.scrollWidth > el.clientWidth &&
          el.scrollLeft >= el.scrollWidth - el.clientWidth - 5,
      );

      if (!el.children.length) return;

      const containerRect = el.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(el.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();

        // Add a slight bias so the active index shifts to the next card slightly earlier,
        // which makes the left arrow appear much faster when you start scrolling.
        const childCenter = childRect.left + childRect.width / 2 - 40;

        const distance = Math.abs(containerCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };
    // Run once on mount to set initial states
    onScroll();

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el || !el.children[index]) return;
    const target = el.children[index] as HTMLElement;
    const targetScroll =
      target.offsetLeft - el.clientWidth / 2 + target.clientWidth / 2;
    el.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  return (
    <div className="text-slate-100" style={{ perspective: "1200px" }}>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white">Projects</h2>
        <div className="h-[1px] bg-navy-600 flex-grow max-w-xs" />
      </div>

      {/* Carousel with arrow indicators */}
      <div className="relative">
        {/* Left arrow */}
        {!isAtStart && (
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-navy-700/80 border border-white/10 text-slate-300 hover:text-green hover:border-green/40 transition-all duration-300 backdrop-blur-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right arrow */}
        {!isAtEnd && projects.length > 1 && (
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-navy-700/80 border border-white/10 text-slate-300 hover:text-green hover:border-green/40 transition-all duration-300 backdrop-blur-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          className="flex relative gap-6 overflow-x-auto pb-4 snap-x snap-mandatory px-12"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="flex-shrink-0 w-[300px] md:w-[360px] snap-center bg-navy-700/60 backdrop-blur-xl p-6 rounded-lg border border-white/10 hover:border-green/60 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-all duration-700 group hover:scale-[1.02]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex justify-between items-start mb-4">
                <svg
                  className="w-10 h-10 text-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                <div className="flex gap-4">
                  <a
                    href={project.links.github}
                    className="text-slate-400 hover:text-green cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={project.links.external}
                    className="text-slate-400 hover:text-green cursor-pointer"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-green transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-300 font-light text-base mb-4">
                {project.description}
              </p>
              <ul className="flex flex-wrap gap-2 text-sm font-light font-mono text-slate-400 mt-auto">
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {projects.map((_, i) => (
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

      <p className="text-center text-slate-500 text-xs mt-2 tracking-widest uppercase">
        ← swipe →
      </p>
    </div>
  );
}
