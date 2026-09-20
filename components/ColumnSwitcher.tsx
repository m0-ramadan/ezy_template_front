"use client";

import { Grid2X2, Grid3X3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ColumnSwitcherProps {
  cols: number;
  onChange: (cols: number) => void;
}

export default function ColumnSwitcher({
  cols,
  onChange,
}: ColumnSwitcherProps) {
  const { isRTL } = useLanguage();

  return (
    <div
      className="column-switcher-wrap"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        padding: "4px",
        borderRadius: "10px",
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
      }}
    >
      <button
        type="button"
        onClick={() => onChange(2)}
        title={isRTL ? "كاردين في الصف" : "2 Cards per row"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "none",
          background: cols === 2 ? "var(--blue, #2563eb)" : "transparent",
          color: cols === 2 ? "#ffffff" : "var(--muted, #64748b)",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 700,
          transition: "all 0.2s ease",
        }}
      >
        <Grid2X2 size={16} />
        <span>2</span>
      </button>

      <button
        type="button"
        onClick={() => onChange(3)}
        title={
          isRTL ? "3 كروت في الصف (الافتراضي)" : "3 Cards per row (Default)"
        }
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          padding: "6px 10px",
          borderRadius: "6px",
          border: "none",
          background: cols === 3 ? "var(--blue, #2563eb)" : "transparent",
          color: cols === 3 ? "#ffffff" : "var(--muted, #64748b)",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: 700,
          transition: "all 0.2s ease",
        }}
      >
        <Grid3X3 size={16} />
        <span>3</span>
      </button>
    </div>
  );
}
