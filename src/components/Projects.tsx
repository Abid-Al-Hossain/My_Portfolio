"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";
import Section from "./Section";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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
  return (
    <Section id="projects">
      <div className="space-y-12">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          Projects
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-navy-700/60 backdrop-blur-xl p-6 rounded-lg border border-white/10 hover:border-green/60 hover:shadow-[0_0_30px_rgba(100,255,218,0.2)] transition-all duration-700 group hover:scale-[1.02]"
            >
              <div className="flex justify-between items-start mb-4">
                <Folder className="w-10 h-10 text-green" />
                <div className="flex gap-4">
                  <Github className="w-5 h-5 text-slate-400 hover:text-green cursor-pointer" />
                  <ExternalLink className="w-5 h-5 text-slate-400 hover:text-green cursor-pointer" />
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
    </Section>
  );
}
