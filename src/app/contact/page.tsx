"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Formik Configuration with Strict Validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .max(40, "Name is too long")
        .required("Name is required to file a request"),
      email: Yup.string()
        .email("Invalid ledger email address")
        .required("Email address is required"),
      subject: Yup.string()
        .min(4, "Subject must be at least 4 characters")
        .required("Please provide a message topic"),
      message: Yup.string()
        .min(15, "Please elaborate your message (minimum 15 characters)")
        .required("Message body cannot be empty"),
    }),
    onSubmit: (values) => {
      console.log("Contact Request Logged:", values);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        formik.resetForm();
      }, 5000);
    },
  });

  return (
    <div className="min-h-screen bg-[#141716] text-[#ebdcb9] bg-[radial-gradient(circle_at_85%_15%,rgba(197,151,74,0.06),transparent_40%)] flex flex-col justify-between overflow-x-hidden">
      
      {/* --- CONTENT CONTAINER --- */}
      <main className="max-w-[1200px] w-full mx-auto px-6 py-20 flex-grow">
        
        {/* Page Typography Stack */}
        <div className="text-center mb-16 relative select-none">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#c5974a] block mb-2">
            Get In Touch
          </span>
          <h1 className="font-serif italic font-black text-4xl md:text-6xl tracking-tight text-[#f7f3e8]">
            The Inquiry Desk
          </h1>
          <p className="mt-3 text-sm text-white/50 tracking-wide max-w-[45ch] mx-auto">
            Have an issue with an item, or a custom ledger request? Stamp your message straight into our mailbox.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start [perspective:1200px]">
          
          {/* LEFT COLUMN: Contact Meta (3D Interactive Feel) */}
          <div className="lg:col-span-2 space-y-6 bg-[#191d1b] border border-white/5 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-[#c5974a]/5">
            <h3 className="font-serif text-xl text-[#ebdcb9] font-semibold border-b border-white/5 pb-3">
              Office Registry
            </h3>
            
            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-white/5 text-[#c5974a] border border-white/5">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-xs text-white/40 font-mono uppercase tracking-wider">Electronic Mail</span>
                  <a href="mailto:desk@sr369store.com" className="text-sm hover:text-[#c5974a] transition-colors">desk@sr369store.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-white/5 text-[#c5974a] border border-white/5">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="block text-xs text-white/40 font-mono uppercase tracking-wider">Hotline Exchange</span>
                  <span className="text-sm">+1 (555) 234-8910</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-white/5 text-[#c5974a] border border-white/5">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="block text-xs text-white/40 font-mono uppercase tracking-wider">Physical Quarter</span>
                  <p className="text-sm text-white/70 leading-relaxed">
                    742 Ledger Lane, Vault 04,<br />
                    Faisalabad, Punjab, PK.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Validated Contact Form */}
          <div className="lg:col-span-3 bg-[#ebdcb9] text-[#191d1b] p-8 md:p-10 rounded-2xl shadow-2xl relative overflow-hidden border border-white/10 [transform-style:preserve-3d]">
            
            {isSubmitted ? (
              /* Success State Overlap View */
              <div className="py-20 flex flex-col items-center justify-center text-center animate-fade-in">
                <CheckCircle2 size={56} className="text-emerald-700 animate-bounce" />
                <h4 className="font-serif text-2xl font-bold text-[#191d1b] mt-4">Filing Successful</h4>
                <p className="text-xs text-black/60 max-w-[32ch] mt-1.5 leading-relaxed">
                  Your entry has been compiled and stamped. Our clerks will safely follow up via dispatch soon.
                </p>
              </div>
            ) : (
              /* Actual Form Interaction Node */
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-black/60 font-bold">Your Name</label>
                    <input 
                      type="text"
                      {...formik.getFieldProps("name")}
                      className={`w-full bg-black/5 border ${formik.touched.name && formik.errors.name ? 'border-red-600' : 'border-black/10'} rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-800 transition-all text-black`}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <span className="text-[10px] text-red-700 font-medium font-sans">{formik.errors.name}</span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="flex flex-col gap-1">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-black/60 font-bold">Email Address</label>
                    <input 
                      type="email"
                      {...formik.getFieldProps("email")}
                      className={`w-full bg-black/5 border ${formik.touched.email && formik.errors.email ? 'border-red-600' : 'border-black/10'} rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-800 transition-all text-black`}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <span className="text-[10px] text-red-700 font-medium font-sans">{formik.errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-black/60 font-bold">Subject Line</label>
                  <input 
                    type="text"
                    {...formik.getFieldProps("subject")}
                    className={`w-full bg-black/5 border ${formik.touched.subject && formik.errors.subject ? 'border-red-600' : 'border-black/10'} rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-800 transition-all text-black`}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <span className="text-[10px] text-red-700 font-medium font-sans">{formik.errors.subject}</span>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="flex flex-col gap-1">
                  <label className="font-mono text-[11px] uppercase tracking-wider text-black/60 font-bold">Message Details</label>
                  <textarea 
                    rows={5}
                    {...formik.getFieldProps("message")}
                    className={`w-full bg-black/5 border ${formik.touched.message && formik.errors.message ? 'border-red-600' : 'border-black/10'} rounded-lg px-3 py-3 text-sm outline-none focus:border-emerald-800 transition-all text-black resize-none`}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <span className="text-[10px] text-red-700 font-medium font-sans">{formik.errors.message}</span>
                  )}
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#191d1b] hover:bg-[#282f2c] text-[#ebdcb9] font-bold text-xs font-mono uppercase tracking-widest rounded-lg transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send size={14} /> File Inquiry
                </button>
              </form>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
}