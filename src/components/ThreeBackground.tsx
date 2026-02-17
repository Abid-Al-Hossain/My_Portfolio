"use strict";
"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Float, Stars } from "@react-three/drei";
import { useMotionValue, useSpring } from "framer-motion";

function Particles() {
  return (
    <group>
      <Sparkles
        count={200}
        scale={12}
        size={3}
        speed={0.4}
        opacity={0.5}
        color="#64ffda"
      />
      <Sparkles
        count={150}
        scale={15}
        size={2}
        speed={0.3}
        opacity={0.3}
        color="#ccd6f6"
      />
    </group>
  );
}

function FloatingShapes() {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[2, 0, -5]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#112240"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh position={[-3, 2, -10]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#233554"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-navy-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={["#020c1b", 5, 20]} />
        <ambientLight intensity={0.5} />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <Particles />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
