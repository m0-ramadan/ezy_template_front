"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Code2, Copy, Check, AlertTriangle } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function JSONFormatter() {
  const { isRTL } = useLanguage();
  const [inputJson, setInputJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    trackToolEvent("json-formatter", "use_tool");
    setError(null);
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed, null, 2));
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleMinify = () => {
    trackToolEvent("json-formatter", "use_tool");
    setError(null);
    if (!inputJson.trim()) return;
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed));
    } catch (err: any) {
      setError(err.message || "Invalid JSON syntax");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
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
            {isRTL ? "كود JSON المدخل:" : "Input JSON:"}
          </label>
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder='{"name": "EzyTemplate", "tools": true}'
            rows={10}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid var(--line)",
              fontFamily: "monospace",
              fontSize: "13.5px",
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
            {isRTL ? "النتيجة المنسقة:" : "Formatted Output:"}
          </label>
          <textarea
            readOnly
            value={formattedJson}
            rows={10}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid var(--line)",
              background: "var(--bg, #f8fafc)",
              fontFamily: "monospace",
              fontSize: "13.5px",
            }}
          />
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          <AlertTriangle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: "flex", gap: "12px" }}>
        <button
          onClick={handleFormat}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            background: "var(--blue)",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
          }}
        >
          {isRTL ? "تنسيق وتجميل (Format)" : "Format Beautify"}
        </button>
        <button
          onClick={handleMinify}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            background: "var(--bg)",
            border: "1px solid var(--line)",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {isRTL ? "ضغط الكود (Minify)" : "Minify Compact"}
        </button>
        {formattedJson && (
          <button
            onClick={handleCopy}
            style={{
              padding: "12px 20px",
              borderRadius: "10px",
              background: copied ? "#16a34a" : "var(--bg)",
              color: copied ? "#fff" : "var(--text)",
              border: "1px solid var(--line)",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied
              ? isRTL
                ? "تم النسخ"
                : "Copied"
              : isRTL
                ? "نسخ الناتِج"
                : "Copy Output"}
          </button>
        )}
      </div>
    </div>
  );
}
