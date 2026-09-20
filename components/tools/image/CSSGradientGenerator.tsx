"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Copy, Check, Sliders } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function CSSGradientGenerator() {
  const { isRTL } = useLanguage();
  const [color1, setColor1] = useState("#2563eb");
  const [color2, setColor2] = useState("#9333ea");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const cssCode = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    trackToolEvent("css-gradient-generator", "use_tool");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      {/* Live Preview Box */}
      <div
        style={{
          width: "100%",
          height: "220px",
          borderRadius: "16px",
          background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.1)",
          marginBottom: "28px",
        }}
      />

      {/* Controls */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginBottom: "28px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            {isRTL ? "اللون الأول:" : "Color 1:"}
          </label>
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            style={{
              width: "100%",
              height: "46px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              cursor: "pointer",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            {isRTL ? "اللون الثاني:" : "Color 2:"}
          </label>
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            style={{
              width: "100%",
              height: "46px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              cursor: "pointer",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "8px",
            }}
          >
            {isRTL ? `زاوية التدرج (${angle}°):` : `Angle (${angle}°):`}
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            style={{ width: "100%", marginTop: "12px" }}
          />
        </div>
      </div>

      {/* Output Code */}
      <div
        style={{
          background: "var(--bg, #f8fafc)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <code
          style={{
            fontFamily: "monospace",
            fontSize: "14px",
            color: "var(--text)",
          }}
        >
          {cssCode}
        </code>
        <button
          onClick={handleCopy}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: copied ? "#16a34a" : "var(--blue)",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied
            ? isRTL
              ? "تم النسخ!"
              : "Copied!"
            : isRTL
              ? "نسخ الكود"
              : "Copy CSS"}
        </button>
      </div>
    </div>
  );
}
