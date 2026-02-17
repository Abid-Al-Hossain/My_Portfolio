"use client";

import { motion } from "framer-motion";
import Section from "./Section";

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
    <Section id="skills">
      <div className="space-y-12">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <span className="text-green font-mono text-2xl">02.</span> Skills &
            Tech Stack
          </h2>
          <div className="h-[1px] bg-navy-600 flex-grow max-w-xs"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-navy-800 p-6 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-navy-700 hover:border-green/30 group"
            >
              <h3 className="text-xl font-bold text-slate-200 mb-4 group-hover:text-green transition-colors">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((item) => (
                  <li
                    key={item}
                    className="text-slate-400 text-sm flex items-center gap-2"
                  >
                    <span className="text-green text-xs">▹</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
