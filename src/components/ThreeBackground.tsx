"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { CameraRig } from "@/lib/CameraRig";
import SpaceEnvironment from "./SpaceEnvironment";

const BG_COLOR = new THREE.Color("#050B1E");

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        style={{ background: "#050B1E" }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(BG_COLOR, 1);
          scene.background = BG_COLOR;
        }}
      >
        <ambientLight intensity={1.6} />

        <CameraRig />

        <Suspense fallback={null}>
          <SpaceEnvironment />
        </Suspense>
      </Canvas>
    </div>
  );
}
