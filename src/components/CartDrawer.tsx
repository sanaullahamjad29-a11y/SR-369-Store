"use client";

import React from "react";
import {
  X,
  Trash2,
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/app/context/cartcontext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalCount,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* 1. Backdrop Overlay with Heavy Blur */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* 2. Glassmorphic Slide-Over Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#161a18]/95 text-[#ebdcb9] h-full shadow-[0_0_60px_rgba(197,151,74,0.15)] flex flex-col border-l border-[#c5974a]/30 p-6 backdrop-blur-2xl transform transition-transform animate-in slide-in-from-right duration-300">
        {/* Top Ambient Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5974a] to-transparent shadow-[0_0_12px_#c5974a]" />

        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5 font-serif text-xl font-bold text-[#f7f3e8]">
            <div className="p-2 bg-[#c5974a]/10 border border-[#c5974a]/30 rounded-xl text-[#c5974a]">
              <ShoppingBag size={18} />
            </div>
            <span>Order Ledger</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#c5974a]">
              {totalCount} items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all cursor-pointer border border-white/10"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 pr-1">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-white/40 space-y-3">
              <div className="p-5 bg-white/5 rounded-full border border-white/5">
                <ShoppingBag
                  size={42}
                  className="stroke-[1.2] text-[#c5974a]/60"
                />
              </div>
              <p className="font-serif text-lg text-[#f7f3e8]/70">
                Your ledger is empty
              </p>
              <p className="text-xs max-w-[220px] leading-relaxed">
                Explore our catalog items and add them to your order ledger.
              </p>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="group relative flex items-center gap-4 bg-gradient-to-r from-white/5 to-transparent p-3.5 rounded-2xl border border-white/10 hover:border-[#c5974a]/40 transition-all shadow-md"
              >
                {/* Product Image */}
                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-black/40 border border-white/10">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info & Quantity Controls */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-sm text-[#f7f3e8] truncate">
                      {product.title}
                    </h4>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-white/30 hover:text-red-400 p-1 rounded-md transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <p className="text-[11px] text-white/50 font-mono">
                    Unit Price: ${product.price}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    {/* Interactive + / - Quantity Controls */}
                    <div className="flex items-center gap-2 bg-black/30 border border-white/10 px-2 py-1 rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, -1)}
                        className="text-white/60 hover:text-white transition-colors cursor-pointer p-0.5"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center text-[#c5974a]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, 1)}
                        className="text-white/60 hover:text-white transition-colors cursor-pointer p-0.5"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Subtotal Calculation */}
                    <span className="font-serif font-bold text-sm text-[#f7f3e8]">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Summary */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4 mt-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                <span>Subtotal ({totalCount} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-white/50 font-mono">
                <span>Shipping & Dispatch</span>
                <span className="text-emerald-400">Complimentary</span>
              </div>
              <div className="flex items-center justify-between font-serif text-lg text-[#f7f3e8] pt-2 border-t border-white/5">
                <span>Total Valuation</span>
                <span className="font-mono text-2xl font-black text-[#c5974a]">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={clearCart}
                className="w-1/3 py-3.5 bg-red-950/20 hover:bg-red-900/40 text-red-300 font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all border border-red-800/30 cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => alert("Proceeding to Order Checkout!")}
                className="w-2/3 py-3.5 bg-gradient-to-r from-[#c5974a] via-[#d4aa5c] to-[#b08339] text-[#191d1b] font-bold text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(197,151,74,0.3)] hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-white/40 pt-1">
              <ShieldCheck size={13} className="text-[#c5974a]" />
              <span>Encrypted Ledger Checkout • Fast Dispatch</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
