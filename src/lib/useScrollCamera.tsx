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
export const SECTION_STOPS = [0, -40, -80, -120, -160, -200, -240];
export const SECTION_IDS = [
  "hero",
  "about",
  "skills",
  "projects",
  "products",
  "career",
  "contact",
];

// Total scroll travel in Z units
const Z_START = SECTION_STOPS[0];
const Z_END = SECTION_STOPS[SECTION_STOPS.length - 1];
const TOTAL_Z = Math.abs(Z_END - Z_START);

// Camera config
const LERP_FACTOR = 0.06;

// Visibility config
export const MAX_VISIBLE_DISTANCE = 30; // Increased to 30 to provide overlap cross-fades and prevent "black space" between sections.

// Scroll pacing - keep the total runway unchanged, but allocate more of it to
// each section's pause phase so sections feel stickier without slowing the page.
const BASE_SCROLL_HEIGHT_MULTIPLIER = 1.5;
const PAUSE_WEIGHT = 0.26;
const TRANSITION_WEIGHT = 0.85;
const SCROLL_STORAGE_KEY = "portfolio-scroll-y-v2";

export const SCROLL_SPACER_HEIGHT =
  `${SECTION_STOPS.length * BASE_SCROLL_HEIGHT_MULTIPLIER * 100}vh`;

const getTotalWeight = (
  numSections: number,
  pauseWeight = PAUSE_WEIGHT,
  transitionWeight = TRANSITION_WEIGHT,
) => numSections * pauseWeight + (numSections - 1) * transitionWeight;

const clampSectionIndex = (index: number, numSections: number) =>
  Math.min(numSections - 1, Math.max(0, index));

const getSectionTargetProgress = (index: number, numSections: number) => {
  if (numSections <= 1) return 0;

  const safeIndex = clampSectionIndex(index, numSections);
  if (safeIndex === numSections - 1) return 1;

  const totalWeight = getTotalWeight(numSections);
  const pauseStartWeight = safeIndex * (PAUSE_WEIGHT + TRANSITION_WEIGHT);
  const targetWeight = pauseStartWeight + PAUSE_WEIGHT / 2;
  return targetWeight / totalWeight;
};

const clampScrollTop = (scrollTop: number, scrollHeight: number) =>
  Math.min(scrollHeight, Math.max(0, scrollTop));

const rememberScrollTop = (scrollTop: number) => {
  try {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, String(Math.round(scrollTop)));
  } catch {
    // Ignore private browsing/storage denial; scroll restoration remains best-effort.
  }
};

const getRememberedScrollTop = (scrollHeight: number) => {
  try {
    const value = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (value === null) return null;
    const scrollTop = Number(value);
    if (!Number.isFinite(scrollTop)) return null;
    return clampScrollTop(scrollTop, scrollHeight);
  } catch {
    return null;
  }
};

const getScrollSnapshot = (scrollTop: number, scrollHeight: number) => {
  const rawProgress = Math.min(
    1,
    Math.max(0, scrollTop / Math.max(1, scrollHeight)),
  );
  const snappedProgress = applyScrollSnapping(rawProgress, SECTION_STOPS.length);
  return {
    cameraZ: Z_START - snappedProgress * TOTAL_Z + 10,
    progress: snappedProgress,
    isReady: true,
  };
};

const getInitialScrollState = (): ScrollState => {
  if (typeof window === "undefined") {
    return { cameraZ: 10, progress: 0, isReady: false };
  }

  const scrollHeight = getScrollHeight() - window.innerHeight;
  const rememberedScrollTop = getRememberedScrollTop(scrollHeight);
  const scrollTop = rememberedScrollTop ?? clampScrollTop(window.scrollY || 0, scrollHeight);
  return getScrollSnapshot(scrollTop, scrollHeight);
};

const getLegacyHashSection = () => {
  const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
  const sectionIndex = SECTION_IDS.indexOf(hash);
  return sectionIndex === -1 ? null : sectionIndex;
};

const clearLegacySectionHash = () => {
  if (getLegacyHashSection() === null) return;

  history.replaceState(
    history.state,
    "",
    `${location.pathname}${location.search}`,
  );
};

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

  const totalWeight = getTotalWeight(numSections);
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
  isReady: boolean;
}

const ScrollContext = createContext<ScrollState>({
  cameraZ: 10,
  progress: 0,
  isReady: false,
});

export function useScrollState() {
  return useContext(ScrollContext);
}

export function getScrollHeight(): number {
  return SECTION_STOPS.length * window.innerHeight * BASE_SCROLL_HEIGHT_MULTIPLIER;
}

export function scrollToSection(index: number): void {
  const scrollHeight = getScrollHeight() - window.innerHeight;
  const numSections = SECTION_STOPS.length;
  if (numSections <= 1) return;

  const safeIndex = clampSectionIndex(index, numSections);
  const targetProgress = getSectionTargetProgress(safeIndex, numSections);
  // Explicitly force absolute 0 for the Hero section so we hit the exact top
  // of the HTML document, triggering a full runway approach animation.
  const targetScroll = safeIndex === 0 ? 0 : targetProgress * scrollHeight;

  // CRITICAL: Temporarily disable CSS scroll-smooth on <html> so
  // scrollTo is truly instant. Otherwise the browser's native smooth
  // scroll fires continuous scroll events over ~500ms, bypassing our
  // constant-speed camera animation.
  _isNavFlying = true;
  _isNavArriving = false;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nav-start"));
  }
  rememberScrollTop(targetScroll);
  const html = document.documentElement;
  html.style.scrollBehavior = "auto";
  window.scrollTo({ top: targetScroll, behavior: "instant" as ScrollBehavior });
  // Restore scroll-smooth after a microtask so it doesn't affect this scrollTo
  requestAnimationFrame(() => {
    html.style.scrollBehavior = "";
  });
}

