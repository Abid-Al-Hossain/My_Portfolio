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

  const prevVisibleRef = useRef(false);

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

    // Only allow internal scrolling when the section is 100% in focus (opacity >= 0.99)
    // This prevents the section from trapping the swipe gesture while it's still animating in
    const isFullyVisible = opacity >= 0.99;
    containerRef.current.style.overflowY = isFullyVisible ? "auto" : "hidden";

    // Only reset scroll to top exactly when the section BECOMES visible (entering view)
    if (visible && !prevVisibleRef.current) {
      if (containerRef.current.scrollTop !== 0) {
        containerRef.current.scrollTop = 0;
      }
    }

    // Remember visibility state for next frame
    prevVisibleRef.current = visible;
  }, [cameraZ, zPosition]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="fixed inset-0 z-20 flex items-start sm:items-center justify-center overflow-x-hidden pt-12 pb-8 sm:pt-0 sm:pb-0 scrollbar-hide"
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
