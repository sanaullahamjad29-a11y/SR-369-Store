"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { seedProducts } from "@/constants/categories";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  // FIX: Convert both IDs to String to resolve TypeScript comparison errors
  const product = seedProducts.find((p) => String(p.id) === String(params?.id));

  // Fallback if the product ID doesn't exist
  if (!product) {
    return (
      <div className="min-h-screen bg-[#141716] text-[#ebdcb9] flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-serif font-bold mb-2">
          Product Not Found
        </h2>
        <p className="text-white/50 text-sm mb-6">
          The item ID in the address bar does not exist.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2.5 bg-[#c5974a] text-[#191d1b] font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141716] text-[#ebdcb9] py-12 px-6">
      <div className="max-w-250 mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-[#c5974a] transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        {/* Detailed View Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#191d1b] border border-white/10 p-8 rounded-2xl shadow-2xl">
          {/* Image Container */}
          <div className="relative aspect-square rounded-xl overflow-hidden bg-black/20 border border-white/5">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono tracking-widest text-[#c5974a] uppercase">
                {product.category || "Item Ledger"}
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#f7f3e8] mt-2 mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-500">
                  <Star size={16} fill="currentColor" />
                </div>
                <span className="text-xs text-white/60 font-mono">
                  4.9 (24 Reviews)
                </span>
              </div>

              <p className="text-sm text-white/60 leading-relaxed mb-6">
                {product.description ||
                  "Crafted to high quality specs and registered inside the catalog system."}
              </p>

              <div className="text-3xl font-serif font-bold text-[#f7f3e8] mb-8">
                ${product.price}
              </div>
            </div>

            <button
              onClick={() => alert(`Added ${product.title} to your bag!`)}
              className="w-full py-4 bg-[#c5974a] hover:bg-[#b08339] text-[#191d1b] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart size={16} /> Add To Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
