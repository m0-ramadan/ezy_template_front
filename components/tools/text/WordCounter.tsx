"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { FileText, Copy, Check, RotateCcw } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function WordCounter() {
  const { isRTL } = useLanguage();
  const [text, setText] = useState<string>(
    "أهلاً بكم في منصة EzyTemplate الرائدة في توفير القوالب والأدوات الرقمية لرواد الأعمال والمطورين والمصممين حول العالم.",
  );

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s+/g, "").length;
    const sentences = trimmed
      ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
      : 0;
    const paragraphs = trimmed
      ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0).length
      : 0;
    const readingTimeMinutes = Math.ceil(words / 200);

    return {
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
    };
  }, [text]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Realtime Stats Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
        }}
      >
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <small
            style={{
              color: "var(--muted)",
              display: "block",
              fontSize: "12px",
            }}
          >
            {isRTL ? "عدد الكلمات" : "Words"}
          </small>
          <strong style={{ fontSize: "24px", color: "var(--blue)" }}>
            {stats.words.toLocaleString()}
          </strong>
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <small
            style={{
              color: "var(--muted)",
              display: "block",
              fontSize: "12px",
            }}
          >
            {isRTL ? "الحروف (مع مسافات)" : "Characters"}
          </small>
          <strong style={{ fontSize: "24px", color: "var(--text)" }}>
            {stats.charsWithSpaces.toLocaleString()}
          </strong>
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <small
            style={{
              color: "var(--muted)",
              display: "block",
              fontSize: "12px",
            }}
          >
            {isRTL ? "الحروف (بدون مسافات)" : "No Spaces"}
          </small>
          <strong style={{ fontSize: "24px", color: "var(--text)" }}>
            {stats.charsWithoutSpaces.toLocaleString()}
          </strong>
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <small
            style={{
              color: "var(--muted)",
              display: "block",
              fontSize: "12px",
            }}
          >
            {isRTL ? "عدد الجمل" : "Sentences"}
          </small>
          <strong style={{ fontSize: "24px", color: "var(--text)" }}>
            {stats.sentences.toLocaleString()}
          </strong>
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <small
            style={{
              color: "var(--muted)",
              display: "block",
              fontSize: "12px",
            }}
          >
            {isRTL ? "الفقرات" : "Paragraphs"}
          </small>
          <strong style={{ fontSize: "24px", color: "var(--text)" }}>
            {stats.paragraphs.toLocaleString()}
          </strong>
        </div>
        <div
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            padding: "16px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <small
            style={{
              color: "var(--muted)",
              display: "block",
              fontSize: "12px",
            }}
          >
            {isRTL ? "زمن القراءة" : "Reading Time"}
          </small>
          <strong style={{ fontSize: "20px", color: "#16a34a" }}>
            {stats.readingTimeMinutes} {isRTL ? "دقيقة" : "min"}
          </strong>
        </div>
      </div>

      {/* Input Area */}
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            isRTL
              ? "اكتب أو ألصق النص هنا للتحليل اللحظي..."
              : "Type or paste your text here..."
          }
          style={{
            width: "100%",
            minHeight: "240px",
            border: "none",
            outline: "none",
            background: "transparent",
            color: "var(--text)",
            fontSize: "15px",
            lineHeight: "1.7",
            resize: "vertical",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "12px",
            borderTop: "1px solid var(--line)",
            paddingTop: "12px",
          }}
        >
          <button
            onClick={() => setText("")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              background: "var(--bg)",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            {isRTL ? "مسح النص" : "Clear Text"}
          </button>
        </div>
      </div>
    </div>
  );
}
