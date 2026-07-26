"use client";

import React, { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Image, OrbitControls, Text } from "@react-three/drei";
import {
  Search,
  SlidersHorizontal,
  ShoppingCart,
  ArrowLeft,
  Sparkles,
  Tag,
  RotateCcw,
  Check,
} from "lucide-react";
import { seedProducts, Product } from "@/constants/categories";
import { useCart } from "@/app/context/cartcontext";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// 3D Card Object rendered inside Three.js Canvas
function Interactive3DShowcaseCard({ product }: { product: Product }) {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group ref={meshRef}>
        <Image
          url={product.image}
          scale={[2.2, 2.8]}
          radius={0.12}
          transparent
        />
        <Text
          position={[0, -1.7, 0.1]}
          fontSize={0.22}
          color="#c5974a"
          anchorX="center"
          anchorY="middle"
        >
          {`$${product.price} • ${product.title.slice(0, 18)}`}
        </Text>
      </group>
    </Float>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const { addToCart } = useCart();

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [addedId, setAddedId] = useState<string | number | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(seedProducts.map((p) => p.category || "General")),
    );
    return ["ALL", ...cats];
  }, []);

  // Filter products dynamically
  const filteredProducts = useMemo(() => {
    return seedProducts.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, maxPrice]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const featured3DProduct = filteredProducts[0] || seedProducts[0];

  return (
    <div className="min-h-screen bg-[#141716] text-[#ebdcb9] font-sans flex flex-col">
      {/* Main Content Area */}
      <main className="max-w-[1400px] w-full mx-auto px-6 py-8 flex-grow">
        {/* SEARCH & FILTERS CONTROLS BAR */}
        <div className="bg-[#181c1a] border border-white/10 rounded-2xl p-5 mb-8 space-y-5 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                size={16}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog items by name..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#ebdcb9] placeholder-white/30 outline-none focus:border-[#c5974a] transition-colors"
              />
            </div>

            {/* Price Range Slider */}
            <div className="md:col-span-5 bg-black/30 border border-white/5 rounded-xl p-2.5 px-4 flex items-center gap-4">
              <div className="flex justify-between text-xs font-mono text-white/50 shrink-0">
                <span>Max Price:</span>
                <span className="text-[#c5974a] font-bold ml-1">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#c5974a] cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <div className="md:col-span-2">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("ALL");
                  setMaxPrice(500);
                }}
                className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/60 hover:text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={13} /> Reset Filters
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 pb-1">
            <SlidersHorizontal
              size={14}
              className="text-[#c5974a] shrink-0 mr-1"
            />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider cursor-pointer transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#c5974a] text-[#191d1b] font-bold shadow-lg"
                    : "bg-black/40 text-white/50 border border-white/5 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID LIST */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#181c1a] border border-white/5 rounded-2xl p-12 text-center text-white/40 space-y-3">
            <p className="font-serif text-lg text-[#f7f3e8]/70">
              No matching items found
            </p>
            <p className="text-xs">
              Try relaxing your price slider or search query parameters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-[#181c1a] border border-white/10 hover:border-[#c5974a]/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-3">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5974a] block mb-1">
                    {product.category || "APPAREL"}
                  </span>

                  <h3 className="font-serif font-bold text-sm text-[#f7f3e8] truncate mb-2">
                    {product.title}
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                  <span className="font-serif font-black text-xl text-[#f7f3e8]">
                    ${product.price}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      addedId === product.id
                        ? "bg-emerald-600 text-white"
                        : "bg-[#c5974a] hover:bg-[#b08339] text-[#191d1b]"
                    }`}
                  >
                    {addedId === product.id ? (
                      <>
                        <Check size={13} /> Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={13} /> Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
