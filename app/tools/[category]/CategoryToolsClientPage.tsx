"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import ToolBreadcrumb from "@/components/tools/ToolBreadcrumb";
import ToolCard from "@/components/tools/ToolCard";
import ToolAdSlot from "@/components/tools/ToolAdSlot";
import { getToolsFromApi } from "@/lib/api";
import { TOOLS as fallbackTools } from "@/data/tools";
import { Wrench } from "lucide-react";

export default function CategoryToolsClientPage({
  categorySlug,
}: {
  categorySlug: string;
}) {
  const { isRTL } = useLanguage();
  const [apiTools, setApiTools] = useState<any[] | null>(null);

  useEffect(() => {
    getToolsFromApi({ category: categorySlug }).then((res) => {
      if (res && res.tools) {
        setApiTools(res.tools);
      }
    });
  }, [categorySlug]);

  const categoryNames: Record<
    string,
    { ar: string; en: string; descAr: string; descEn: string }
  > = {
    pdf: {
      ar: "أدوات ملفات PDF",
      en: "PDF Tools",
      descAr:
        "مجموعة أدوات معالجة ملفات PDF لضغط، دمج، تقسيم، وتحويل المستندات بسهولة وأمان.",
      descEn:
        "Free PDF utilities to compress, merge, split, and convert documents online.",
    },
    images: {
      ar: "أدوات الصور والتصميم",
      en: "Image & Design Tools",
      descAr:
        "أدوات ضغط وتعديل مقاسات الصور وتحويل الصيغ واستخراج ألوان الهيكس.",
      descEn:
        "Image processing utilities for compression, resizing, conversion, and color palettes.",
    },
    business: {
      ar: "أدوات وتطبيقات الأعمال",
      en: "Business & Productivity Tools",
      descAr:
        "إنشاء الفواتير التجارية الاحترافية، أجهزة الرموز الاستجابية، وحسابات التجارة.",
      descEn:
        "Business tools for invoices, quotes, QR codes, and commercial operations.",
    },
    calculators: {
      ar: "الحاسبات المالية والرقمية",
      en: "Calculators",
      descAr:
        "حاسبة ضريبة القيمة المضافة، والنسب المئوية، وهامش الربح، والخصومات المباشرة.",
      descEn:
        "Financial and math calculators for VAT, percentage calculations, profit margins, and discounts.",
    },
    excel: {
      ar: "أدوات Excel و CSV",
      en: "Excel & CSV Tools",
      descAr: "تحويل جداول البيانات والمعاينة وتنسيق صيغ XLSX و CSV بسهولة.",
      descEn: "Spreadsheet tools for converting between CSV and Excel formats.",
    },
    text: {
      ar: "أدوات معالجة النصوص",
      en: "Text Tools",
      descAr: "عد الكلمات والحروف، وتعيين وقت القراءة، وتحليل النصوص الفوري.",
      descEn:
        "Text utilities for word counting, character statistics, and text analysis.",
    },
    developer: {
      ar: "أدوات المطورين والبرمجة",
      en: "Developer Utilities",
      descAr:
        "توليد كلمات المرور المشفرة وتنسيق البيانات المشفرة مجاناً بالمتصفح.",
      descEn:
        "Developer utilities for password generation, JSON, and encryption.",
    },
    seo: {
      ar: "أدوات SEO والتسويق",
      en: "SEO & Marketing Tools",
      descAr:
        "أدوات تحسين محركات البحث وتوليد ميتا تاج والمستندات التقنية للمواقع.",
      descEn:
        "SEO and marketing utilities for meta tags, robots.txt, and web tracking.",
    },
  };

  let safeCategorySlug =
    typeof categorySlug === "string"
      ? categorySlug
      : String(categorySlug || "");
  if (safeCategorySlug === "developer") safeCategorySlug = "developers";
  if (safeCategorySlug === "calculator") safeCategorySlug = "calculators";

  const catMeta = categoryNames[safeCategorySlug] || {
    ar: safeCategorySlug.toUpperCase(),
    en: safeCategorySlug.toUpperCase(),
    descAr: "تصفح الأدوات المتاحة في هذا القسم.",
    descEn: "Browse available tools in this section.",
  };

  const sourceTools = useMemo(() => {
    let list = [];
    if (apiTools && apiTools.length > 0) {
      list = apiTools.map((t: any) => {
        let catSlug = "business";
        if (typeof t.category === "string") {
          catSlug = t.category;
        } else if (t.category && t.category.slug) {
          catSlug = t.category.slug;
        } else if (t.category_id) {
          const catMap: Record<number, string> = {
            1: "pdf",
            2: "images",
            3: "business",
            4: "calculators",
            5: "excel",
            6: "text",
            7: "developers",
            8: "seo",
          };
          catSlug = catMap[t.category_id] || "business";
        }

        return {
          slug: t.slug,
          title: { en: t.name, ar: t.name_ar || t.name },
          shortDescription: {
            en: t.short_description || t.description,
            ar: t.short_description_ar || t.description_ar || t.description,
          },
          description: { en: t.description || "", ar: t.description_ar || "" },
          icon: t.icon || "Wrench",
          category: catSlug,
          badge: {
            en: t.is_new ? "New" : t.is_popular ? "Popular" : "Free",
            ar: t.is_new ? "جديد" : t.is_popular ? "شائع" : "مجاني",
          },
          href: `/tools/${t.slug}`,
          keywords: Array.isArray(t.keywords) ? t.keywords : [],
          is_available: t.is_available !== false,
        };
      });
    } else {
      list = fallbackTools;
    }

    const currentCat = safeCategorySlug;
    return list.filter((t: any) => {
      const cat = t.category;
      return (
        cat === currentCat ||
        cat === categorySlug ||
        (currentCat === "developers" &&
          (cat === "developers" || cat === "developer")) ||
        (currentCat === "calculators" &&
          (cat === "calculators" || cat === "calculator"))
      );
    });
  }, [apiTools, categorySlug, safeCategorySlug]);

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "80vh",
        padding: "32px 0 80px",
      }}
    >
      <div className="container">
        <ToolBreadcrumb title={isRTL ? catMeta.ar : catMeta.en} />

        <div
          style={{
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            borderRadius: "20px",
            padding: "40px 32px",
            color: "#fff",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.1)",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <Wrench size={14} className="text-blue-400" />
            <span>{isRTL ? "قسم الأدوات المخصص" : "Tool Category"}</span>
          </div>
          <h1
            style={{ fontSize: "32px", fontWeight: 800, marginBottom: "12px" }}
          >
            {isRTL ? catMeta.ar : catMeta.en}
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "#94a3b8",
              margin: 0,
              maxWidth: "700px",
            }}
          >
            {isRTL ? catMeta.descAr : catMeta.descEn}
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          {[
            { id: "all", label: { ar: "الكل", en: "All" } },
            { id: "pdf", label: { ar: "أدوات PDF", en: "PDF Tools" } },
            { id: "images", label: { ar: "الصور", en: "Images" } },
            { id: "business", label: { ar: "الأعمال", en: "Business" } },
            { id: "calculators", label: { ar: "الحسابات", en: "Calculators" } },
            { id: "excel", label: { ar: "Excel و CSV", en: "Excel & CSV" } },
            { id: "text", label: { ar: "النصوص", en: "Text" } },
            { id: "developers", label: { ar: "المطورين", en: "Developers" } },
            { id: "seo", label: { ar: "SEO", en: "SEO" } },
          ].map((cat) => {
            const active =
              categorySlug === cat.id ||
              (cat.id === "developers" && categorySlug === "developer") ||
              (cat.id === "calculators" && categorySlug === "calculator");
            const href = cat.id === "all" ? "/tools" : `/tools/${cat.id}`;
            return (
              <Link
                key={cat.id}
                href={href}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: active
                    ? "1px solid var(--blue, #2563eb)"
                    : "1px solid var(--line, #e2e8f0)",
                  background: active
                    ? "var(--blue, #2563eb)"
                    : "var(--card-bg, #ffffff)",
                  color: active ? "#ffffff" : "var(--text)",
                  fontWeight: 600,
                  fontSize: "13px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {isRTL ? cat.label.ar : cat.label.en}
              </Link>
            );
          })}
        </div>

        <ToolAdSlot placement="category-top" />

        {sourceTools.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {sourceTools.map((tool: any) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "var(--card-bg)",
              borderRadius: "16px",
              border: "1px solid var(--line)",
            }}
          >
            <p style={{ color: "var(--muted)", fontSize: "16px", margin: 0 }}>
              {isRTL
                ? "لا توجد أدوات متاحة حالياً في هذا القسم."
                : "No tools available in this category yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
