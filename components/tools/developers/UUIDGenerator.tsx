"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Fingerprint, Copy, Check, RefreshCw } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

function generateUUIDv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UUIDGenerator() {
  const { isRTL } = useLanguage();
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [uuids, setUuids] = useState<string[]>(() =>
    Array.from({ length: 5 }, () => generateUUIDv4()),
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    trackToolEvent("uuid-generator", "use_tool");
    const list = Array.from({ length: count }, () => {
      const u = generateUUIDv4();
      return uppercase ? u.toUpperCase() : u;
    });
    setUuids(list);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
    setCopied(true);
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
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <div>
          <label
            style={{ fontSize: "14px", fontWeight: 600, marginRight: "8px" }}
          >
            {isRTL ? "عدد المعرّفات المطلوبة:" : "Quantity:"}
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) =>
              setCount(Math.min(100, Math.max(1, Number(e.target.value))))
            }
            style={{
              width: "80px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          <span style={{ fontSize: "14px" }}>
            {isRTL ? "أحرف كبيرة (UPPERCASE)" : "Uppercase"}
          </span>
        </label>

        <button
          onClick={handleGenerate}
          style={{
            padding: "10px 20px",
            borderRadius: "10px",
            background: "var(--blue)",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <RefreshCw size={16} />
          {isRTL ? "توليد معرّفات جديدة" : "Generate UUIDs"}
        </button>
      </div>

      <div
        style={{
          background: "var(--bg, #f8fafc)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "16px",
          fontFamily: "monospace",
          fontSize: "14px",
          lineHeight: 1.8,
          marginBottom: "20px",
        }}
      >
        {uuids.map((id, index) => (
          <div key={index}>{id}</div>
        ))}
      </div>

      <button
        onClick={handleCopy}
        style={{
          padding: "12px 24px",
          borderRadius: "10px",
          background: copied ? "#16a34a" : "var(--blue)",
          color: "#fff",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied
          ? isRTL
            ? "تم النسخ!"
            : "Copied!"
          : isRTL
            ? "نسخ القائمة بالكامل"
            : "Copy All UUIDs"}
      </button>
    </div>
  );
}
