"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Wrench } from "lucide-react";
import ToolCard from "@/components/tools/ToolCard";
import ToolBreadcrumb from "@/components/tools/ToolBreadcrumb";
import { getToolsFromApi } from "@/lib/api";
import { TOOLS as fallbackTools, Tool } from "@/data/tools";

export default function ToolsClientPage() {
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [apiTools, setApiTools] = useState<any[] | null>(null);

  useEffect(() => {
    getToolsFromApi().then((res) => {
      if (res && res.tools && res.tools.length > 0) {
        setApiTools(res.tools);
      }
    });
  }, []);

  const categories = [
    { id: "all", label: { ar: "الكل", en: "All" } },
    { id: "pdf", label: { ar: "أدوات PDF", en: "PDF Tools" } },
    { id: "images", label: { ar: "الصور", en: "Images" } },
    { id: "business", label: { ar: "الأعمال", en: "Business" } },
    { id: "calculators", label: { ar: "الحسابات", en: "Calculators" } },
    { id: "excel", label: { ar: "Excel و CSV", en: "Excel & CSV" } },
    { id: "text", label: { ar: "النصوص", en: "Text" } },
    { id: "developers", label: { ar: "المطورين", en: "Developers" } },
    { id: "seo", label: { ar: "SEO", en: "SEO" } },
  ];

  const sourceTools = useMemo(() => {
    if (apiTools && apiTools.length > 0) {
      return apiTools.map((t: any) => {
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
    }
    return fallbackTools;
  }, [apiTools]);

  const filteredTools = useMemo(() => {
    return sourceTools.filter((tool: any) => {
      const cat = tool.category;
      const matchCat =
        selectedCategory === "all" ||
        cat === selectedCategory ||
        (selectedCategory === "developers" && cat === "developer") ||
        (selectedCategory === "calculators" && cat === "calculator");
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchCat;

      const title = (isRTL ? tool.title.ar : tool.title.en).toLowerCase();
      const desc = (
        isRTL ? tool.shortDescription.ar : tool.shortDescription.en
      ).toLowerCase();
      const kw = Array.isArray(tool.keywords)
        ? tool.keywords.join(" ").toLowerCase()
        : "";

      return (
        matchCat && (title.includes(q) || desc.includes(q) || kw.includes(q))
      );
    });
  }, [searchQuery, selectedCategory, isRTL, sourceTools]);

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "80vh",
        padding: "32px 0 80px",
      }}
    >
      <div className="container">
        {/* Breadcrumb */}
        <ToolBreadcrumb title={isRTL ? "الأدوات المجانية" : "Tools"} />

        {/* Hero Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b, #0f172a)",
            borderRadius: "20px",
            padding: "40px 32px",
            color: "#fff",
            marginBottom: "32px",
            boxShadow: "0 20px 40px -15px rgba(0,0,0,0.2)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: isRTL ? "auto" : "-50px",
              left: isRTL ? "-50px" : "auto",
              width: "250px",
              height: "250px",
              background:
                "radial-gradient(circle, rgba(37, 99, 235, 0.25), transparent 70%)",
              borderRadius: "50%",
            }}
          />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "650px" }}>
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
                backdropFilter: "blur(4px)",
              }}
            >
              <Wrench size={14} className="text-blue-400" />
              <span>
                {isRTL
                  ? "أدوات وتطبيقات ويب مجانية"
                  : "Free Web Utilities & Tools"}
              </span>
            </div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: 800,
                marginBottom: "12px",
                lineHeight: 1.2,
              }}
            >
              {isRTL
                ? "أدوات مجانية تساعدك على إنجاز أعمالك بسرعة"
                : "Free Online Tools to Get Things Done Faster"}
            </h1>
            <p style={{ fontSize: "15px", color: "#94a3b8", lineHeight: 1.6 }}>
              {isRTL
                ? "مجموعة من الأدوات المجانية لمعالجة الملفات، إنشاء الفواتير، رموز QR والحسابات اليومية. بدون تسجيل وبدون تعقيد."
                : "Free tools for PDF processing, images, calculators, business, Excel, developers and everyday productivity. No registration required."}
            </p>
          </div>
        </div>

        {/* Search & Categories Bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {/* Search Bar */}
          <div
            style={{
              position: "relative",
              maxWidth: "500px",
              width: "100%",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [isRTL ? "right" : "left"]: "16px",
                color: "var(--muted)",
              }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? "ابحث عن أداة..." : "Search tools..."}
              style={{
                width: "100%",
                padding: "12px 16px",
                paddingInlineStart: "44px",
                borderRadius: "12px",
                border: "1px solid var(--line, #e2e8f0)",
                background: "var(--card-bg, #ffffff)",
                color: "var(--text)",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Category Filter Link Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
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
        </div>

        {/* Tools Section Layout */}
        {selectedCategory === "all" && !searchQuery.trim() ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "48px" }}
          >
            {categories
              .filter((c) => c.id !== "all")
              .map((cat) => {
                const categoryTools = sourceTools.filter(
                  (tool: any) =>
                    tool.category === cat.id ||
                    (cat.id === "developers" &&
                      tool.category === "developer") ||
                    (cat.id === "calculators" &&
                      tool.category === "calculator"),
                );

                if (categoryTools.length === 0) return null;

                return (
                  <section key={cat.id}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                        borderBottom: "1px solid var(--line)",
                        paddingBottom: "12px",
                      }}
                    >
                      <h2
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "var(--text)",
                          margin: 0,
                        }}
                      >
                        {isRTL ? cat.label.ar : cat.label.en}
                      </h2>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "var(--muted)",
                        }}
                      >
                        {categoryTools.length} {isRTL ? "أداة" : "tools"}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "24px",
                      }}
                    >
                      {categoryTools.map((tool: any) => (
                        <ToolCard key={tool.slug} tool={tool} />
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        ) : filteredTools.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredTools.map((tool: any) => (
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
                ? "لم يتم العثور على أدوات تطابق بحثك."
                : "No tools found matching your search."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
