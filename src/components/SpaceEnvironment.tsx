"use client";

import { Stars, Sparkles } from "@react-three/drei";

export default function SpaceEnvironment() {
  return (
    <group>
      {/* Original star field — extended along Z corridor for fly-through */}
      <Stars
        radius={100}
        depth={250}
        count={5000}
        factor={5}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Near Sparkles - Teal (distributed along Z) */}
      <group position={[0, 0, 0]}>
        <Sparkles
          count={150}
          scale={10}
          size={3}
          speed={0.4}
          opacity={0.8}
          color="#64ffda"
        />
      </group>

      <group position={[0, 0, -100]}>
        <Sparkles
          count={150}
          scale={10}
          size={3}
          speed={0.4}
          opacity={0.8}
          color="#64ffda"
        />
      </group>

      <group position={[0, 0, -200]}>
        <Sparkles
          count={150}
          scale={10}
          size={3}
          speed={0.4}
          opacity={0.8}
          color="#64ffda"
        />
      </group>

      {/* Far Sparkles - Purple (distributed along Z) */}
      <group position={[0, 0, 0]}>
        <Sparkles
          count={150}
          scale={20}
          size={5}
          speed={0.3}
          opacity={0.6}
          color="#bd00ff"
        />
      </group>

      <group position={[0, 0, -100]}>
        <Sparkles
          count={150}
          scale={20}
          size={5}
          speed={0.3}
          opacity={0.6}
          color="#bd00ff"
        />
      </group>

      <group position={[0, 0, -200]}>
        <Sparkles
          count={150}
          scale={20}
          size={5}
          speed={0.3}
          opacity={0.6}
          color="#bd00ff"
        />
      </group>
    </group>
  );
}
