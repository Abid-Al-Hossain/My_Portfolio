"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "./Section";
import { fadeInUp } from "@/lib/animations";

export default function About() {
  return (
    <Section id="about">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              About Me
            </h2>
            <div className="h-[1px] bg-navy-600 flex-grow max-w-xs"></div>
          </div>

          <div className="text-lg font-light space-y-4 leading-relaxed">
            <p>
              Hello! My name is Swakkhar and I enjoy creating things that live
              on the internet. My interest in web development started back when
              I decided to try editing custom Tumblr themes — turns out hacking
              together HTML & CSS is pretty cool!
            </p>
            <p>
              Fast-forward to today, and I’ve had the privilege of building
              software for a{" "}
              <span className="text-green">student management system</span>, a{" "}
              <span className="text-green">large UI library</span>, and various
              machine learning projects. My main focus these days is building
              accessible, inclusive products and digital experiences for a
              variety of clients.
            </p>
            <p>
              I also have a strong background in competitive programming and
              Machine Learning, which helps me write efficient, optimized code.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-2 text-base font-light font-mono text-slate-300 mt-4">
            {[
              "JavaScript (ES6+)",
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "MongoDB",
              "Tailwind CSS",
            ].map((skill) => (
              <li key={skill} className="flex items-center gap-2">
                <span className="text-green">▹</span> {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative group mx-auto md:mx-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded z-10 overflow-hidden transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
            <Image
              src="/avatar.jpeg"
              alt="Swakkhar"
              fill
              className="object-cover transition-all duration-300 pointer-events-none"
            />
          </div>
          <div className="absolute top-4 left-4 w-64 h-64 md:w-80 md:h-80 border-2 border-green rounded z-0 transition-transform duration-300 group-hover:translate-y-2 group-hover:translate-x-2"></div>
        </div>
      </motion.div>
    </Section>
  );
}
