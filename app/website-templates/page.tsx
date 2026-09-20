"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Globe, Search, Filter } from "lucide-react";
import { getResources } from "@/lib/api";
import { templates } from "@/data/templates";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import ColumnSwitcher from "@/components/ColumnSwitcher";
import EmptyState from "@/components/EmptyState";
import { useCategoryPath } from "@/hooks/useCategoryPath";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function WebsiteTemplatesMarketplace() {
  const { isRTL } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [gridCols, setGridCols] = useState(3);
  const { category: pathCategory, hrefFor } =
    useCategoryPath("/website-templates");

  const subCategories = [
    { slug: "html-css", title: isRTL ? "فرونت إند (HTML/CSS)" : "HTML & CSS" },
    {
      slug: "wordpress",
      title: isRTL ? "قوالب ووردبريس" : "WordPress Templates",
    },
    {
      slug: "react-nextjs",
      title: isRTL ? "رياكت و نيكست جي اس" : "React & Next.js",
    },
    { slug: "tailwind-css", title: isRTL ? "تايلويند كلاسيك" : "Tailwind CSS" },
  ];

  useEffect(() => {
    // This marketplace filters client-side, so fetch the complete website
    // collection instead of Laravel's default 12-item page.
    getResources({ type: "website", per_page: 100 })
      .then((res) => {
        if (res?.data?.length > 0) setResources(res.data);
        else
          setResources(templates.filter((i) => i.resourceType === "website"));
      })
      .catch(() =>
        setResources(templates.filter((i) => i.resourceType === "website")),
      );
  }, []);

  useEffect(() => setSelectedSubCategory(pathCategory), [pathCategory]);

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const titleStr = (item.title || item.name || "").toLowerCase();
      const descStr = (
        item.description ||
        item.short_description ||
        ""
      ).toLowerCase();
      const catStr = (item.category?.slug || item.category || "").toLowerCase();

      const matchesSearch = !q || titleStr.includes(q) || descStr.includes(q);
      const matchesSubCat =
        selectedSubCategory === "all" ||
        catStr.includes(selectedSubCategory.toLowerCase());

      return matchesSearch && matchesSubCat;
    });
  }, [resources, searchQuery, selectedSubCategory]);

  return (
    <main className="container section" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs">
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <Link href="/templates">{isRTL ? "مركز القوالب" : "Templates"}</Link>
        　›　
        <b>{isRTL ? "سوق قوالب المواقع" : "Website Templates Marketplace"}</b>
      </div>

      <CategoryHeaderBanner
        title={
          isRTL ? "جميع قوالب وتصميمات المواقع" : "Website Templates Collection"
        }
        subtitle={
          isRTL
            ? "تصاميم وقوالب مواقع متجاوبة HTML5, WordPress, React, Next.js, و Tailwind."
            : "Modern, responsive HTML, WordPress, React, Next.js & Tailwind website themes."
        }
        type="website"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="marketplace-layout">
        <aside className="marketplace-sidebar">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontWeight: 800,
              fontSize: "16px",
              color: "var(--text)",
            }}
          >
            <Filter size={18} className="text-blue-500" />
            <span>{isRTL ? "تصفية حسب الأقسام" : "Filter Sub-Categories"}</span>
          </div>

          <div className="marketplace-subcats">
            <Link
              href={hrefFor("all")}
              style={{
                textAlign: isRTL ? "right" : "left",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: selectedSubCategory === "all" ? 700 : 500,
                background:
                  selectedSubCategory === "all"
                    ? "rgba(37, 99, 235, 0.1)"
                    : "transparent",
                color:
                  selectedSubCategory === "all" ? "#2563eb" : "var(--text)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isRTL ? "جميع قوالب المواقع" : "All Website Templates"}
            </Link>
            {subCategories.map((sub) => (
              <Link
                key={sub.slug}
                href={hrefFor(sub.slug)}
                style={{
                  textAlign: isRTL ? "right" : "left",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: selectedSubCategory === sub.slug ? 700 : 500,
                  background:
                    selectedSubCategory === sub.slug
                      ? "rgba(37, 99, 235, 0.1)"
                      : "transparent",
                  color:
                    selectedSubCategory === sub.slug
                      ? "#2563eb"
                      : "var(--text)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {sub.title}
              </Link>
            ))}
          </div>
        </aside>

        <div style={{ flex: 1, width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "var(--text)",
              }}
            >
              {isRTL ? "قوالب المواقع" : "Website Templates"} (
              {filteredResources.length})
            </h2>

            <ColumnSwitcher cols={gridCols} onChange={setGridCols} />
          </div>

          {filteredResources.length > 0 ? (
            <div className={`grid grid-cols-${gridCols}`}>
              {filteredResources.map((item) => (
                <TemplateCard key={item.id || item.slug} t={item} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>
  );
}
