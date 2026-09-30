"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import ColumnSwitcher from "@/components/ColumnSwitcher";
import Pagination from "@/components/Pagination";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export type Facet = { slug: string; label: string; labelAr: string; count: number };

export type MarketplaceListingProps = {
  basePath: string;
  bannerTitle: string;
  bannerTitleAr: string;
  bannerSubtitle: string;
  bannerSubtitleAr: string;
  sectionLabel: string;
  sectionLabelAr: string;
  theme: "excel" | "word" | "design" | "canva" | "presentation" | "website" | "default";
  accent: string;
  hubLabel: string;
  hubLabelAr: string;
  /** Rows fetched on the server, already normalized. */
  initialResources: any[];
  /** Total published rows for this collection, counted in the database. */
  totalCount: number;
  /** True when the server could not reach the catalogue API. */
  unavailable?: boolean;
  /** Sub-category facets with real counts. */
  facets: Facet[];
  /** Facet that should already be selected when the page loads (from the URL). */
  initialFacet?: string | null;
  /** Which column holds the facet values in the sidebar list. */
  facetKey: "subcategory" | "category";
  showFormatFilter?: boolean;
};

/**
 * Client shell for a collection page.
 *
 * All catalogue data and every number shown here arrive as props rendered on
 * the server, so the crawler's first HTML already contains the real template
 * titles, the real collection total and the real facet counts. The client only
 * adds search, format filtering, grid density and pagination on top.
 */
