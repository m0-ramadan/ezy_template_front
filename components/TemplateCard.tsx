"use client";

import Link from "next/link";
import { Download, Star, Eye, FileDown, Heart, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { getAssetUrl } from "@/lib/api";

export default function TemplateCard({
  t,
  buttons = true,
}: {
  t: any;
  buttons?: boolean;
}) {
  const { t: tr, isRTL } = useLanguage();
  const [isFav, setIsFav] = useState(false);

  if (!t) return null;
  const formats = Array.isArray(t.formats) ? t.formats : ["HTML", "ZIP"];
  const qualities = Array.isArray(t.qualities)
    ? t.qualities
    : ["Standard", "HD"];
  const slug = t.slug || t.id || "template";
  const rawPreviewUrl =
    t.demo_url || t.preview_url || t.demoUrl || t.previewUrl || null;
  const previewUrl = rawPreviewUrl ? getAssetUrl(rawPreviewUrl) : null;
  const resourceKind = String(
    t.resource_type_raw || t.resource_type || t.resourceType || "",
  ).toLowerCase();
  const isWebsite =
    resourceKind === "website" ||
    resourceKind.includes("website") ||
    resourceKind.includes("موقع");
  const imageUrl = getAssetUrl(
    t.preview_image || t.previewImage || t.image || "/assets/travelix-card.png",
  );

  useEffect(() => {
    const checkFav = () => {
      if (typeof window !== "undefined") {
        try {
          const favs = JSON.parse(
            localStorage.getItem("ezy_favorites") || "[]",
          );
          setIsFav(Array.isArray(favs) && favs.includes(String(slug)));
        } catch {
          setIsFav(false);
        }
      }
    };
    checkFav();
    window.addEventListener("ezy_favorites_change", checkFav);
    return () => {
      window.removeEventListener("ezy_favorites_change", checkFav);
    };
  }, [slug]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      try {
        let favs: string[] = JSON.parse(
          localStorage.getItem("ezy_favorites") || "[]",
        );
        if (!Array.isArray(favs)) favs = [];
        const slugStr = String(slug);
        if (favs.includes(slugStr)) {
          favs = favs.filter((item) => item !== slugStr);
          setIsFav(false);
        } else {
          favs.push(slugStr);
          setIsFav(true);
        }
        localStorage.setItem("ezy_favorites", JSON.stringify(favs));
        window.dispatchEvent(new Event("ezy_favorites_change"));
      } catch (err) {
        console.error("Failed to update favorites:", err);
      }
    }
  };

  const getResourceTypeLabel = (type: string) => {
    if (!type) return tr("website_template");
    const lower = type.toLowerCase();
    if (lower.includes("excel")) return tr("excel_template");
    if (lower.includes("word")) return tr("word_template");
    if (lower.includes("design")) return tr("design");
    if (lower.includes("presentation")) return tr("presentation");
    if (
      lower.includes("web") ||
      lower.includes("html") ||
      lower.includes("site")
    )
      return tr("website_template");
    return type;
  };

  const displayName = isRTL
    ? t.name_ar || t.title_ar || t.name || t.title || "قالب"
    : t.name_en || t.name || t.title || "Template";
  const rawCategory =
    typeof t.category === "object" && t.category !== null
      ? isRTL
        ? t.category.name_ar || t.category.name || t.category.slug
        : t.category.name || t.category.slug
      : t.category;

  const displayCategory = isRTL
    ? t.subcategory?.name_ar || t.category_ar || rawCategory || "قوالب"
    : t.subcategory?.name || rawCategory || "Templates";

  const getQualityLabel = (q: string) => {
    if (!isRTL) return q;
    const lower = q.toLowerCase();
    if (lower.includes("print")) return "جاهز للطباعة";
    if (lower.includes("standard")) return "قياسي";
    if (lower.includes("hd")) return "عالي الدقة";
    if (lower.includes("web")) return "ويب";
    return q;
  };

  const displayQualities = qualities.map(getQualityLabel);

  return (
    <article className="card">
      <div className="thumb" style={{ position: "relative" }}>
        <Link href={`/templates/${slug}`}>
          <img
            src={imageUrl}
            alt={displayName}
            style={{
              objectFit: t.resource_type_raw === "design" ? "contain" : "cover",
            }}
            onError={(e: any) => {
              e.currentTarget.src = "/assets/travelix-card.png";
            }}
          />
        </Link>

        {/* Top Floating Favorite Button */}
        <button
          type="button"
          className={`fav-btn ${isFav ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          title={
            isFav
              ? isRTL
                ? "إزالة من المفضلة"
                : "Remove from favorites"
              : isRTL
                ? "إضافة للمفضلة"
                : "Add to favorites"
          }
        >
          <Heart
            size={16}
            fill={isFav ? "#ef4444" : "none"}
            color={isFav ? "#ef4444" : "currentColor"}
          />
        </button>

        {/* Top Right Featured Badge */}
        {t.featured && <span className="featured">{tr("featured")}</span>}
        {(t.price === "Premium" || t.is_free === false) && (
          <span className="premium">{tr("premium")}</span>
        )}
      </div>

      <div className="cardbody">
        <div className="resource-label">
          {getResourceTypeLabel(
            t.resource_type || t.resourceType || displayCategory,
          )}
        </div>

        <Link href={`/templates/${slug}`}>
          <h3 className="card-title-heading">{displayName}</h3>
        </Link>

        <div className="sub-category-title">{displayCategory}</div>

        <div className="tags mini card-meta-row">
          <div className="format-tags">
            {isWebsite ? (
              <span>{t.tech_stack || t.tech || "HTML & CSS"}</span>
            ) : (
              formats.slice(0, 3).map((x: string) => <span key={x}>{x}</span>)
            )}
          </div>
          <span
            className="views-badge"
            title={
              isRTL ? "عدد مشاهدات وتفاعلات القالب" : "Template views count"
            }
          >
            <Eye size={13} />
            <span>
              {t.views_count !== undefined && t.views_count !== null
                ? Number(t.views_count).toLocaleString()
                : t.view_count !== undefined && t.view_count !== null
                  ? Number(t.view_count).toLocaleString()
                  : t.views !== undefined &&
                      t.views !== null &&
                      !isNaN(Number(t.views))
                    ? Number(t.views).toLocaleString()
                    : "0"}
            </span>
          </span>
        </div>

        <div className="quality-line">
          <span>
            <FileDown size={13} /> {displayQualities.join(" · ")}
          </span>
          <span className="file-size-badge">
            {t.files && t.files.length > 0 && t.files[0].size_human
              ? t.files[0].size_human
              : t.size || "1.2 MB"}
          </span>
        </div>

        <div className="stats">
          <span className="downloads-stat">
            <Download size={13} />
            <span>
              {t.downloads_count !== undefined && t.downloads_count !== null
                ? Number(t.downloads_count).toLocaleString()
                : t.downloads !== undefined &&
                    t.downloads !== null &&
                    !isNaN(Number(t.downloads))
                  ? Number(t.downloads).toLocaleString()
                  : "0"}
            </span>
          </span>
          <span className="stars">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>5.0</span>
          </span>
          <span
            className={
              t.price === "Premium" || t.is_free === false
                ? "premium-badge"
                : "free"
            }
          >
            {t.price === "Premium" || t.is_free === false
              ? tr("premium")
              : tr("free")}
          </span>
        </div>

        {buttons && (
          <div className="buttons">
            {isWebsite && previewUrl ? (
              <Link
                className="outline preview-btn"
                href={`/preview?template=${slug}`}
                target="_blank"
                title={
                  isRTL ? "معاينة القالب تفاعلياً" : "Live Interactive Preview"
                }
              >
                <Eye size={14} />
                <span>{isRTL ? "معاينة" : "Preview"}</span>
              </Link>
            ) : isWebsite ? (
              <span
                className="outline preview-btn preview-disabled"
                title={
                  isRTL
                    ? "المعاينة غير متاحة لهذا القالب"
                    : "Preview not available for this resource"
                }
              >
                <Eye size={14} />
                <span>{isRTL ? "معاينة" : "Preview"}</span>
              </span>
            ) : null}
            <Link
              className="smallprimary details-btn"
              href={`/templates/${slug}`}
            >
              <span>{isRTL ? "عرض التفاصيل" : "View Details"}</span>
              <ArrowRight
                size={14}
                style={{
                  transform: isRTL ? "rotate(180deg)" : "none",
                }}
              />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
