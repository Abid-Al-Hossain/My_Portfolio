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

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-navy-700/60 backdrop-blur-xl p-8 rounded-lg border border-white/10 hover:border-green/40 hover:shadow-[0_0_25px_rgba(100,255,218,0.15)] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 text-white text-xl font-bold">
              <Globe className="text-green" />
              <h3>Future Goals</h3>
            </div>
            <p className="text-slate-400 leading-relaxed">
              I am highly interested in{" "}
              <span className="text-green">remote work</span> opportunities and
              building SaaS products. My long-term goal is to specialize in
              scalable architecture and distributed systems while continuing to
              refine my frontend engineering skills.
            </p>
            <div className="flex gap-4 flex-wrap">
              {[
                "Remote First",
                "SaaS Development",
                "Open Source",
                "Scalable Systems",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-navy-700/50 text-green rounded-full text-xs font-mono border border-green/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 text-white text-xl font-bold">
              <Terminal className="text-green" />
              <h3>Engineering Mindset</h3>
            </div>
            <ul className="space-y-6">
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
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
