"use client";

import { useLanguage } from "@/context/LanguageContext";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: { en: string; ar: string };
  answer: { en: string; ar: string };
}

export default function ToolFAQ({ faqs }: { faqs?: FAQItem[] }) {
  const { isRTL } = useLanguage();

  if (!faqs || faqs.length === 0) return null;

  return (
    <section style={{ marginTop: "48px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <HelpCircle size={22} className="text-blue-500" />
        <h2 style={{ fontSize: "22px", fontWeight: 700, margin: 0 }}>
          {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {faqs.map((faq, index) => {
          const qVal =
            typeof faq.question === "string"
              ? faq.question
              : isRTL
                ? faq.question?.ar || faq.question?.en
                : faq.question?.en || faq.question?.ar;
          const question = typeof qVal === "string" ? qVal : String(qVal || "");

          const aVal =
            typeof faq.answer === "string"
              ? faq.answer
              : isRTL
                ? faq.answer?.ar || faq.answer?.en
                : faq.answer?.en || faq.answer?.ar;
          const answer = typeof aVal === "string" ? aVal : String(aVal || "");

          return (
            <div
              key={index}
              style={{
                background: "var(--card-bg, #ffffff)",
                border: "1px solid var(--line, #e2e8f0)",
                borderRadius: "12px",
                padding: "20px 24px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--text)",
                  marginBottom: "8px",
                  lineHeight: 1.4,
                }}
              >
                {question}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
