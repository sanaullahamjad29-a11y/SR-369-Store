"use client";

import React, { useState, useRef, useEffect } from "react";
import { Plus, Check, ShoppingCart, Search, Sun } from "lucide-react";
import { seedProducts, Product } from "@/constants/categories";
import ProductCard from "@/components/ProductCard";
import AddProductModal from "@/components/AddProductModel";
import ProductDetail from "@/components/ProductDetail";
import EmptyState from "@/components/EmptyState";
import CartDrawer from "@/components/CartDrawer";
import RevolvingHero3D from "@/components/Revolving3DHero";
import { useCart } from "@/app/context/cartcontext";

export default function App() {
  const { totalCount } = useCart();
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Products section reference for smooth scrolling
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    productsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAdd = (product: Product) => {
    setProducts((p) => [product, ...p]);
    setToast(`“${product.title}” was filed to the ledger.`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  return (
    <div className="min-h-screen font-sans bg-[#141716] text-[#ebdcb9] flex flex-col overflow-x-hidden">
      {/* --- 1. FULLY RESPONSIVE STICKY NAVIGATION BAR --- */}
      <nav className="sticky top-0 w-full bg-[#151817]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 border-b border-white/10 z-50 shadow-lg">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 sm:gap-8">
          {/* Logo */}
          <div className="font-serif font-black text-lg sm:text-xl tracking-tight text-[#f7f3e8] shrink-0">
            SR369 Store<span className="text-[#c5974a]">.</span>
          </div>

          {/* Nav Links (Desktop & Tablet) */}
          <div className="hidden md:flex items-center justify-center gap-8 text-sm font-medium">
            <a
              href="#products"
              onClick={scrollToProducts}
              className="text-[#c5974a] hover:text-[#d4aa5c] transition-colors cursor-pointer font-bold tracking-wide"
            >
              Products
            </a>
            <a
              href="/contact"
              className="text-white/70 hover:text-[#c5974a] transition-colors tracking-wide"
            >
              Contact
            </a>
            <a
              href="/pricing"
              className="text-white/70 hover:text-[#c5974a] transition-colors tracking-wide"
            >
              Pricing
            </a>
          </div>

          {/* Actions & Cart Icon (Mobile Optimized) */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 shrink-0">
            {/* Search Input (Hidden on extra small mobile screens for clean layout) */}
            <div className="relative hidden md:block">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                size={15}
              />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 outline-none w-44 lg:w-56 focus:border-[#c5974a]/50 transition-colors"
              />
            </div>

            {/* Quick Links for Mobile View */}
            <a
              href="#products"
              onClick={scrollToProducts}
              className="md:hidden text-xs text-[#c5974a] font-mono px-2 py-1 rounded bg-[#c5974a]/10 border border-[#c5974a]/20"
            >
              Catalog
            </a>

            <button className="text-white/60 hover:text-white p-1.5 sm:p-2 hover:bg-white/5 rounded-lg transition-colors cursor-pointer">
              <Sun size={17} />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white/70 hover:text-white relative p-1.5 sm:p-2 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={18} />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono text-[9px] font-bold h-4 w-4 min-w-[16px] px-1 flex items-center justify-center rounded-full animate-bounce shadow-md">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* --- 2. 3D REVOLVING HERO SECTION --- */}
      <RevolvingHero3D onShopClick={() => setFormOpen(true)} />

      {/* --- 3. MAIN CATALOG AREA --- */}
      <main
        id="products"
        ref={productsSectionRef}
        className="flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 scroll-mt-20"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-8 text-center sm:text-left">
          <div>
            <h3 className="font-serif italic text-3xl sm:text-4xl text-[#c5974a] font-medium leading-tight">
              Checkout my products
            </h3>
            <p className="text-xs sm:text-sm text-white/50 tracking-wide mt-1">
              Explore our verified digital ledger items.
            </p>
          </div>

          <button
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-b from-[#C79A4E] to-[#77561f] text-[#201803] font-semibold text-xs sm:text-sm rounded-xl shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            onClick={() => setFormOpen(true)}
          >
            <Plus size={16} strokeWidth={2.5} /> Add Product
          </button>
        </div>

        {/* Watermark Section */}
        <div className="text-center my-6 sm:my-10 select-none">
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-serif font-black uppercase tracking-[0.25em] sm:tracking-[0.35em] text-white/5">
            PRODUCTS
          </h2>
        </div>

        {/* Infinite Carousel Track */}
        {products.length === 0 ? (
          <EmptyState onAdd={() => setFormOpen(true)} />
        ) : (
          <div
            className="w-full overflow-hidden py-4 sm:py-6 relative mask-inline-edges [perspective:1200px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="flex gap-4 sm:gap-8 w-max px-2 animate-[marquee_35s_linear_infinite]"
              style={{ animationPlayState: isHovered ? "paused" : "running" }}
            >
              {products.map((p, i) => (
                <div
                  key={`orig-${p.id}`}
                  className="w-[260px] sm:w-[300px] shrink-0 [transform-style:preserve-3d]"
                >
                  <ProductCard product={p} index={i} onOpen={setSelected} />
                </div>
              ))}
              {products.map((p, i) => (
                <div
                  key={`dup-${p.id}`}
                  className="w-[260px] sm:w-[300px] shrink-0 [transform-style:preserve-3d]"
                >
                  <ProductCard product={p} index={i} onOpen={setSelected} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* --- 4. RESPONSIVE CINEMATIC FOOTER --- */}
      <footer className="w-full bg-[#111413] border-t border-white/5 pt-12 pb-8 px-6 sm:px-10 mt-auto relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#c5974a]/30 to-transparent pointer-events-none" />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 border-b border-white/5">
          <div className="sm:col-span-2">
            <span className="font-serif font-black text-2xl tracking-tight text-[#f7f3e8] block">
              SR369 Store<span className="text-[#c5974a]">.</span>
            </span>
            <p className="text-xs sm:text-sm text-white/50 mt-3 leading-relaxed max-w-[32ch]">
              Stamping premium craft goods and meticulously curated modern
              relics straight into the digital ledger.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold tracking-wider text-[#c5974a] uppercase mb-3">
              Catalog Indices
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/40">
              <li>
                <a
                  href="#products"
                  onClick={scrollToProducts}
                  className="hover:text-[#ebdcb9] transition-colors"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="hover:text-[#ebdcb9] transition-colors"
                >
                  Pricing Metrics
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold tracking-wider text-[#c5974a] uppercase mb-3">
              The House
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/40">
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#ebdcb9] transition-colors"
                >
                  Support Channels
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#ebdcb9] transition-colors">
                  Security Desk
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold tracking-wider text-[#c5974a] uppercase mb-3">
              Stay Posted
            </h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center"
            >
              <input
                type="email"
                placeholder="your.email@domain.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ebdcb9] placeholder-white/20 outline-none focus:border-[#c5974a]/50 transition-all pr-12"
              />
              <button
                type="submit"
                className="absolute right-1 text-[11px] font-bold font-serif bg-[#c5974a] text-[#191d1b] px-2.5 py-1 rounded-md hover:bg-[#b08339] transition-all cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] sm:text-[11px] text-white/30 font-mono text-center sm:text-left">
          <div>&copy; 2026 SR369 Co. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#ebdcb9] transition-colors">
              Privacy Charter
            </a>
            <a href="#" className="hover:text-[#ebdcb9] transition-colors">
              Terms of Filing
            </a>
          </div>
        </div>
      </footer>

      {/* --- 5. MODALS & DRAWER --- */}
      <AddProductModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onAdd={handleAdd}
      />

      <ProductDetail
        product={selected}
        onClose={() => {
          setSelected(null);
          window.history.pushState({ path: "/" }, "", "/");
        }}
      />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-emerald-800 text-[#eef4f1] px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-2xl z-[1200] max-w-[90vw] truncate">
          <Check size={15} strokeWidth={2.5} className="shrink-0" />
          <span className="truncate">{toast}</span>
        </div>
      )}
    </div>
  );
}
