"use client";

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
  return (
    <div className="space-y-12 text-slate-100">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          Skills &amp; Tech Stack
        </h2>
        <div className="h-[1px] bg-navy-600 flex-grow max-w-xs" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skillGroup) => (
          <div
            key={skillGroup.category}
            className="bg-navy-700/60 backdrop-blur-xl p-6 rounded-lg hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] hover:scale-[1.02] transition-all duration-700 border border-white/10 hover:border-green/40 group"
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
    </div>
  );
}
