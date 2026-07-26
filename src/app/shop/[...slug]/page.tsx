"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Layers, Hash } from "lucide-react";

export default function TestDynamicSegmentPage() {
  const params = useParams();
  const router = useRouter();

  // params.slug will capture all URL segments as an array
  const slugSegments = (params?.slug as string[]) || [];

  return (
    <div className="min-h-screen bg-[#141716] text-[#ebdcb9] p-8 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full bg-[#191d1b] border border-white/10 rounded-2xl p-8 shadow-2xl">
        {/* Back Button */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-[#c5974a] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Layers className="text-[#c5974a]" size={24} />
          <h1 className="text-2xl font-serif font-bold text-[#f7f3e8]">
            Dynamic Catch-All Segment Test
          </h1>
        </div>

        <p className="text-sm text-white/60 mb-6">
          This page of Next.js ke is designed to test the dynamic catch-all
          segment functionality.
        </p>

        {/* Live Segment Display Matrix */}
        <div className="bg-black/30 border border-white/5 rounded-xl p-4 mb-6">
          <span className="text-xs font-mono uppercase text-white/40 block mb-2">
            Captured URL Segments Array:
          </span>

          {slugSegments.length === 0 ? (
            <p className="font-mono text-sm text-amber-500/80 italic">
              No segments provided. You are on the root /shop route.
            </p>
          ) : (
            <div className="space-y-2">
              {slugSegments.map((segment, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg font-mono text-xs"
                >
                  <span className="text-white/40 flex items-center gap-1">
                    <Hash size={12} /> Segment {index + 1}:
                  </span>
                  <span className="text-[#c5974a] font-bold">{segment}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Test Link Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-white/40 block">
            Test URL Examples:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => router.push("/shop/vintage")}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs rounded-lg transition-colors cursor-pointer"
            >
              /shop/vintage
            </button>
            <button
              onClick={() => router.push("/shop/watches/luxury/rolex")}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs rounded-lg transition-colors cursor-pointer"
            >
              /shop/watches/luxury/rolex
            </button>
            <button
              onClick={() => router.push("/shop/crafts/leather/bags/wallets")}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs rounded-lg transition-colors cursor-pointer"
            >
              /shop/crafts/leather/bags/wallets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
