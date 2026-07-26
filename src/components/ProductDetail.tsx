"use client";

import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingCart,
  Check,
  Plus,
  Minus,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Product } from "@/constants/categories";
import { useCart } from "@/app/context/cartcontext";

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetail({
  product,
  onClose,
}: ProductDetailProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const handleAddToOrder = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      {/* Glassmorphic Dark Blur Overlay */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xl transition-all duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Modern Aesthetic 3D Glow Card */}
      <div className="relative z-10 w-full max-w-4xl bg-[#171a19]/95 border border-[#c5974a]/40 rounded-3xl p-6 sm:p-8 text-[#ebdcb9] overflow-hidden backdrop-blur-2xl shadow-[0_0_80px_rgba(197,151,74,0.22)] transform transition-all animate-in zoom-in-95 duration-200">
        {/* Glowing Top Gold Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5974a] to-transparent shadow-[0_0_15px_#c5974a]" />

        {/* Back and Close Actions Bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-[#c5974a] transition-colors cursor-pointer group"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to Catalog</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-[#c5974a]/20 border border-white/10 hover:border-[#c5974a]/50 rounded-full transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* LEFT: 3D Pop-Out Hover Image Container */}
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-[#c5974a]/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
              />

              <div className="absolute top-3 left-3 bg-[#141716]/90 backdrop-blur-md border border-[#c5974a]/40 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#c5974a] uppercase flex items-center gap-1.5 shadow-xl">
                <Sparkles size={12} className="animate-pulse" />
                <span>Certified Product</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Meta & Controls */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#c5974a] block font-semibold">
                {product.category || "APPAREL"}
              </span>

              <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#f7f3e8] tracking-tight leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                <Star size={15} fill="#c5974a" className="text-[#c5974a]" />
                <span className="text-[#f7f3e8] font-bold">4.9</span>
                <span className="text-white/40">(24 Reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans pt-2">
                {product.description ||
                  "A field-weight waxed canvas tote with saddle-leather straps, reinforced corners, and brass snaps."}
              </p>
            </div>

            {/* Price Valuation & Quantity Controls */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-white/40 tracking-wider block">
                    Valuation
                  </span>
                  <div className="text-3xl sm:text-4xl font-serif font-black text-[#f7f3e8]">
                    ${product.price * quantity}
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="font-mono text-xs font-bold text-[#c5974a] w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-white/60 hover:text-white transition-colors cursor-pointer p-1"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToOrder}
                className={`w-full py-4 font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(197,151,74,0.3)] ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-gradient-to-r from-[#c5974a] via-[#d4aa5c] to-[#b08339] text-[#191d1b] hover:brightness-110 active:scale-[0.98]"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check size={16} /> Filed to Order!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} /> Add{" "}
                    {quantity > 1 ? `(${quantity})` : ""} To Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