export default function MarketplaceListing({
  basePath,
  bannerTitle,
  bannerTitleAr,
  bannerSubtitle,
  bannerSubtitleAr,
  sectionLabel,
  sectionLabelAr,
  theme,
  accent,
  hubLabel,
  hubLabelAr,
  initialResources,
  totalCount,
  unavailable,
  facets,
  initialFacet = null,
  facetKey,
  showFormatFilter = true,
}: MarketplaceListingProps) {
  const { isRTL } = useLanguage();
  const [resources] = useState<any[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFacet, setActiveFacet] = useState<string | null>(initialFacet);
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [gridCols, setGridCols] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = gridCols === 3 ? 21 : 20;

  const facetValue = (item: any) =>
    facetKey === "subcategory"
      ? String(item.subcategory_slug || "")
      : String(item.category_slug || "");

  const filteredResources = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const needle = activeFacet ? activeFacet.toLowerCase() : null;

    return resources.filter((item) => {
      const titleStr = String(item.title || item.name || "").toLowerCase();
      const descStr = String(
        item.short_description || item.description || "",
      ).toLowerCase();
      const matchesSearch = !q || titleStr.includes(q) || descStr.includes(q);

      const value = facetValue(item).toLowerCase();
      // Sub-category slugs are namespaced per collection (excel-*, word-*).
      const matchesFacet =
        !needle || value === needle || value.replace(/^[a-z]+-/, "") === needle;

      const formats: string[] = Array.isArray(item.formats)
        ? item.formats.map((f: string) => String(f).toLowerCase())
        : [];
      const matchesFormat =
        selectedFormat === "all" || formats.includes(selectedFormat);

      return matchesSearch && matchesFacet && matchesFormat;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources, searchQuery, activeFacet, selectedFormat]);

  const totalPages = Math.max(1, Math.ceil(filteredResources.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, safePage, itemsPerPage]);

  const goToFacet = (slug: string | null) => {
    setActiveFacet(slug);
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      const url = slug ? `${basePath}/${encodeURIComponent(slug)}` : basePath;
      window.history.pushState({}, "", url);
      window.scrollTo({ top: 260, behavior: "smooth" });
    }
  };

  const heading = isRTL ? sectionLabelAr : sectionLabel;

  return (
    <main className="container section" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs">
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <Link href="/templates">{isRTL ? hubLabelAr : hubLabel}</Link>　›
        <b>{isRTL ? bannerTitleAr : bannerTitle}</b>
      </div>

      <CategoryHeaderBanner
        title={isRTL ? bannerTitleAr : bannerTitle}
        subtitle={isRTL ? bannerSubtitleAr : bannerSubtitle}
        type={theme}
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setCurrentPage(1);
        }}
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
            <Filter size={18} style={{ color: accent }} />
            <span>{isRTL ? "تصفية حسب الأقسام الفرعية" : "Filter Sub-Categories"}</span>
          </div>

          <div>
            <label
              htmlFor={`${basePath}-facet`}
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
            <div
              id={`${basePath}-facet`}
              className="marketplace-subcats"
              role="group"
              aria-label={isRTL ? "أقسام فرعية" : "Sub-categories"}
            >
              <FacetButton
                active={activeFacet === null}
                onClick={() => goToFacet(null)}
                accent={accent}
                align={isRTL ? "right" : "left"}
                label={`${isRTL ? "كل" : "All"} ${heading}`}
                count={totalCount}
              />
              {facets.map((f) => (
                <FacetButton
                  key={f.slug}
                  active={activeFacet === f.slug}
                  onClick={() => goToFacet(f.slug)}
                  accent={accent}
                  align={isRTL ? "right" : "left"}
                  label={isRTL ? f.labelAr || f.label : f.label}
                  count={f.count}
                />
              ))}
            </div>
          </div>

          {showFormatFilter && (
            <div>
              <label
                htmlFor={`${basePath}-format`}
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
                id={`${basePath}-format`}
                value={selectedFormat}
                onChange={(e) => {
                  setSelectedFormat(e.target.value);
                  setCurrentPage(1);
                }}
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
                <option value="all">{isRTL ? "جميع الصيغ" : "All Formats"}</option>
                <option value="xlsx">XLSX</option>
                <option value="xls">XLS</option>
                <option value="docx">DOCX</option>
                <option value="pdf">PDF</option>
                <option value="pptx">PPTX</option>
                <option value="zip">ZIP</option>
                <option value="png">PNG</option>
                <option value="jpg">JPG</option>
              </select>
            </div>
          )}
        </aside>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--text)" }}>
              {heading} ({filteredResources.length})
            </h2>
            <ColumnSwitcher cols={gridCols} onChange={setGridCols} />
          </div>

          {filteredResources.length > 0 ? (
            <>
              <div
                className={`grid grid-cols-${gridCols}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                  gap: "22px",
                }}
              >
                {paginated.map((item) => (
                  <TemplateCard key={item.id || item.slug} t={item} />
                ))}
              </div>
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }
                }}
              />
            </>
          ) : (
            <div
              style={{
                padding: "56px 24px",
                borderRadius: "18px",
                border: "1px dashed var(--line, #e2e8f0)",
                background: "var(--card-bg, #ffffff)",
                textAlign: "center",
              }}
            >
              <Search size={30} style={{ color: accent }} />
              <h3 style={{ fontSize: "19px", fontWeight: 800, margin: "12px 0 8px" }}>
                {unavailable
                  ? isRTL
                    ? "تعذر تحميل الفهرس الآن"
                    : "The catalogue index is temporarily unavailable"
                  : searchQuery || activeFacet
                    ? isRTL
                      ? "لا توجد نتائج مطابقة"
                      : "No templates match this filter"
                    : isRTL
                      ? "لا توجد قوالب منشورة في هذا القسم"
                      : "No published templates in this collection yet"}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "13px", maxWidth: "520px", margin: "0 auto 18px" }}>
                {unavailable
                  ? isRTL
                    ? "يرجى المحاولة بعد قليل."
                    : "Please try again in a few minutes."
                  : isRTL
                    ? "جرّب كلمة بحث أخرى أو أزل عوامل التصفية."
                    : "Try a different search term or clear the filters."}
              </p>
              <Link className="smallprimary" href="/templates">
                {isRTL ? "تصفح كل الأقسام" : "Browse all collections"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function FacetButton({
  active,
  onClick,
  accent,
  align,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  accent: string;
  align: "left" | "right";
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "8px",
        textAlign: align,
        padding: "8px 12px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: active ? 700 : 500,
        background: active ? `${accent}1a` : "transparent",
        color: active ? accent : "var(--text)",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: "11px", opacity: 0.75 }}>{count}</span>
    </button>
  );
}
