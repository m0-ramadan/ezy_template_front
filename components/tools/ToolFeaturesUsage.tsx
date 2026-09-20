"use client";

import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, ListOrdered, ShieldCheck } from "lucide-react";

interface ToolDetailsProps {
  features?: { en: string; ar: string }[];
  usageSteps?: { en: string; ar: string }[];
}

export default function ToolFeaturesUsage({
  features,
  usageSteps,
}: ToolDetailsProps) {
  const { isRTL } = useLanguage();

  if (!features && !usageSteps) return null;

  return (
    <div
      style={{
        marginTop: "40px",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "32px",
      }}
    >
      {/* Features */}
      {features && features.length > 0 && (
        <div
          style={{
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--line, #e2e8f0)",
            borderRadius: "16px",
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <CheckCircle2 size={22} className="text-emerald-500" />
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
              {isRTL ? "مميزات الأداة" : "Tool Features"}
            </h3>
          </div>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "12px",
            }}
          >
            {features.map((f: any, i: number) => {
              const textVal =
                typeof f === "string"
                  ? f
                  : isRTL
                    ? f?.ar || f?.en
                    : f?.en || f?.ar;
              const text =
                typeof textVal === "string" ? textVal : String(textVal || "");
              return (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "var(--text)",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "var(--blue)",
                    }}
                  />
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Usage Steps */}
      {usageSteps && usageSteps.length > 0 && (
        <div
          style={{
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--line, #e2e8f0)",
            borderRadius: "16px",
            padding: "24px 28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            <ListOrdered size={22} className="text-blue-500" />
            <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
              {isRTL ? "طريقة الاستخدام" : "How to Use"}
            </h3>
          </div>
          <ol
            style={{
              paddingInlineStart: "20px",
              margin: 0,
              display: "grid",
              gap: "12px",
            }}
          >
            {usageSteps.map((s: any, i: number) => {
              const textVal =
                typeof s === "string"
                  ? s
                  : isRTL
                    ? s?.ar || s?.en
                    : s?.en || s?.ar;
              const text =
                typeof textVal === "string" ? textVal : String(textVal || "");
              return (
                <li
                  key={i}
                  style={{
                    fontSize: "14px",
                    color: "var(--text)",
                    lineHeight: 1.6,
                  }}
                >
                  {text}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* Privacy Guarantee Box */}
      <div
        style={{
          background: "rgba(37, 99, 235, 0.05)",
          border: "1px solid rgba(37, 99, 235, 0.2)",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <ShieldCheck
          size={24}
          className="text-blue-500"
          style={{ flexShrink: 0 }}
        />
        <p
          style={{
            margin: 0,
            fontSize: "13.5px",
            color: "var(--text)",
            lineHeight: 1.5,
          }}
        >
          {isRTL
            ? "نحن نحترم خصوصيتك بالكامل. جميع العمليات تتم بشكل آمن ومحلي، ولا يتم تخزين أو حفظ أي من بياناتك أو مستنداتك على سيرفراتنا."
            : "We fully respect your privacy. All operations are processed securely and locally; none of your data or files are stored on our servers."}
        </p>
      </div>
    </div>
  );
}
