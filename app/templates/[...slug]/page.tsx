"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { getResources } from "@/lib/api";
import { templates } from "@/data/templates";
import TemplateCard from "@/components/TemplateCard";
import EmptyState from "@/components/EmptyState";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";
import { useLanguage } from "@/context/LanguageContext";

export default function DynamicCategoryPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = use(params);
  const { isRTL, t } = useLanguage();
  const [items, setItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const primaryCategory = slug[0];
  const subCategory = slug[1];

  useEffect(() => {
    getResources({ category: primaryCategory })
      .then((data) => {
        if (data?.data?.length > 0) {
          setItems(data.data);
        } else {
          setItems(
            templates.filter(
              (tmpl) =>
                tmpl.category
                  .toLowerCase()
                  .includes(primaryCategory.toLowerCase()) ||
                tmpl.resourceType?.toLowerCase() ===
                  primaryCategory.toLowerCase(),
            ),
          );
        }
      })
      .catch(() => {
        setItems(
          templates.filter(
            (tmpl) =>
              tmpl.category
                .toLowerCase()
                .includes(primaryCategory.toLowerCase()) ||
              tmpl.resourceType?.toLowerCase() ===
                primaryCategory.toLowerCase(),
          ),
        );
      });
  }, [primaryCategory]);

  const displayTitle = `${primaryCategory.replace(/-/g, " ")}${subCategory ? ` — ${subCategory.replace(/-/g, " ")}` : ""}`;

  const categoryType = primaryCategory.includes("word")
    ? "word"
    : primaryCategory.includes("excel")
      ? "excel"
      : primaryCategory.includes("canva")
        ? "canva"
        : primaryCategory.includes("presentation")
          ? "presentation"
          : primaryCategory.includes("web")
            ? "website"
            : primaryCategory.includes("design")
              ? "design"
              : "default";

  const filteredItems = items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    const titleStr = (item.title || item.name || "").toLowerCase();
    const descStr = (
      item.description ||
      item.short_description ||
      ""
    ).toLowerCase();
    return !q || titleStr.includes(q) || descStr.includes(q);
  });

  return (
    <main className="container section">
      <div className="breadcrumbs">
        <Link href="/">{t("home")}</Link>　›　
        <Link href="/templates">{t("templates")}</Link>　›{" "}
        <b style={{ textTransform: "capitalize" }}>
          {primaryCategory.replace("-", " ")}
        </b>
        {subCategory && (
          <span>
            　›　
            <b style={{ textTransform: "capitalize" }}>
              {subCategory.replace("-", " ")}
            </b>
          </span>
        )}
      </div>

      <CategoryHeaderBanner
        title={displayTitle}
        subtitle={
          isRTL
            ? `استعرض جميع القوالب والموارد الجاهزة المتاحة لقسم ${primaryCategory.replace(/-/g, " ")}.`
            : `Browse all available templates and digital assets for ${primaryCategory.replace(/-/g, " ")}.`
        }
        type={categoryType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filteredItems.length > 0 ? (
        <div className="grid">
          {filteredItems.map((tmpl) => (
            <TemplateCard key={tmpl.id || tmpl.slug} t={tmpl} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}
