"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Search,
  Filter,
  ArrowRight,
  Eye,
  FileDown,
  Star,
  CheckCircle,
} from "lucide-react";
import { getResources, normalizeTemplate } from "@/lib/api";
import { templates } from "@/data/templates";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import ColumnSwitcher from "@/components/ColumnSwitcher";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { useCategoryPath } from "@/hooks/useCategoryPath";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function ExcelMarketplace() {
  const { isRTL, t } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedCompatibility, setSelectedCompatibility] = useState("all");
  const { category: pathCategory, hrefFor } =
    useCategoryPath("/excel-templates");

  const [gridCols, setGridCols] = useState(3);
  const subCategories = [
    { slug: "accounting", title: isRTL ? "المحاسبة" : "Accounting" },
    {
      slug: "business-financial-planning",
      title: isRTL ? "التخطيط المالي للأعمال" : "Business Financial Planning",
    },
    { slug: "finance", title: isRTL ? "المالية والأعمال" : "Finance" },
    {
      slug: "human-resources",
      title: isRTL ? "الموارد البشرية" : "Human Resources",
    },
    { slug: "inventory", title: isRTL ? "إدارة المخزون" : "Inventory" },
    {
      slug: "personal-financial-planning",
      title: isRTL ? "التخطيط المالي الشخصي" : "Personal Financial Planning",
    },
    {
      slug: "project-management",
      title: isRTL ? "إدارة المشاريع" : "Project Management",
    },
    {
      slug: "social-media-marketing",
      title: isRTL ? "تسويق السوشيال ميديا" : "Social Media Marketing",
    },
    {
      slug: "sales-reporting",
      title: isRTL ? "تقارير وتحليل المبيعات" : "Sales Reporting",
    },
  ];

  useEffect(() => {
    getResources({ type: "excel", per_page: 500 })
      .then((res) => {
        if (res?.data?.length > 0) {
          setResources(
            res.data
              // Only show the curated Excel library. Older placeholder rows
              // have neither a real preview nor an Excel subcategory and
              // otherwise appear with the generic fallback artwork.
              .filter(
                (r: any) =>
                  Boolean(r.preview_image) &&
                  Boolean(r.subcategory?.slug || r.subcategory_slug),
              )
              .map((r: any) => normalizeTemplate(r, isRTL ? "ar" : "en")),
          );
        } else {
          setResources(
            templates.filter((item) => item.resourceType === "excel"),
          );
        }
      })
      .catch(() => {
        setResources(templates.filter((item) => item.resourceType === "excel"));
      });
  }, [isRTL]);

  useEffect(() => setSelectedSubCategory(pathCategory), [pathCategory]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = gridCols === 3 ? 21 : 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSubCategory, selectedPrice, selectedFormat]);

  const handleSubCategorySelect = (slug: string) => {
    setSelectedSubCategory(slug);
    window.history.pushState({}, "", hrefFor(slug));
  };

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
        .replace(/^excel-/, "");

      const matchesSearch = !q || titleStr.includes(q) || descStr.includes(q);

      const matchesSubCat =
        selectedSubCategory === "all" ||
        subcategorySlug === selectedSubCategory.toLowerCase();

      const matchesPrice =
        selectedPrice === "all" ||
        (selectedPrice === "free" &&
          (item.is_free || item.price === 0 || item.price === "Free"));

      return matchesSearch && matchesSubCat && matchesPrice;
    });
  }, [resources, searchQuery, selectedSubCategory, selectedPrice]);

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
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <Link href="/templates">{isRTL ? "مركز القوالب" : "Templates"}</Link>
        　›　
        <b>{isRTL ? "سوق قوالب إكسيل" : "Excel Templates Marketplace"}</b>
      </div>

      <CategoryHeaderBanner
        title={
          isRTL ? "جميع قوالب وتصميمات إكسيل" : "Excel Templates Collection"
        }
        subtitle={
          isRTL
            ? "استكشف أفضل قوالب وتصميمات الإكسيل الجاهزة للميزانيات، الفواتير، التحليلات، وإدارة المشاريع."
            : "Explore curated, battle-tested Excel templates for budgets, invoicing, financial analysis, HR, and project management."
        }
        type="excel"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Filterable Layout */}
      <div className="marketplace-layout">
        {/* Sub-Category & Filters Sidebar */}
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
            <Filter size={18} className="text-emerald-500" />
            <span>
              {isRTL ? "تصفية حسب الأقسام الفرعية" : "Filter Sub-Categories"}
            </span>
          </div>

          {/* Sub Categories Radio/List */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "12px",
                color: "var(--text)",
              }}
            >
              {isRTL ? "القسم الفرعي" : "Sub-Category"}
            </label>
            <div className="marketplace-subcats">
              <button
                type="button"
                onClick={() => handleSubCategorySelect("all")}
                style={{
                  textAlign: isRTL ? "right" : "left",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: selectedSubCategory === "all" ? 700 : 500,
                  background:
                    selectedSubCategory === "all"
                      ? "rgba(16, 185, 129, 0.1)"
                      : "transparent",
                  color:
                    selectedSubCategory === "all" ? "#10b981" : "var(--text)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {isRTL ? "جميع قوالب إكسيل" : "All Excel Templates"}
              </button>
              {subCategories.map((sub) => (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => handleSubCategorySelect(sub.slug)}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: selectedSubCategory === sub.slug ? 700 : 500,
                    background:
                      selectedSubCategory === sub.slug
                        ? "rgba(16, 185, 129, 0.1)"
                        : "transparent",
                    color:
                      selectedSubCategory === sub.slug
                        ? "#10b981"
                        : "var(--text)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {sub.title}
                </button>
              ))}
            </div>
          </div>

          {/* Formats Filter */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 700,
                marginBottom: "10px",
                color: "var(--text)",
              }}
            >
              {isRTL ? "صيغة الملف" : "Format"}
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "var(--bg)",
                color: "var(--text)",
                fontSize: "13px",
              }}
            >
              <option value="all">
                {isRTL ? "جميع الصيغ (XLSX, XLS, PDF)" : "All Formats"}
              </option>
              <option value="xlsx">XLSX</option>
              <option value="xls">XLS</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </aside>

        {/* Templates Display Grid */}
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
              {isRTL ? "قوالب إكسيل" : "Excel Templates"} (
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
