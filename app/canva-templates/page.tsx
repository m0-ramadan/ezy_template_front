"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { templates } from "@/data/templates";
import { getResources, normalizeTemplate } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import ColumnSwitcher from "@/components/ColumnSwitcher";
import Pagination from "@/components/Pagination";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function CanvaMarketplace() {
  const { isRTL } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    getResources({ type: "canva", per_page: 500 })
      .then((res) => {
        if (res?.data?.length > 0) {
          setResources(
            res.data.map((r: any) => normalizeTemplate(r, isRTL ? "ar" : "en")),
          );
        } else {
          setResources(
            templates.filter(
              (i) =>
                i.resourceType?.toLowerCase().includes("canva") ||
                i.category?.toLowerCase().includes("canva"),
            ),
          );
        }
      })
      .catch(() =>
        setResources(
          templates.filter(
            (i) =>
              i.resourceType?.toLowerCase().includes("canva") ||
              i.category?.toLowerCase().includes("canva"),
          ),
        ),
      );
  }, [isRTL]);

  const [gridCols, setGridCols] = useState(3);
  const itemsPerPage = gridCols === 3 ? 21 : 20;

  const [searchQuery, setSearchQuery] = useState("");

  const list = resources.length > 0 ? resources : templates.slice(0, 6);

  const filteredList = useMemo(() => {
    return list.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const titleStr = (item.title || item.name || "").toLowerCase();
      const descStr = (
        item.description ||
        item.short_description ||
        ""
      ).toLowerCase();
      return !q || titleStr.includes(q) || descStr.includes(q);
    });
  }, [list, searchQuery]);

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage, itemsPerPage]);

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
        <b>{isRTL ? "سوق قوالب كانفا" : "Canva Templates Marketplace"}</b>
      </div>

      <CategoryHeaderBanner
        title={
          isRTL ? "جميع قوالب وتصميمات كانفا" : "Canva Templates Collection"
        }
        subtitle={
          isRTL
            ? "قوالب تصميم مباشرة قابلة للتعديل بضغطة زر على منصة Canva للسوشيال ميديا، العروض، والهويات."
            : "Directly editable Canva social posts, presentations, and branding graphics."
        }
        type="canva"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

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
          {isRTL ? "قوالب كانفا" : "Canva Templates"} ({filteredList.length})
        </h2>

        <ColumnSwitcher cols={gridCols} onChange={setGridCols} />
      </div>

      <div className={`grid grid-cols-${gridCols}`}>
        {paginatedList.map((item) => (
          <TemplateCard key={item.slug || item.id} t={item} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  );
}
