"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollState } from "@/lib/useScrollCamera";

interface ShootingStarProps {
  delayRange?: [number, number]; // [min, max] in ms
  speed?: number;
}

export default function ShootingStar({
  delayRange = [5000, 7000],
  speed = 0.4, // Reduced default speed
}: ShootingStarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { cameraZ } = useScrollState();
  const [active, setActive] = useState(false);
  const [startPos, setStartPos] = useState(new THREE.Vector3());
  const [endPos, setEndPos] = useState(new THREE.Vector3());
  const [progress, setProgress] = useState(0);

  // Constants for randomness - widened significantly to ensure off-screen spawn/despawn
  const VIEW_WIDTH = 160;
  const VIEW_HEIGHT = 100;
  const RELATIVE_DEPTH = -60; // Distance in front of camera

  const spawn = () => {
    // Randomize trajectory to travel the WHOLE path
    // Start from one of the edges (Top, Left, Right)
    const side = Math.floor(Math.random() * 3);
    let x1 = 0,
      y1 = 0;
    let x2 = 0,
      y2 = 0;

    if (side === 0) {
      // Top
      x1 = (Math.random() - 0.5) * VIEW_WIDTH;
      y1 = VIEW_HEIGHT / 2;
      // Target: Bottom edge
      x2 = x1 + (Math.random() - 0.5) * VIEW_WIDTH;
      y2 = -VIEW_HEIGHT / 2;
    } else if (side === 1) {
      // Left
      x1 = -VIEW_WIDTH / 2;
      y1 = (Math.random() - 0.5) * VIEW_HEIGHT;
      // Target: Right side, lower down
      x2 = VIEW_WIDTH / 2;
      y2 = y1 - Math.random() * VIEW_HEIGHT * 0.5;
    } else {
      // Right
      x1 = VIEW_WIDTH / 2;
      y1 = (Math.random() - 0.5) * VIEW_HEIGHT;
      // Target: Left side, lower down
      x2 = -VIEW_WIDTH / 2;
      y2 = y1 - Math.random() * VIEW_HEIGHT * 0.5;
    }

    const spawnZ = cameraZ + RELATIVE_DEPTH;

    setStartPos(new THREE.Vector3(x1, y1, spawnZ));
    setEndPos(new THREE.Vector3(x2, y2, spawnZ));
    setProgress(0);
    setActive(true);
  };

  useEffect(() => {
    if (active) return;

    const delay =
      delayRange[0] + Math.random() * (delayRange[1] - delayRange[0]);
    const timeout = setTimeout(spawn, delay);
    return () => clearTimeout(timeout);
  }, [active, delayRange]);

  useFrame((state, delta) => {
    if (!active) return;

    const newProgress = progress + delta * speed;
    if (newProgress >= 1) {
      setActive(false);
      setProgress(0);
    } else {
      setProgress(newProgress);
      if (groupRef.current) {
        // Dynamic Depth Sync: Update Z to follow camera continuously
        const currentZ = cameraZ + RELATIVE_DEPTH;
        startPos.z = currentZ;
        endPos.z = currentZ;

        groupRef.current.position.lerpVectors(startPos, endPos, newProgress);

        // Re-calculate lookAt targets to ensure orientation remains correct as Z shifts
        const targetLook = endPos.clone();
        groupRef.current.lookAt(targetLook);
      }
    }
  });

  // Visuals: Head + Fading Trail
  const trailGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.02, 0, 5, 8),
    [],
  );

  if (!active) return null;

  return (
    <group ref={groupRef}>
      {/* Glow Head */}
      <mesh>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Outer Glow */}
      <mesh scale={2}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshBasicMaterial color="#64ffda" transparent opacity={0.3} />
      </mesh>

      {/* Majestic Trail */}
      <mesh position={[0, 0, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.001, 5, 8]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Colored Trail Overlay */}
      <mesh position={[0, 0, -3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.001, 6, 8]} />
        <meshBasicMaterial
          color="#64ffda"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Point Light for interaction with near objects if any */}
      <pointLight intensity={2} distance={10} color="#64ffda" />
    </group>
  );
}
