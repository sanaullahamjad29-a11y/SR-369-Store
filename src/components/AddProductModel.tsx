"use client";

import React from "react";
import { useFormik } from "formik";
import { X, Check } from "lucide-react";
import { productValidationSchema, initialValues } from "@/utils/validation";
import { CATEGORIES, Product } from "@/constants/categories";
import FieldError from "./FieldError";

interface ModalProps { open: boolean; onClose: () => void; onAdd: (product: Product) => void; }

export default function AddProductModal({ open, onClose, onAdd }: ModalProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: productValidationSchema,
    onSubmit: (values, { resetForm }) => {
      onAdd({
        id: `p-${Date.now()}`,
        title: values.title.trim(),
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),
        description: values.description.trim(),
        image: values.image.trim(),
      });
      resetForm();
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 z-[1000]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#f7f3e8] text-[#191d1b] rounded-2xl max-w-[620px] w-full max-h-[88vh] overflow-y-auto p-8 shadow-2xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-[#c5974a] block mb-1">New Entry</span>
            <h2 className="font-serif italic text-2xl md:text-3xl font-medium">Add to the Ledger</h2>
          </div>
          <button type="button" className="bg-[#191d1b]/5 hover:bg-[#191d1b]/10 rounded-full w-9 h-9 flex items-center justify-center transition-all" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="title" className="text-xs font-semibold text-[#5c6459]">Item name</label>
            <input id="title" type="text" placeholder="Hand-thrown Speckled Mug" {...formik.getFieldProps("title")} 
              className={`font-sans text-sm p-3 rounded-lg border bg-white focus:border-[#c5974a] focus:ring-4 focus:ring-[#c5974a]/10 outline-none w-full transition-all ${formik.touched.title && formik.errors.title ? "border-red-600" : "border-[#191d1b]/15"}`} />
            <FieldError show={!!(formik.touched.title && formik.errors.title)}>{formik.errors.title}</FieldError>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="category" className="text-xs font-semibold text-[#5c6459]">Shelf / category</label>
              <select id="category" {...formik.getFieldProps("category")} 
                className={`font-sans text-sm p-3 rounded-lg border bg-white focus:border-[#c5974a] focus:ring-4 focus:ring-[#c5974a]/10 outline-none w-full transition-all ${formik.touched.category && formik.errors.category ? "border-red-600" : "border-[#191d1b]/15"}`}>
                <option value="">Choose one…</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <FieldError show={!!(formik.touched.category && formik.errors.category)}>{formik.errors.category}</FieldError>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="price" className="text-xs font-semibold text-[#5c6459]">Price (USD)</label>
              <div className="flex items-center border border-[#191d1b]/15 bg-white rounded-lg pl-3 focus-within:border-[#c5974a] focus-within:ring-4 focus-within:ring-[#c5974a]/10 transition-all">
                <span className="text-[#5c6459] text-sm">$</span>
                <input id="price" type="number" step="0.01" placeholder="28.00" {...formik.getFieldProps("price")} className="border-none p-3 pl-1 text-sm outline-none w-full rounded-r-lg" />
              </div>
              <FieldError show={!!(formik.touched.price && formik.errors.price)}>{formik.errors.price}</FieldError>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="stock" className="text-xs font-semibold text-[#5c6459]">Stock on shelf</label>
              <input id="stock" type="number" placeholder="14" {...formik.getFieldProps("stock")} 
                className={`font-sans text-sm p-3 rounded-lg border bg-white focus:border-[#c5974a] focus:ring-4 focus:ring-[#c5974a]/10 outline-none w-full transition-all ${formik.touched.stock && formik.errors.stock ? "border-red-600" : "border-[#191d1b]/15"}`} />
              <FieldError show={!!(formik.touched.stock && formik.errors.stock)}>{formik.errors.stock}</FieldError>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="image" className="text-xs font-semibold text-[#5c6459]">Image URL (optional)</label>
              <input id="image" type="text" placeholder="https://…" {...formik.getFieldProps("image")} 
                className={`font-sans text-sm p-3 rounded-lg border bg-white focus:border-[#c5974a] focus:ring-4 focus:ring-[#c5974a]/10 outline-none w-full transition-all ${formik.touched.image && formik.errors.image ? "border-red-600" : "border-[#191d1b]/15"}`} />
              <FieldError show={!!(formik.touched.image && formik.errors.image)}>{formik.errors.image}</FieldError>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-xs font-semibold text-[#5c6459] flex justify-between items-center">
              Description <span className="font-mono text-[11px] text-[#191d1b]/40">{formik.values.description.trim().length}/300</span>
            </label>
            <textarea id="description" rows={3} placeholder="Describe the item craftsmanship details..." {...formik.getFieldProps("description")} 
              className={`font-sans text-sm p-3 rounded-lg border bg-white focus:border-[#c5974a] focus:ring-4 focus:ring-[#c5974a]/10 outline-none w-full resize-none ${formik.touched.description && formik.errors.description ? "border-red-600" : "border-[#191d1b]/15"}`} />
            <FieldError show={!!(formik.touched.description && formik.errors.description)}>{formik.errors.description}</FieldError>
          </div>

          <div className="flex justify-end gap-2.5 mt-4 pt-5 border-t border-dashed border-[#191d1b]/15">
            <button type="button" className="px-5 py-3 border border-[#191d1b]/15 text-[#5c6459] font-semibold text-sm rounded-lg hover:bg-[#191d1b]/5 transition-all" onClick={() => { formik.resetForm(); onClose(); }}>Cancel</button>
            <button type="submit" className="px-5 py-3 bg-gradient-to-b from-[#C79A4E] to-[#77561f] text-[#201803] font-semibold text-sm rounded-lg shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2" disabled={formik.isSubmitting}>
              <Check size={16} strokeWidth={2.5} /> File this item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}