"use client";

import { motion } from "framer-motion";
import Section from "./Section";
import { Mail, Linkedin, Github, Facebook, Instagram } from "lucide-react";

export default function Contact() {
  return (
    <Section id="contact" className="min-h-[70vh] mb-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <p className="text-green font-mono">04. What’s Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-200">
          Get In Touch
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          I’m currently looking for new opportunities, my inbox is always open.
          Whether you have a question or just want to say hi, I’ll try my best
          to get back to you!
        </p>

        <a
          href="mailto:aabid.al.hossain@gmail.com"
          className="inline-block px-8 py-4 border border-green text-green font-mono rounded hover:bg-green/10 transition-colors mt-8"
        >
          Say Hello
        </a>

        <div className="flex justify-center gap-6 pt-12">
          <a
            href="https://github.com/Abid-Al-Hossain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green transition-transform hover:-translate-y-1"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/abid-ahmed-5a1385234/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green transition-transform hover:-translate-y-1"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com/swakkhar.abid"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green transition-transform hover:-translate-y-1"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/procchod123/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green transition-transform hover:-translate-y-1"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a
            href="mailto:aabid.al.hossain@gmail.com"
            className="text-slate-400 hover:text-green transition-transform hover:-translate-y-1"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
