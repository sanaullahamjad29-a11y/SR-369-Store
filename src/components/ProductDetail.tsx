"use client";

import React, { useState } from "react";
import { X, Package, Hash } from "lucide-react";
import { Product } from "@/constants/categories";
import { money, initials } from "@/utils/format";

export default function ProductDetailModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [imgOk, setImgOk] = useState(true);
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-[1000]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#f7f3e8] text-[#191d1b] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 relative">
        <button className="absolute top-4 right-4 z-20 bg-white/85 p-2 rounded-full shadow hover:scale-105 transition-transform" onClick={onClose} aria-label="Close details"><X size={18} /></button>
        <div className="relative bg-gradient-to-br from-[#d8cfb6] to-[#cabf9d] min-h-[240px] md:min-h-[340px]">
          {product.image && imgOk ? (
            <img src={product.image} alt={product.title} onError={() => setImgOk(false)} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-serif italic text-5xl text-[#191d1b]/30">{initials(product.title)}</div>
          )}
          <span className="absolute bottom-4 right-4 font-mono text-xs uppercase tracking-wider px-3 py-1.5 border border-dashed border-red-700 text-red-700 rounded-full bg-[#f7f3e8]/90 rotate-[-6deg]">
            {product.stock > 0 ? "In Stock" : "Sold Out"}
          </span>
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-[#c5974a]">{product.category}</span>
            <h2 className="font-serif italic font-medium text-2xl md:text-3xl leading-snug mt-2 mb-4">{product.title}</h2>
            <p className="text-[#5c6459] text-sm leading-relaxed mb-6 font-sans">{product.description}</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-5 border-y border-dashed border-[#191d1b]/15 py-4 mb-6">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[#191d1b]/45 uppercase tracking-wider">Price</span>
                <span className="text-lg font-semibold font-mono text-red-700">{money(product.price)}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[#191d1b]/45 uppercase tracking-wider">On shelf</span>
                <span className="text-base font-semibold">{product.stock} units</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] text-[#191d1b]/45 uppercase tracking-wider">Ledger No.</span>
                <span className="text-base font-semibold flex items-center gap-0.5"><Hash size={13} className="text-[#191d1b]/40" />{product.id.replace(/\D/g, "").slice(-4).padStart(4, "0")}</span>
              </div>
            </div>
            <button className="w-full py-3.5 bg-gradient-to-b from-[#C79A4E] to-[#77561f] disabled:from-[#8a8577] disabled:to-[#5f5c52] text-[#201803] disabled:text-[#ddd8ca] font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all shadow-md" disabled={product.stock === 0}>
              <Package size={16} strokeWidth={2.5} /> {product.stock > 0 ? "Add to order" : "Currently unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}