// ─── Shared nav travel state ───
const NAV_CRUISE_SPEED = 3.5; // Constant Z-units per frame during fly-through
const NAV_ARRIVE_DIST = 15; // Within this distance, switch to LERP for smooth landing
const NAV_ARRIVE_LERP = 0.1; // LERP factor for landing phase

/** Whether we're in a nav-triggered fly-through */
let _isNavFlying = false;
let _isNavArriving = false;

/**
 * Computes the camera movement delta for this frame.
 * During nav flying: constant speed cruise, then LERP landing.
 * During normal scroll: standard LERP.
 */
export function getNavDelta(currentZ: number, targetZ: number): number {
  if (!_isNavFlying) {
    return (targetZ - currentZ) * LERP_FACTOR;
  }

  const diff = targetZ - currentZ;
  const dist = Math.abs(diff);
  const dir = Math.sign(diff);

  if (dist < NAV_ARRIVE_DIST) {
    // Close to target — use LERP for smooth deceleration
    return diff * NAV_ARRIVE_LERP;
  }

  // Cruise at constant speed through intermediate sections
  return dir * NAV_CRUISE_SPEED;
}

// Keep this export for CameraRig compatibility
export function getEffectiveLerp(distToTarget?: number): number {
  if (!_isNavFlying) return LERP_FACTOR;
  const dist = distToTarget ?? NAV_ARRIVE_DIST;
  if (dist < NAV_ARRIVE_DIST) return NAV_ARRIVE_LERP;
  return LERP_FACTOR; // not used when getNavDelta handles it, but kept as fallback
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
  const [state, setState] = useState<ScrollState>(getInitialScrollState);
  const animRef = useRef<number>(0);
  const targetZ = useRef(state.cameraZ);
  const currentZ = useRef(state.cameraZ);

  const updateTarget = useCallback(() => {
    const scrollTop = window.scrollY || 0;
    const scrollHeight = getScrollHeight() - window.innerHeight;
    const snapshot = getScrollSnapshot(scrollTop, scrollHeight);
    targetZ.current = snapshot.cameraZ;
  }, []);

  useEffect(() => {
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const restoreScroll = () => {
      const scrollHeight = getScrollHeight() - window.innerHeight;
      const hashSection = getLegacyHashSection();
      const rememberedScrollTop = getRememberedScrollTop(scrollHeight);
      const hashTargetProgress =
        hashSection === null
          ? null
          : getSectionTargetProgress(hashSection, SECTION_STOPS.length);
      const targetScroll =
        hashTargetProgress === null
          ? rememberedScrollTop ?? clampScrollTop(window.scrollY || 0, scrollHeight)
          : hashSection === 0
            ? 0
            : hashTargetProgress * scrollHeight;
      const snapshot = getScrollSnapshot(targetScroll, scrollHeight);
      const html = document.documentElement;
      const previousScrollBehavior = html.style.scrollBehavior;

      clearLegacySectionHash();
      html.style.scrollBehavior = "auto";
      window.scrollTo({
        top: targetScroll,
        behavior: "instant" as ScrollBehavior,
      });
      html.style.scrollBehavior = previousScrollBehavior;
      _isNavFlying = false;
      _isNavArriving = false;
      rememberScrollTop(targetScroll);
      targetZ.current = snapshot.cameraZ;
      currentZ.current = snapshot.cameraZ;
      setState(snapshot);
    };

    restoreScroll();

    const onScroll = () => {
      rememberScrollTop(window.scrollY || 0);
      updateTarget();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const animate = () => {
      // Use constant-speed cruise during nav, normal LERP otherwise
      currentZ.current += getNavDelta(currentZ.current, targetZ.current);

      // End nav flying once camera has arrived
      const distanceToTarget = Math.abs(targetZ.current - currentZ.current);

      if (
        _isNavFlying &&
        !_isNavArriving &&
        distanceToTarget < NAV_ARRIVE_DIST
      ) {
        _isNavArriving = true;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("nav-arrive"));
        }
      }

      if (_isNavFlying && distanceToTarget < 1) {
        _isNavFlying = false;
        _isNavArriving = false;
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("nav-stop"));
        }
      }

      const scrollTop = window.scrollY || 0;
      const scrollHeight = getScrollHeight() - window.innerHeight;
      const snapshot = getScrollSnapshot(scrollTop, scrollHeight);
      // Only update state if significantly changed (saves React performance)
      setState((prev) => {
        if (
          Math.abs(prev.cameraZ - currentZ.current) < 0.001 &&
          Math.abs(prev.progress - snapshot.progress) < 0.001 &&
          prev.isReady
        ) {
          return prev;
        }
        return {
          cameraZ: currentZ.current,
          progress: snapshot.progress,
          isReady: true,
        };
      });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animRef.current);
    };
  }, [updateTarget]);

  return (
    <ScrollContext.Provider value={state}>{children}</ScrollContext.Provider>
  );
}
