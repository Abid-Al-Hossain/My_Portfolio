"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { Briefcase, Globe, Terminal } from "lucide-react";

export default function Career() {
  return (
    <Section id="career">
      <div className="space-y-12">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <span className="text-green font-mono text-2xl">04.</span> Career &
            Direction
          </h2>
          <div className="h-[1px] bg-navy-600 flex-grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-[1fr_2px_1fr] gap-8 md:gap-12 relative">
          <div className="bg-navy-700/60 backdrop-blur-xl p-6 rounded-lg border border-white/10 hover:border-green/40 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] hover:scale-[1.02] transition-all duration-700 group space-y-6 flex flex-col h-full">
            <div>
              <div className="flex items-center gap-3 text-white text-xl font-bold mb-6">
                <Globe className="text-green" />
                <h3>Future Goals</h3>
              </div>
              <p className="text-lg font-light leading-relaxed mb-6">
                I am highly interested in{" "}
                <span className="text-green">remote work</span> opportunities
                and building SaaS products. My long-term goal is to specialize
                in scalable architecture and distributed systems while
                continuing to refine my frontend engineering skills.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap mt-auto">
              {[
                "Remote First",
                "SaaS Development",
                "Open Source",
                "Scalable Systems",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-navy-700/50 text-green rounded-full text-sm font-light font-mono border border-green/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline Line (Desktop) */}
          <div className="hidden md:block w-0.5 bg-navy-600 relative h-full min-h-[300px]">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-green rounded-full shadow-[0_0_10px_#64ffda]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy-400 rounded-full border border-slate-600"></div>
          </div>

          {/* Future Goals */}
          <div className="space-y-8 h-full">
            <div className="bg-navy-800/50 p-6 rounded-lg border border-white/5 hover:border-green/30 transition-colors h-full flex flex-col">
              <div className="flex items-center gap-3 text-white text-xl font-bold mb-6">
                <Terminal className="text-green" />
                <h3>Engineering Mindset</h3>
              </div>
              <ul className="space-y-4 flex-grow">
                {[
                  {
                    title: "Precision",
                    desc: "Pixel-perfect implementation from Figma to Code.",
                  },
                  {
                    title: "Performance",
                    desc: "Optimizing for speed, accessibility, and SEO.",
                  },
                  {
                    title: "Scalability",
                    desc: "Building modular, component-driven architectures.",
                  },
                  {
                    title: "Clean Code",
                    desc: "Writing maintainable, type-safe code with best practices.",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 group">
                    <div className="min-w-[40px] h-[40px] bg-navy-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-green font-mono border border-white/10 group-hover:border-green/50 transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-slate-200 font-bold group-hover:text-green transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-slate-300 font-light text-base">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
