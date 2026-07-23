import React from "react";
import { Package, Plus } from "lucide-react";

export default function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="max-w-295 mx-auto text-center py-20 px-6 border border-dashed border-white/20 rounded-2xl mt-12 bg-white/1]">
      <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#c5974a]/10 text-[#c5974a]">
        <Package size={26} strokeWidth={1.5} />
      </div>
      <h3 className="font-serif italic text-2xl font-medium text-[#f7f3e8] mb-2">
        The ledger is empty
      </h3>
      <p className="text-white/50 text-sm max-w-sm mx-auto mb-6">
        Nothing's been filed on the shelves yet. Add the first item to start the
        catalog.
      </p>
      <button
        className="px-5 py-3 bg-linear-to-b from-[#C79A4E] to-[#77561f] text-[#201803] font-semibold text-sm rounded-lg shadow-lg flex items-center gap-2 mx-auto hover:-translate-y-0.5 transition-all"
        onClick={onAdd}
      >
        <Plus size={16} strokeWidth={2.5} /> Add Product
      </button>
    </div>
  );
}
