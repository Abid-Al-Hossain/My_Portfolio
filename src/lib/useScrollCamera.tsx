"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

// Section Z-stops along the negative Z-axis
export const SECTION_STOPS = [0, -40, -80, -120, -160, -200];
export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "career",
  "contact",
];

// Total scroll travel in Z units
const Z_START = SECTION_STOPS[0];
const Z_END = SECTION_STOPS[SECTION_STOPS.length - 1];
const TOTAL_Z = Math.abs(Z_END - Z_START);

// Camera config
const LERP_FACTOR = 0.06;
const BASE_FOV = 60;
const FOV_RANGE = 3;

// Visibility config
export const MAX_VISIBLE_DISTANCE = 20;

// ─── Shared Scroll State Context ───
interface ScrollState {
  cameraZ: number;
  progress: number;
}

const ScrollContext = createContext<ScrollState>({ cameraZ: 10, progress: 0 });

export function useScrollState() {
  return useContext(ScrollContext);
}

export function getScrollHeight(): number {
  return SECTION_STOPS.length * window.innerHeight;
}

export function scrollToSection(index: number): void {
  const scrollHeight = getScrollHeight() - window.innerHeight;
  const targetScroll = (index / (SECTION_STOPS.length - 1)) * scrollHeight;
  window.scrollTo({ top: targetScroll, behavior: "smooth" });
}

/**
 * Computes section visibility (scale, opacity) based on distance from camera.
 */
export function getSectionVisibility(cameraZ: number, sectionZ: number) {
  const distance = Math.abs(cameraZ - (sectionZ + 10)); // +10 matches camera offset
  const t = Math.max(0, 1 - distance / MAX_VISIBLE_DISTANCE);
  // Smoothstep easing for cinematic feel
  const eased = t * t * (3 - 2 * t);
  const scale = 0.7 + 0.3 * eased;
  const opacity = eased;
  return { scale, opacity, distance, visible: opacity > 0.01 };
}

// ─── ScrollProvider: manages scroll → camera state ───
export function ScrollProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ScrollState>({ cameraZ: 10, progress: 0 });
  const animRef = useRef<number>(0);
  const targetZ = useRef(10);
  const currentZ = useRef(10);

  const updateTarget = useCallback(() => {
    const scrollTop = window.scrollY || 0;
    const scrollHeight = getScrollHeight() - window.innerHeight;
    const progress = Math.min(
      1,
      Math.max(0, scrollTop / Math.max(1, scrollHeight)),
    );
    targetZ.current = Z_START - progress * TOTAL_Z + 10; // +10 camera offset
  }, []);

  useEffect(() => {
    updateTarget();
    currentZ.current = targetZ.current;

    const onScroll = () => updateTarget();
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      currentZ.current += (targetZ.current - currentZ.current) * LERP_FACTOR;
      const scrollTop = window.scrollY || 0;
      const scrollHeight = getScrollHeight() - window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, scrollTop / Math.max(1, scrollHeight)),
      );
      setState({ cameraZ: currentZ.current, progress });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animRef.current);
    };
  }, [updateTarget]);

  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
}
