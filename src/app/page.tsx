"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, Check, ShoppingCart, Search, Sun } from "lucide-react"; 
import { seedProducts, Product } from "@/constants/categories";
import ProductCard from "@/components/ProductCard";
import AddProductModal from "@/components/AddProductModel"; 
import ProductDetailModal from "@/components/ProductDetail";   
import EmptyState from "@/components/EmptyState";

export default function App() {
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = (product: Product) => {
    setProducts((p) => [product, ...p]);
    setToast(`“${product.title}” was filed to the ledger.`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-[#141716] text-[#ebdcb9] flex flex-col ">
      
      {/* --- 1. MOVED OUTSIDE: NOW GLOBAL STICKY NAVIGATION BAR --- */}
      <nav className="sticky top-0 w-full bg-[#151817]/80 backdrop-blur-md px-6 py-4 border-b border-white/5 z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <div className="font-serif font-black text-xl tracking-tight text-[#f7f3e8]">
            SR369 Store
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-[#c5974a] transition-colors text-[#c5974a]">Products</a>
            <a href="#" className="hover:text-[#c5974a] transition-colors">Blog</a>
            <a href="/contact" className="hover:text-[#c5974a] transition-colors">Contact</a>
            <a href="#" className="hover:text-[#c5974a] transition-colors">Docs</a>
            <a href="#" className="hover:text-[#c5974a] transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white placeholder-white/30 outline-none w-48 focus:border-[#c5974a]/50"
              />
            </div>
            <button className="text-white/60 hover:text-white p-1.5"><Sun size={18} /></button>
            <button className="bg-white/5 hover:bg-white/10 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all border border-white/10">Login</button>
            <button className="text-white/60 hover:text-white relative p-1.5"><ShoppingCart size={18} /></button>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO AREA BACKGROUND WRAPPER (Now contains only the banner text) --- */}
      <div className="bg-[#191d1b] border-b border-white/10">
        {/* Hero Banner text block */}
        <div className="w-full py-20 px-6 text-center relative overflow-hidden">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#c5974a] block mb-3">SR369 STORE</span>
          <h1 className="font-serif italic font-black text-5xl md:text-7xl tracking-tight text-[#f7f3e8] block max-w-4xl mx-auto leading-[1.15]">
            Make Your Life Comfortable with <span className="text-[#c5974a]">Our Valuable Products </span> 
          </h1>
          <button 
            onClick={() => setFormOpen(true)}
            className="mt-8 px-8 py-3.5 bg-[#c5974a] hover:bg-[#b08339] text-[#191d1b] font-bold text-sm rounded-full shadow-lg transition-all cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* --- CONTENT AREA BELOW THE LINE --- */}
      <main className="flex-grow max-w-[1400px] w-full mx-auto px-6 py-12">
        
        {/* ROW 1: Checkout Text & Add Product Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center sm:text-left">
            <h3 className="font-serif italic text-4xl text-[#c5974a] font-medium leading-tight">
              Checkout my products
            </h3>
            <p className="text-sm text-white/50 tracking-wide mt-1">
              See if you like.
            </p>
          </div>

          <button 
            className="px-6 py-3 bg-gradient-to-b from-[#C79A4E] to-[#77561f] text-[#201803] font-semibold text-sm rounded-lg shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer shrink-0" 
            onClick={() => setFormOpen(true)}
          >
            <Plus size={17} strokeWidth={2.5} /> Add Product
          </button>
        </div>

        {/* ROW 2: PRODUCTS Title */}
        <div className="text-center my-10 select-none">
          <h2 className="text-5xl md:text-7xl font-serif font-black uppercase tracking-[0.35em] text-white/5">
            PRODUCTS
          </h2>
        </div>

        {/* ROW 3: Infinite forward-only product carousel track */}
        {products.length === 0 ? (
          <EmptyState onAdd={() => setFormOpen(true)} />
        ) : (
          <div 
            className="w-full overflow-hidden py-6 relative mask-inline-edges [perspective:1200px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className="flex gap-8 w-max px-4 animate-[marquee_35s_linear_infinite]"
              style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
            >
              {/* First Pass */}
              {products.map((p, i) => (
                <div key={`orig-${p.id}`} className="w-[300px] shrink-0 [transform-style:preserve-3d]">
                  <ProductCard product={p} index={i} onOpen={setSelected} />
                </div>
              ))}
              {/* Duplicate Pass for endless effect */}
              {products.map((p, i) => (
                <div key={`dup-${p.id}`} className="w-[300px] shrink-0 [transform-style:preserve-3d]">
                  <ProductCard product={p} index={i} onOpen={setSelected} />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      {/* --- BEAUTIFUL CINEMATIC LEDGER FOOTER --- */}
<footer className="w-full bg-[#111413] border-t border-white/5 pt-16 pb-8 px-8 mt-auto relative overflow-hidden">
  {/* Elegant top radial ambient glow to bounce light from your page design */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#c5974a]/20 to-transparent pointer-events-none" />

  <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
    
    {/* Column 1: Brand Pitch Section */}
    <div className="lg:col-span-2">
      <span className="font-serif font-black text-2xl tracking-tight text-[#f7f3e8] block">
        SR369 Store<span className="text-[#c5974a]">.</span>
      </span>
      <p className="text-sm text-white/50 mt-3 leading-relaxed max-w-[32ch]">
        Stamping premium craft goods and meticulously curated modern relics straight into the digital ledger. 
      </p>
      
      {/* Social Icons Wrapper */}
      <div className="flex items-center gap-4 text-white/40 mt-6">
        {/* Twitter / X */}
        <a href="#" className="hover:text-[#c5974a] hover:scale-110 transition-all duration-200" aria-label="Twitter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        </a>

        {/* GitHub */}
        <a href="#" className="hover:text-[#c5974a] hover:scale-110 transition-all duration-200" aria-label="GitHub">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="#" className="hover:text-[#c5974a] hover:scale-110 transition-all duration-200" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
      </div>
    </div>

    {/* Column 2: Navigation Links */}
    <div>
      <h4 className="font-mono text-xs font-semibold tracking-wider text-[#c5974a] uppercase mb-4">
        Catalog Indices
      </h4>
      <ul className="space-y-2.5 text-sm text-white/40">
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">All Products</a></li>
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">Latest Releases</a></li>
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">Archived Ledger</a></li>
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">Pricing Metrics</a></li>
      </ul>
    </div>

    {/* Column 3: Corporate Links */}
    <div>
      <h4 className="font-mono text-xs font-semibold tracking-wider text-[#c5974a] uppercase mb-4">
        The House
      </h4>
      <ul className="space-y-2.5 text-sm text-white/40">
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">Our Journal</a></li>
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">Manifesto Docs</a></li>
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">Support Channels</a></li>
        <li><a href="#" className="hover:text-[#ebdcb9] transition-colors">Security Desk</a></li>
      </ul>
    </div>

    {/* Column 4: Premium Interactive Newsletter Component */}
    <div>
      <h4 className="font-mono text-xs font-semibold tracking-wider text-[#c5974a] uppercase mb-4">
        Stay Posted
      </h4>
      <p className="text-xs text-white/50 mb-3 leading-relaxed">
        Subscribe to claim prompt logging stamps on new drops.
      </p>
      <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
        <input 
          type="email" 
          placeholder="your.email@domain.com" 
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ebdcb9] placeholder-white/20 outline-none focus:border-[#c5974a]/50 transition-all pr-12"
        />
        <button 
          type="submit"
          className="absolute right-1 text-xs font-bold font-serif bg-[#c5974a] text-[#191d1b] px-2.5 py-1 rounded-md hover:bg-[#b08339] transition-all cursor-pointer"
        >
          Join
        </button>
      </form>
    </div>

  </div>

  {/* Base Copyright Matrix Row */}
  <div className="max-w-[1400px] mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/30 font-mono">
    <div>
      &copy; 2026 SR369 Co. All rights reserved.
    </div>
    <div className="flex gap-6">
      <a href="#" className="hover:text-[#ebdcb9] transition-colors">Privacy Charter</a>
      <a href="#" className="hover:text-[#ebdcb9] transition-colors">Terms of Filing</a>
      <a href="#" className="hover:text-[#ebdcb9] transition-colors">System Metrics</a>
    </div>
  </div>
</footer>

      {/* Modals contexts */}
      <AddProductModal open={formOpen} onClose={() => setFormOpen(false)} onAdd={handleAdd} />
      <ProductDetailModal product={selected} onClose={() => setSelected(null)} />

      {toast && (
        <div className="fixed bottom-7 left-1/2 -translate-x-1/2 bg-emerald-800 text-[#eef4f1] px-5 py-3 rounded-xl text-sm flex items-center gap-2.5 shadow-2xl z-[1200]">
          <Check size={16} strokeWidth={2.5} />
          {toast}
        </div>
      )}
    </div>
  );
}