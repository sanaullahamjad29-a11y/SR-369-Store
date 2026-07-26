"use client";

import React from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/constants/categories";
import { useCart } from "@/app/context/cartcontext";

interface ProductCardProps {
  product: Product;
  index?: number;
  onOpen: (product: Product) => void;
}

export default function ProductCard({ product, onOpen }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleCardClick = () => {
    // 1. Generate Clean Dynamic URL Slug
    const categorySlug = (product.category || "general")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
    const titleSlug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const dynamicUrl = `/shop/${categorySlug}/${titleSlug}`;

    // 2. Update Browser URL search bar without page refresh
    window.history.pushState({ path: dynamicUrl }, "", dynamicUrl);

    // 3. Open Modal
    onOpen(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-[#181c1a] border border-white/10 hover:border-[#c5974a]/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(197,151,74,0.15)] flex flex-col justify-between h-full select-none"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="bg-[#141716]/90 border border-[#c5974a]/50 text-[#c5974a] text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl">
            <Eye size={14} /> View Item
          </span>
        </div>
      </div>

      <div className="space-y-2 flex-grow">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5974a] block">
          {product.category || "GENERAL GOODS"}
        </span>

        <h3 className="font-serif font-bold text-sm text-[#f7f3e8] truncate group-hover:text-[#c5974a] transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-amber-400">
          <Star size={12} fill="currentColor" />
          <span className="font-mono text-[11px] text-white/60">4.9</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5">
        <span className="font-serif font-bold text-base text-[#f7f3e8]">
          ${product.price}
        </span>

        <button
          onClick={handleAddToCart}
          className="p-2 bg-white/5 hover:bg-[#c5974a] text-white/70 hover:text-[#191d1b] rounded-lg transition-all cursor-pointer border border-white/10 hover:border-[#c5974a]"
          title="Add to Cart"
        >
          <ShoppingCart size={15} />
        </button>
      </div>
    </div>
  );
}
