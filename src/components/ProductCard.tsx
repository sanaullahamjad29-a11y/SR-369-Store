"use client";

import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/constants/categories";
import { money, initials } from "@/utils/format";

interface CardProps { 
  product: Product; 
  index: number; 
  onOpen: (p: Product) => void; 
}

export default function ProductCard({ product, index, onOpen }: CardProps) {
  const [imgOk, setImgOk] = useState(true);
  const cardRef = useRef<HTMLButtonElement>(null);

  // Parse multi-image array setup for interactive carousel slider properties
  const images = Array.isArray(product.image) 
    ? product.image 
    : [product.image].filter(Boolean);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Live calculation mechanics for responsive mouse cursor parallax matrix positioning
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    
    setRotateX(-yPct * 20); // Tilt intensity mapping logic factors
    setRotateY(xPct * 20);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Shield action triggers to stop details modal popups
    if (images.length > 1) {
      setCurrentImgIndex((prev) => (prev + 1) % images.length);
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Shield action triggers to stop details modal popups
    if (images.length > 1) {
      setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <button
      ref={cardRef}
      className="relative text-left bg-[#ebdcb9] border border-white/10 rounded-xl pb-4 overflow-hidden text-[#191d1b] shadow-2xl w-full group cursor-pointer transition-all duration-200 ease-out [transform-style:preserve-3d]"
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
        boxShadow: rotateX !== 0 ? '0 30px 60px rgba(0,0,0,0.45)' : '0 10px 25px rgba(0,0,0,0.35)'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); }}
      onClick={() => onOpen(product)}
      aria-label={`Open details for ${product.title}`}
    >
      {/* Handcrafted Ledger Ribbon Asset */}
      <div className="absolute top-2.5 left-3.5 opacity-80 z-20 [transform:translateZ(30px)]" aria-hidden="true">
        <svg width="30" height="46" viewBox="0 0 30 46">
          <circle cx="15" cy="10" r="5" fill="none" stroke="#191d1b" strokeWidth="2" />
          <path d="M15 15 C 8 22, 22 26, 12 34 C 6 39, 18 40, 15 45" fill="none" stroke="#c5974a" strokeWidth="1.6" strokeDasharray="3 3" />
        </svg>
      </div>

      <span className="absolute top-3.5 right-4 font-mono text-[11px] tracking-wider text-[#191d1b]/45 z-20 [transform:translateZ(25px)]">
        No. {String(index + 1).padStart(3, "0")}
      </span>

      {/* --- IMAGE CAROUSEL CONTAINER --- */}
      <div className="relative h-48 mb-4 overflow-hidden bg-gradient-to-br from-[#d8cfb6] to-[#cabf9d] [transform:translateZ(15px)]">
        {images.length > 0 && imgOk ? (
          <div className="w-full h-full relative">
            <img 
              src={images[currentImgIndex]} 
              alt={`${product.title} view ${currentImgIndex + 1}`} 
              onError={() => setImgOk(false)} 
              loading="lazy" 
              className="w-full h-full object-cover transition-all duration-500" 
            />

            {/* Slider Switch Arrows (Activates on Hover) */}
            {images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <button 
                  onClick={handlePrevImage}
                  className="p-1 rounded-md bg-black/70 text-white hover:bg-black transition-colors cursor-pointer flex items-center justify-center"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="p-1 rounded-md bg-black/70 text-white hover:bg-black transition-colors cursor-pointer flex items-center justify-center"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center font-serif italic text-4xl text-[#191d1b]/30">
            {initials(product.title)}
          </div>
        )}
        
        <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wider px-2 py-1 border border-dashed border-red-700 text-red-700 rounded-full bg-[#f7f3e8]/90 rotate-[-6deg] shadow-md z-20">
          {product.stock > 0 ? "In Stock" : "Sold Out"}
        </span>
      </div>

      {/* --- CONTENT DETAILS PLANE LAYER --- */}
      <div className="px-4 [transform:translateZ(40px)]">
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-emerald-800 block">
          {product.category}
        </span>
        <h3 className="font-serif font-semibold text-lg md:text-xl leading-snug my-2 text-[#191d1b] line-clamp-1">
          {product.title}
        </h3>
        
        <div className="flex items-baseline justify-between border-t border-dashed border-[#191d1b]/15 pt-3 mt-1">
          <span className="font-mono font-medium text-base text-red-700">
            {money(product.price)}
          </span>
          <span className="text-xs text-[#5c6459]">
            {product.stock} left
          </span>
        </div>
      </div>
    </button>
  );
}