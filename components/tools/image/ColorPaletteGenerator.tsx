"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Palette, Copy, Check, UploadCloud, RefreshCw } from "lucide-react";

const DEFAULT_PALETTE = [
  { hex: "#2563EB", rgb: "rgb(37, 99, 235)" },
  { hex: "#7C3AED", rgb: "rgb(124, 58, 237)" },
  { hex: "#EC4899", rgb: "rgb(236, 72, 153)" },
  { hex: "#10B981", rgb: "rgb(16, 185, 129)" },
  { hex: "#F59E0B", rgb: "rgb(245, 158, 11)" },
];

export default function ColorPaletteGenerator() {
  const { isRTL } = useLanguage();
  const [colors, setColors] = useState(DEFAULT_PALETTE);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const generateRandomPalette = () => {
    const newColors = Array.from({ length: 5 }).map(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
      return { hex, rgb: `rgb(${r}, ${g}, ${b})` };
    });
    setColors(newColors);
  };

  const handleImageExtract = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 100;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, 100, 100);
      const imgData = ctx.getImageData(0, 0, 100, 100).data;
      const extracted: { hex: string; rgb: string }[] = [];

      for (let i = 0; i < 5; i++) {
        const idx = Math.floor(Math.random() * (imgData.length / 4)) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
        extracted.push({ hex, rgb: `rgb(${r}, ${g}, ${b})` });
      }
      setColors(extracted);
    };
    img.src = url;
  };

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div
      style={{
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <button
          onClick={generateRandomPalette}
          className="btn primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          <RefreshCw size={16} />
          <span>
            {isRTL ? "توليد لوحة ألوان عشوائية" : "Generate Random Palette"}
          </span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: "1px solid var(--line)",
            background: "var(--bg)",
            padding: "10px 18px",
            borderRadius: "10px",
            fontWeight: 700,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UploadCloud size={16} />
          <span>
            {isRTL ? "استخراج الألوان من صورة" : "Extract Colors from Image"}
          </span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && handleImageExtract(e.target.files[0])
          }
          style={{ display: "none" }}
        />
      </div>

      {/* Palette Strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "16px",
        }}
      >
        {colors.map((c, i) => (
          <div
            key={i}
            style={{
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid var(--line)",
              background: "var(--bg)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                height: "130px",
                background: c.hex,
                transition: "background 0.3s ease",
              }}
            />
            <div style={{ padding: "12px", textAlign: "center" }}>
              <strong
                style={{
                  fontSize: "14px",
                  display: "block",
                  color: "var(--text)",
                  fontFamily: "monospace",
                }}
              >
                {c.hex}
              </strong>
              <small
                style={{
                  fontSize: "11px",
                  color: "var(--muted)",
                  display: "block",
                  margin: "4px 0 10px",
                }}
              >
                {c.rgb}
              </small>
              <button
                onClick={() => handleCopy(c.hex)}
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: "6px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  cursor: "pointer",
                  fontSize: "12px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                {copiedHex === c.hex ? (
                  <Check size={12} color="#16a34a" />
                ) : (
                  <Copy size={12} />
                )}
                <span>
                  {copiedHex === c.hex
                    ? isRTL
                      ? "تم النسخ"
                      : "Copied"
                    : isRTL
                      ? "نسخ HEX"
                      : "Copy HEX"}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
