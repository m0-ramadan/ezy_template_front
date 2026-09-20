"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Type, Copy, Check } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function CaseConverter() {
  const { isRTL } = useLanguage();
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleTransform = (type: string) => {
    trackToolEvent("case-converter", "use_tool");
    if (!text) return;
    switch (type) {
      case "upper":
        setText(text.toUpperCase());
        break;
      case "lower":
        setText(text.toLowerCase());
        break;
      case "title":
        setText(text.replace(/\b\w/g, (l) => l.toUpperCase()));
        break;
      case "camel":
        setText(
          text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase()),
        );
        break;
      case "snake":
        setText(
          text
            .replace(/\W+/g, " ")
            .split(/ |\B(?=[A-Z])/)
            .map((word) => word.toLowerCase())
            .join("_"),
        );
        break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
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
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          isRTL ? "اكتب أو الصق النص هنا..." : "Type or paste text here..."
        }
        rows={6}
        style={{
          width: "100%",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid var(--line)",
          fontSize: "15px",
          lineHeight: 1.6,
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => handleTransform("upper")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          UPPERCASE
        </button>
        <button
          onClick={() => handleTransform("lower")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          lowercase
        </button>
        <button
          onClick={() => handleTransform("title")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Title Case
        </button>
        <button
          onClick={() => handleTransform("camel")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          camelCase
        </button>
        <button
          onClick={() => handleTransform("snake")}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          snake_case
        </button>
      </div>

      <button
        onClick={handleCopy}
        disabled={!text}
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
            ? "نسخ النص الناتِج"
            : "Copy Output Text"}
      </button>
    </div>
  );
}
