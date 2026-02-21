"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={cn(
        "min-h-screen py-20 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto flex flex-col justify-center",
        className,
      )}
    >
      {children}
    </motion.section>
  );
}
