"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/constants/categories";

interface ProductCardProps {
  product: Product;
  index?: number;
  onOpen?: (product: Product) => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block group bg-[#ebdcb9] text-[#191d1b] rounded-2xl p-4 shadow-xl border border-white/10 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-black/5 mb-4 relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="space-y-1">
        <h4 className="font-serif font-bold text-lg leading-snug line-clamp-1">
          {product.title}
        </h4>
        <p className="font-mono text-xs text-black/60 font-bold">
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
