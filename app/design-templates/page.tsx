"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Palette, Search, Filter } from "lucide-react";
import { getResources, normalizeTemplate } from "@/lib/api";
import { templates } from "@/data/templates";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import ColumnSwitcher from "@/components/ColumnSwitcher";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import { useCategoryPath } from "@/hooks/useCategoryPath";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function DesignMarketplace() {
  const { isRTL } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [gridCols, setGridCols] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const { category: pathCategory, hrefFor } =
    useCategoryPath("/design-templates");

  const itemsPerPage = gridCols === 3 ? 21 : 20;

  const designCategories = [
    ["business-cards", "Business Cards", "كروت الأعمال"],
    ["certificates-awards", "Certificates & Awards", "الشهادات والدروع"],
    ["corporate-identity", "Corporate Identity", "الهوية المؤسسية"],
    ["events-invitations", "Events & Invitations", "المناسبات والدعوات"],
    ["restaurant-menus", "Restaurant Menus", "منيوات المطاعم"],
    ["wall-art-posters", "Wall Art & Posters", "التابلوهات والملصقات"],
    ["food-restaurant", "Food & Restaurant", "الطعام والمطاعم"],
    ["beauty-wellness", "Beauty & Wellness", "الجمال والعناية"],
    ["healthcare-medical", "Healthcare & Medical", "الصحة والطب"],
    ["fashion-retail", "Fashion & Retail", "الأزياء والتجزئة"],
    ["technology-digital", "Technology & Digital", "التقنية والرقميات"],
    [
      "real-estate-architecture",
      "Real Estate & Architecture",
      "العقارات والعمارة",
    ],
    [
      "business-professional",
      "Business & Professional",
      "الأعمال والخدمات المهنية",
    ],
    ["legal-finance", "Legal & Finance", "القانون والمال"],
    ["education", "Education", "التعليم"],
    ["sports-fitness", "Sports & Fitness", "الرياضة واللياقة"],
    ["events-holidays", "Events & Holidays", "المناسبات والأعياد"],
    ["creative-design", "Creative & Design", "الإبداع والتصميم"],
    ["home-services", "Home & Services", "المنزل والخدمات"],
    ["religion-spirituality", "Religion & Spirituality", "الدين والروحانيات"],
    ["automotive", "Automotive", "السيارات"],
    ["travel-tourism", "Travel & Tourism", "السفر والسياحة"],
    ["books-publishing", "Books & Publishing", "الكتب والنشر"],
  ];
  const subCategories = designCategories.map(([slug, en, ar]) => ({
    slug,
    title: isRTL ? ar : en,
  }));

  useEffect(() => {
    getResources({ type: "design", per_page: 500 })
      .then((res) => {
        if (res?.data?.length > 0) {
          setResources(
            res.data.map((r: any) => normalizeTemplate(r, isRTL ? "ar" : "en")),
          );
        } else {
          setResources(templates.filter((i) => i.resourceType === "design"));
        }
      })
      .catch(() =>
        setResources(templates.filter((i) => i.resourceType === "design")),
      );
  }, [isRTL]);

  useEffect(() => setSelectedSubCategory(pathCategory), [pathCategory]);

  // Reset to page 1 whenever filters change
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
      const subcategorySlug = String(item.subcategory_slug || "").toLowerCase();

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
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <main className="container section" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs">
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <Link href="/templates">{isRTL ? "مركز القوالب" : "Templates"}</Link>
        　›　
        <b>{isRTL ? "سوق قوالب التصميم" : "Design Templates Marketplace"}</b>
      </div>

      <CategoryHeaderBanner
        title={
          isRTL ? "جميع قوالب وتصاميم الجرافيك" : "Design Templates Collection"
        }
        subtitle={
          isRTL
            ? "تصاميم كانفا، بوستات سوشيال ميديا، شعارات، وهويات بصرية متكاملة."
            : "Canva templates, social media posts, logos, and visual identity designs."
        }
        type="design"
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
            <Filter size={18} className="text-pink-500" />
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
                    ? "rgba(236, 72, 153, 0.1)"
                    : "transparent",
                color:
                  selectedSubCategory === "all" ? "#ec4899" : "var(--text)",
                border: "none",
                cursor: "pointer",
              }}
            >
              {isRTL ? "جميع قوالب التصميم" : "All Design Templates"}
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
                      ? "rgba(236, 72, 153, 0.1)"
                      : "transparent",
                  color:
                    selectedSubCategory === sub.slug
                      ? "#ec4899"
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
              {isRTL ? "قوالب التصميم" : "Design Templates"} (
              {filteredResources.length})
            </h2>

            <ColumnSwitcher cols={gridCols} onChange={setGridCols} />
          </div>

          {paginatedResources.length > 0 ? (
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
            <EmptyState
              title={
                isRTL
                  ? "لا تتوفر تصاميم وقوالب جرافيك حالياً"
                  : "No Design Templates Currently Available"
              }
              description={
                isRTL
                  ? "جاري العمل على إضافة قوالب وتصاميم كانفا وجرافيك جديدة قريباً جداً."
                  : "New Canva & graphic design templates will be published here soon."
              }
              actionHref="/templates"
              actionLabel={
                isRTL ? "تصفح كافة الأقسام" : "Browse All Marketplaces"
              }
            />
          )}
        </div>
      </div>
    </main>
  );
}
