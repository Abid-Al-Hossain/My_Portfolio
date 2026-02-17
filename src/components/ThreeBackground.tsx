"use client";

import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Sparkles, Cloud } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={1} // XYZ rotation intensity
      floatIntensity={2} // Up/down float intensity
      floatingRange={[-1, 1]} // Range of y-axis values
    >
      <mesh position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          wireframeLinewidth={2}
          transparent
          opacity={0.3}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  return (
    <group>
      {/* Distant Stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={5}
        saturation={0}
        fade
        speed={0.5}
      />
      {/* Near Sparkles - Teal */}
      <Sparkles
        count={150}
        scale={10}
        size={3}
        speed={0.4}
        opacity={0.8}
        color="#64ffda"
      />
      {/* Far Sparkles - Purple */}
      <Sparkles
        count={150}
        scale={20}
        size={5}
        speed={0.3}
        opacity={0.6}
        color="#bd00ff"
      />
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-navy-900 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#061025"]} />{" "}
        {/* Slightly brighter deep navy */}
        <fog attach="fog" args={["#061025", 5, 20]} />
        <ambientLight intensity={1.6} />
        <Suspense fallback={null}>
          <ParticleField />

          {/* Gentle floating backdrop shapes */}
          <FloatingShape position={[-4, 2, -5]} color="#64ffda" />
          <FloatingShape position={[4, -2, -6]} color="#bd00ff" />
          <FloatingShape position={[0, 4, -8]} color="#ffffff" />
        </Suspense>
      </Canvas>
    </div>
  );
}
