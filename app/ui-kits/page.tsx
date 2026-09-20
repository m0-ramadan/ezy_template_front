"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { templates } from "@/data/templates";
import { getResources } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function UiKitsMarketplace() {
  const { isRTL } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getResources({ type: "ui-kits" })
      .then((res) => {
        if (res?.data?.length > 0) setResources(res.data);
        else
          setResources(
            templates.filter(
              (i) =>
                i.resourceType?.toLowerCase().includes("ui") ||
                i.category?.toLowerCase().includes("ui"),
            ),
          );
      })
      .catch(() =>
        setResources(
          templates.filter(
            (i) =>
              i.resourceType?.toLowerCase().includes("ui") ||
              i.category?.toLowerCase().includes("ui"),
          ),
        ),
      );
  }, []);

  const list = resources.length > 0 ? resources : templates.slice(0, 6);
  const filteredList = list.filter((item) => {
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
    <main className="container section" style={{ paddingBottom: "80px" }}>
      <div className="breadcrumbs">
        <Link href="/">{isRTL ? "الرئيسية" : "Home"}</Link>　›　
        <Link href="/templates">{isRTL ? "مركز القوالب" : "Templates"}</Link>
        　›　
        <b>{isRTL ? "سوق واجهات المستخدم" : "UI Kits Marketplace"}</b>
      </div>

      <CategoryHeaderBanner
        title={
          isRTL ? "جميع واجهات وحزم المستخدم (UI Kits)" : "UI Kits Collection"
        }
        subtitle={
          isRTL
            ? "مكتبات مكونات وأنظمة تصميم كاملة لتطبيقات الجوال والمواقع."
            : "Full web & mobile UI kit design systems for Figma and Adobe XD."
        }
        type="website"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="grid">
        {filteredList.map((item) => (
          <TemplateCard key={item.slug || item.id} t={item} />
        ))}
      </div>
    </main>
  );
}
