"use client";

export default function Career() {
  return (
    <div className="space-y-12 text-slate-100 pt-14 pb-12 md:py-0">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          <span className="text-green font-mono text-2xl">04.</span> Career
          &amp; Direction
        </h2>
        <div className="h-[1px] bg-navy-600 flex-grow max-w-xs" />
      </div>

      <div className="grid md:grid-cols-[1fr_2px_1fr] gap-8 md:gap-12 relative">
        <div className="bg-navy-700/60 backdrop-blur-xl p-6 rounded-lg border border-white/10 hover:border-green/40 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] hover:scale-[1.02] transition-all duration-700 group space-y-6 flex flex-col h-full">
          <div>
            <div className="flex items-center gap-3 text-white text-xl font-bold mb-6">
              <svg
                className="w-6 h-6 text-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" strokeWidth={2} />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                />
              </svg>
              <h3>Future Goals</h3>
            </div>
            <p className="text-lg font-light leading-relaxed mb-6">
              I am highly interested in{" "}
              <span className="text-green">remote work</span> opportunities and
              building SaaS products. My long-term goal is to specialize in
              scalable architecture and distributed systems while continuing to
              refine my frontend engineering skills.
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
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-green rounded-full shadow-[0_0_10px_#64ffda]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-3 h-3 bg-navy-400 rounded-full border border-slate-600" />
        </div>

        {/* Engineering Mindset */}
        <div className="space-y-8 h-full">
          <div className="bg-navy-800/50 p-6 rounded-lg border border-white/5 hover:border-green/30 transition-colors h-full flex flex-col">
            <div className="flex items-center gap-3 text-white text-xl font-bold mb-6">
              <svg
                className="w-6 h-6 text-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <polyline
                  points="4,17 10,11 4,5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="12"
                  y1="19"
                  x2="20"
                  y2="19"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
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
  );
}
