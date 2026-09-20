"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { templates } from "@/data/templates";
import { getResources } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";
import CategoryHeaderBanner from "@/components/CategoryHeaderBanner";

export default function GraphicAssetsMarketplace() {
  const { isRTL } = useLanguage();
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    getResources({ type: "graphic-assets" })
      .then((res) => {
        if (res?.data?.length > 0) setResources(res.data);
        else
          setResources(
            templates.filter(
              (i) =>
                i.resourceType?.toLowerCase().includes("graphic") ||
                i.category?.toLowerCase().includes("graphic"),
            ),
          );
      })
      .catch(() =>
        setResources(
          templates.filter(
            (i) =>
              i.resourceType?.toLowerCase().includes("graphic") ||
              i.category?.toLowerCase().includes("graphic"),
          ),
        ),
      );
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

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
        <b>{isRTL ? "سوق عناصر الجرافيك" : "Graphic Assets Marketplace"}</b>
      </div>

      <CategoryHeaderBanner
        title={
          isRTL ? "جميع عناصر الجرافيك والفيكتور" : "Graphic Assets Collection"
        }
        subtitle={
          isRTL
            ? "أيقونات، رسومات فيكتور، وخلفيات عالية الجودة للمصممين والمطورين."
            : "Vector graphics, illustrations, icon packs, and textures."
        }
        type="design"
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
