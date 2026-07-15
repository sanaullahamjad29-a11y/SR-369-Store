import React from "react";
import { AlertCircle } from "lucide-react";

export default function FieldError({ show, children }: { show: boolean; children: React.ReactNode }) {
  if (!show || !children) return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
      <AlertCircle size={13} strokeWidth={2.5} />
      <span>{children}</span>
    </div>
  );
}