"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Presentation, Search, Filter } from "lucide-react";
import { getResources, normalizeTemplate } from "@/lib/api";
import { templates } from "@/data/templates";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import ColumnSwitcher from "@/components/ColumnSwitcher";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { useCategoryPath } from "@/hooks/useCategoryPath";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function PresentationMarketplace() {
  const { isRTL } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [gridCols, setGridCols] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const { category: pathCategory, hrefFor } = useCategoryPath(
    "/presentation-templates",
  );

  const itemsPerPage = gridCols === 3 ? 21 : 20;

  const subCategories = [
    {
      slug: "social-media-marketing",
      title: isRTL ? "تسويق السوشيال ميديا" : "Social Media Marketing",
    },
  ];

  useEffect(() => {
    getResources({ type: "presentation", per_page: 500 })
      .then((res) => {
        if (res?.data?.length > 0) {
          setResources(
            res.data.map((r: any) => normalizeTemplate(r, isRTL ? "ar" : "en")),
          );
        } else {
          setResources(
            templates.filter((i) => i.resourceType === "presentation"),
          );
        }
      })
      .catch(() =>
        setResources(
          templates.filter((i) => i.resourceType === "presentation"),
        ),
      );
  }, [isRTL]);

  useEffect(() => setSelectedSubCategory(pathCategory), [pathCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubCategory, gridCols]);

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const titleStr = (item.title || item.name || "").toLowerCase();
      const descStr = (
        item.description ||
        item.short_description ||
        ""
      ).toLowerCase();
      const subcategorySlug = String(item.subcategory_slug || "")
        .toLowerCase()
        .replace(/^presentation-/, "");

      const matchesSearch = !q || titleStr.includes(q) || descStr.includes(q);
      const matchesSubCat =
        selectedSubCategory === "all" ||
        subcategorySlug === selectedSubCategory.toLowerCase();

      return matchesSearch && matchesSubCat;
    });
  }, [resources, searchQuery, selectedSubCategory]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <main className="container section" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs">
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <Link href="/templates">{isRTL ? "مركز القوالب" : "Templates"}</Link>
        　›　
        <b>
          {isRTL
            ? "سوق العروض التقديمية"
            : "Presentation Templates Marketplace"}
        </b>
      </div>

      <CategoryHeaderBanner
        title={
          isRTL
            ? "جميع قوالب وتصميمات العروض التقديمية"
            : "Presentation Templates Collection"
        }
        subtitle={
          isRTL
            ? "شرائح وقوالب بوربوينت، وجوجل سلايدز، وكينوت للشركات الناشئة والمؤتمرات."
            : "PowerPoint decks, Google Slides & Keynote presentations for business & startups."
        }
        type="presentation"
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
            <Filter size={18} className="text-purple-500" />
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
                    ? "rgba(168, 85, 247, 0.1)"
                    : "transparent",
                color:
                  selectedSubCategory === "all" ? "#a855f7" : "var(--text)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isRTL ? "جميع العروض التقديمية" : "All Presentations"}
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
                      ? "rgba(168, 85, 247, 0.1)"
                      : "transparent",
                  color:
                    selectedSubCategory === sub.slug
                      ? "#a855f7"
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

        <div style={{ flex: 1 }}>
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
              {isRTL ? "العروض التقديمية" : "Presentation Templates"} (
              {filteredResources.length})
            </h2>

            <ColumnSwitcher cols={gridCols} onChange={setGridCols} />
          </div>

          {filteredResources.length > 0 ? (
            <>
              <div className={`grid grid-cols-${gridCols}`}>
                {paginatedResources.map((item) => (
                  <TemplateCard key={item.id || item.slug} t={item} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </main>
  );
}
