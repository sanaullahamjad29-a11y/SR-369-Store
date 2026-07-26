"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

// Sample 3D floating showcase images
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600",
];

function RevolvingCards() {
  const groupRef = useRef<THREE.Group>(null!);
  const count = HERO_IMAGES.length;
  const radius = 3.2;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25; // Speed of 3D revolving
    }
  });

  return (
    <group ref={groupRef}>
      {HERO_IMAGES.map((url, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group position={[x, 0, z]} rotation={[0, angle, 0]}>
              <Image url={url} scale={[1.8, 2.4]} transparent radius={0.15} />
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export default function RevolvingHero3D({
  onShopClick,
}: {
  onShopClick: () => void;
}) {
  return (
    <div className="relative w-full bg-[#191d1b] border-b border-white/10 overflow-hidden min-h-[580px] flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c5974a]/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1400px] w-full mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
        {/* Left Heading Text */}
        <div className="text-center lg:text-left space-y-6">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-[#c5974a] block">
            SR369 STORE
          </span>

          <h1 className="font-serif italic font-black text-5xl sm:text-6xl xl:text-7xl tracking-tight text-[#f7f3e8] leading-[1.1]">
            Make Your Life Comfortable with{" "}
            <span className="text-[#c5974a] not-italic font-bold">
              Our Valuable Products
            </span>
          </h1>

          <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start">
            <button
              onClick={onShopClick}
              className="px-8 py-3.5 bg-[#c5974a] hover:bg-[#b08339] text-[#191d1b] font-bold text-sm rounded-full shadow-xl transition-all cursor-pointer hover:-translate-y-0.5"
            >
              Shop Now
            </button>
          </div>
        </div>

        {/* Right 3D Revolving Canvas */}
        <div className="h-[420px] sm:h-[480px] w-full relative">
          <Canvas camera={{ position: [0, 1, 6.5], fov: 45 }}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <RevolvingCards />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Canvas>
          <div className="absolute bottom-2 right-4 font-mono text-[10px] text-white/30 uppercase tracking-widest">
            * Drag to rotate in 3D
          </div>
        </div>
      </div>
    </div>
  );
}
