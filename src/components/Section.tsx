"use client";

import { ReactNode, useRef, useEffect } from "react";
import {
  useScrollState,
  getSectionVisibility,
  SECTION_STOPS,
} from "@/lib/useScrollCamera";

interface SectionPortalProps {
  children: ReactNode;
  sectionIndex: number;
  id?: string;
}

export default function SectionPortal({
  children,
  sectionIndex,
  id,
}: SectionPortalProps) {
  const { cameraZ } = useScrollState();
  const containerRef = useRef<HTMLDivElement>(null);
  const zPosition = SECTION_STOPS[sectionIndex];

  useEffect(() => {
    if (!containerRef.current) return;
    const { scale, opacity, visible } = getSectionVisibility(
      cameraZ,
      zPosition,
    );

    containerRef.current.style.transform = `scale(${scale})`;
    containerRef.current.style.opacity = String(opacity);
    containerRef.current.style.pointerEvents = visible ? "auto" : "none";
    containerRef.current.style.visibility = visible ? "visible" : "hidden";
  }, [cameraZ, zPosition]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="fixed inset-0 z-20 flex items-center justify-center"
      style={{
        willChange: "transform, opacity",
        transformOrigin: "center center",
        opacity: 0,
        visibility: "hidden",
      }}
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {children}
      </div>
    </div>
  );
}
