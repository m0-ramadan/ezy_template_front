"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles } from "lucide-react";
import TemplateCard from "@/components/TemplateCard";

export default function RelatedTemplates({
  templates,
  categoryLabel,
}: {
  templates?: any[];
  categoryLabel?: { ar: string; en: string };
}) {
  const { isRTL } = useLanguage();

  if (!templates || templates.length === 0) {
    return (
      <section
        style={{
          marginTop: "48px",
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.06), rgba(124,58,237,0.06))",
          borderRadius: "16px",
          padding: "24px 28px",
          border: "1px solid var(--line, #e2e8f0)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "10px",
              borderRadius: "12px",
              background: "var(--blue, #2563eb)",
              color: "#fff",
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text)",
                margin: "0 0 4px 0",
              }}
            >
              {isRTL
                ? "هل تحتاج إلى قوالب جاهزة للتعديل في إكسيل أو وورد؟"
                : "Need Editable Excel or Word Templates?"}
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                margin: 0,
              }}
            >
              {isRTL
                ? "استكشف آلاف القوالب الجاهزة المكملة لهذه الأداة في منصة EzyTemplate."
                : "Browse thousands of professional pre-designed templates on EzyTemplate."}
            </p>
          </div>
        </div>

        <Link
          href="/templates"
          className="btn primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            borderRadius: "10px",
            background: "var(--blue, #2563eb)",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "13.5px",
            textDecoration: "none",
          }}
        >
          <span>{isRTL ? "تصفح القوالب الذكية ←" : "Explore Templates →"}</span>
        </Link>
      </section>
    );
  }

  return (
    <section style={{ marginTop: "56px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "var(--text)",
              margin: "0 0 4px 0",
            }}
          >
            {isRTL ? "قوالب ومستندات ذات صلة" : "Recommended Templates for You"}
          </h2>
          <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: 0 }}>
            {isRTL
              ? "وفر ساعات من العمل واستخدم قوالب الإكسيل والوورد الجاهزة."
              : "Save hours of work with ready-to-use professional templates."}
          </p>
        </div>

        <Link
          href="/templates"
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "var(--blue, #2563eb)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <span>{isRTL ? "عرض جميع القوالب" : "View All"}</span>
          <ArrowRight
            size={14}
            style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
          />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {templates.map((tItem) => (
          <TemplateCard key={tItem.slug || tItem.id} t={tItem} />
        ))}
      </div>
    </section>
  );
}
