"use client";

import { useRef, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  SECTION_STOPS,
  getScrollHeight,
  applyScrollSnapping,
} from "@/lib/useScrollCamera";

const Z_START = SECTION_STOPS[0];
const Z_END = SECTION_STOPS[SECTION_STOPS.length - 1];
const TOTAL_Z = Math.abs(Z_END - Z_START);
const LERP_FACTOR = 0.06;
const BASE_FOV = 60;
const FOV_RANGE = 3;

/**
 * CameraRig — place inside <Canvas>.
 * Reads window.scrollY each frame and smoothly moves the camera along Z.
 */
export function CameraRig() {
  const { camera } = useThree();
  const targetZ = useRef(10);
  const currentZ = useRef(10);
  const velocity = useRef(0);
  const prevZ = useRef(10);

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
    camera.position.z = currentZ.current;

    const onScroll = () => updateTarget();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [camera, updateTarget]);

  useFrame(() => {
    currentZ.current += (targetZ.current - currentZ.current) * LERP_FACTOR;

    velocity.current = Math.abs(currentZ.current - prevZ.current);
    prevZ.current = currentZ.current;

    camera.position.set(0, 0, currentZ.current);

    // Subtle dynamic FOV
    const fovTarget = BASE_FOV + Math.min(FOV_RANGE, velocity.current * 8);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov += (fovTarget - camera.fov) * 0.1;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
