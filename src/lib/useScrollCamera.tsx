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

// Scroll pacing — how much of each section's scroll budget is a deadzone vs transition
const PAUSE_WEIGHT = 0.2; // 20% pause (subtle sticky feel)
const TRANSITION_WEIGHT = 0.8; // 80% smooth movement between sections

/**
 * Maps linear scroll progress [0, 1] into a stepped progress with plateaus
 * at each section stop. This makes sections "sticky" when fully visible
 * while keeping transitions between sections smooth.
 */
export function applyScrollSnapping(
  progress: number,
  numSections: number,
): number {
  if (numSections <= 1) return progress;

  const totalWeight =
    numSections * PAUSE_WEIGHT + (numSections - 1) * TRANSITION_WEIGHT;
  const currentWeight = progress * totalWeight;

  let accumulatedWeight = 0;

  for (let i = 0; i < numSections; i++) {
    // 1. Pause phase for section i — output stays flat
    accumulatedWeight += PAUSE_WEIGHT;
    if (currentWeight <= accumulatedWeight) {
      return i / (numSections - 1);
    }

    // 2. Transition phase from section i to i+1 — output ramps smoothly
    if (i < numSections - 1) {
      if (currentWeight <= accumulatedWeight + TRANSITION_WEIGHT) {
        const transitionProgress =
          (currentWeight - accumulatedWeight) / TRANSITION_WEIGHT;
        // Smoothstep easing for natural acceleration/deceleration
        const eased =
          transitionProgress < 0.5
            ? 2 * transitionProgress * transitionProgress
            : 1 - Math.pow(-2 * transitionProgress + 2, 2) / 2;
        return (i + eased) / (numSections - 1);
      }
      accumulatedWeight += TRANSITION_WEIGHT;
    }
  }

  return 1;
}

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
  // Multiply by 1.5 to provide extra scroll room for the deadzones
  return SECTION_STOPS.length * window.innerHeight * 1.5;
}

export function scrollToSection(index: number): void {
  const scrollHeight = getScrollHeight() - window.innerHeight;
  const numSections = SECTION_STOPS.length;
  if (numSections <= 1) return;

  const totalWeight =
    numSections * PAUSE_WEIGHT + (numSections - 1) * TRANSITION_WEIGHT;

  // Target the middle of the pause phase for this section
  const pauseStartWeight = index * (PAUSE_WEIGHT + TRANSITION_WEIGHT);
  const targetWeight = pauseStartWeight + PAUSE_WEIGHT / 2;

  const targetProgress = targetWeight / totalWeight;
  const targetScroll = targetProgress * scrollHeight;

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
    const rawProgress = Math.min(
      1,
      Math.max(0, scrollTop / Math.max(1, scrollHeight)),
    );
    const snappedProgress = applyScrollSnapping(
      rawProgress,
      SECTION_STOPS.length,
    );
    targetZ.current = Z_START - snappedProgress * TOTAL_Z + 10; // +10 camera offset
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
      const rawProgress = Math.min(
        1,
        Math.max(0, scrollTop / Math.max(1, scrollHeight)),
      );
      const snappedProgress = applyScrollSnapping(
        rawProgress,
        SECTION_STOPS.length,
      );
      setState({ cameraZ: currentZ.current, progress: snappedProgress });
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
