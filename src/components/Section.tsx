import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "min-h-screen py-20 px-6 md:px-20 lg:px-32 max-w-7xl mx-auto flex flex-col justify-center",
        className,
      )}
    >
      {children}
    </section>
  );
}
