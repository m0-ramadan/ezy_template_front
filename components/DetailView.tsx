"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Heart,
  ExternalLink,
  CheckCircle,
  Info,
  Folder,
  Calendar,
  FileCode2,
  Tag,
} from "lucide-react";
import TemplateGallery from "@/components/TemplateGallery";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetUrl } from "@/lib/api";

export default function DetailView({
  t,
  relatedList,
  mainDetailImage,
  galleryScreenshots,
  displayFeatures,
}: {
  t: any;
  relatedList: any[];
  mainDetailImage: string;
  galleryScreenshots: string[];
  displayFeatures: string[];
}) {
  const { t: tr, isRTL } = useLanguage();

  const displayName = isRTL
    ? t.name_ar || t.title_ar || t.name || t.title || "قالب"
    : t.name_en || t.name || t.title || "Template";
  const displayCategory = isRTL
    ? t.category_ar || t.category || "قوالب"
    : t.category || "Templates";
  const displayDescription = isRTL
    ? t.description_ar || t.description
    : t.description || t.description_ar;
  const displayTech = isRTL
    ? t.tech_stack_ar || t.tech_stack || t.tech
    : t.tech_stack || t.tech || t.tech_stack_ar;
  const activeFeatures = isRTL
    ? t.features_ar?.length
      ? t.features_ar
      : displayFeatures
    : t.features_en?.length
      ? t.features_en
      : displayFeatures;

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: "overview", label: isRTL ? "نظرة عامة" : "Overview" },
    { id: "features", label: isRTL ? "المميزات" : "Features" },
    { id: "tech", label: isRTL ? "التقنيات" : "Technologies" },
    { id: "screenshots", label: isRTL ? "صور المشروع" : "Screenshots" },
    { id: "docs", label: isRTL ? "التوثيق" : "Documentation" },
    {
      id: "reviews",
      label: `${isRTL ? "التقييمات" : "Reviews"} (${t.rating || 5.0} ★)`,
    },
  ];

  const handleTabClick = (index: number, id: string) => {
    setActiveTab(index);
    const element = document.getElementById(`tab-sec-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getQualityLabel = (q: string) => {
    if (!isRTL) return q;
    const lower = q.toLowerCase();
    if (lower.includes("print")) return "جاهز للطباعة";
    if (lower.includes("standard")) return "قياسي";
    if (lower.includes("hd")) return "عالي الدقة";
    if (lower.includes("web")) return "ويب";
    return q;
  };

  const displayQualities = (t.qualities || ["Standard", "HD"]).map(
    getQualityLabel,
  );

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

  return (
    <main className="container detail">
      <div className="breadcrumbs">
        <Link href="/">{tr("home")}</Link>
        <span className="sep">›</span>
        <Link href="/templates">{tr("templates")}</Link>
        <span className="sep">›</span>
        <span>
          {displayCategory
            ? displayCategory.replace(" Template", "")
            : "Template"}
        </span>
        <span className="sep">›</span>
        <b>{displayName}</b>
      </div>

      <div className="detail-grid">
        <section>
          {/* Interactive Gallery with Detail Image & Screenshot strip */}
          <TemplateGallery
            title={displayName}
            mainImage={mainDetailImage}
            screenshots={galleryScreenshots}
          />

          <div className="tabs">
            {tabs.map((tab, i) => (
              <button
                type="button"
                className={"tab " + (activeTab === i ? "active" : "")}
                key={tab.id}
                onClick={() => setActiveTab(i)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  font: "inherit",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="detail-copy" style={{ minHeight: "220px" }}>
            {activeTab === 0 && (
              <div id="tab-sec-overview">
                <h2>
                  {isRTL ? `عن قالب ${displayName}` : `About ${displayName}`}
                </h2>

                {displayDescription ? (
                  <div
                    className="rich-content lead"
                    dangerouslySetInnerHTML={{ __html: displayDescription }}
                  />
                ) : (
                  <p className="lead">
                    {isRTL
                      ? `${displayName} هو قالب عصري ومتقن تم تصميمه للمبدعين والشركات، بأكواد برمجية نظيفة وتصميم متجاوب بالكامل وسهل التخصيص.`
                      : `${displayName} is a modern and elegant template designed for creators and businesses. It comes with clean code, fully responsive layouts, and easy customization options.`}
                  </p>
                )}
              </div>
            )}

            {activeTab === 1 && (
              <div id="tab-sec-features">
                <h3>
                  {isRTL ? "المميزات والصيغ المتاحة" : "Features & Formats"}
                </h3>
                <div className="tags" style={{ marginTop: "12px" }}>
                  {(isRTL
                    ? [
                        "قالب",
                        "تحميل مجاني",
                        ...(t.formats || []),
                        ...(t.qualities || []).map(getQualityLabel),
                      ]
                    : [
                        "template",
                        "download",
                        ...(t.formats || []).map((x: string) =>
                          x.toLowerCase(),
                        ),
                        ...(t.qualities || []).map((x: string) =>
                          x.toLowerCase(),
                        ),
                      ]
                  ).map((x) => (
                    <span className="pill" key={x}>
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div id="tab-sec-tech">
                <h3>
                  {isRTL ? "تفاصيل التقنيات والمستندات" : "Technical Details"}
                </h3>
                <div className="detail-facts" style={{ marginTop: "14px" }}>
                  <div>
                    <Folder />
                    <b>{isRTL ? "التصنيف" : "Category"}</b>
                    <span>
                      {displayCategory
                        ? displayCategory.replace(" Template", "")
                        : "General"}
                    </span>
                  </div>
                  <div>
                    <FileCode2 />
                    <b>{isRTL ? "التقنيات المستخدمة" : "Framework / Tech"}</b>
                    <span>{displayTech}</span>
                  </div>
                  <div>
                    <Calendar />
                    <b>{isRTL ? "الإصدار" : "Version"}</b>
                    <span>{t.version || "1.0.0"}</span>
                  </div>
                  <div>
                    <Tag />
                    <b>{isRTL ? "نوع الترخيص" : "License"}</b>
                    <span>
                      {t.license ||
                        (isRTL
                          ? "مجاني للاستخدام التجاري والشخصي"
                          : "Free for Personal & Commercial Use")}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div id="tab-sec-screenshots">
                <h3>{isRTL ? "معاينة صور المشروع" : "Screenshots Preview"}</h3>
                <p style={{ color: "var(--muted)", fontSize: "13px" }}>
                  {isRTL
                    ? "يمكنك معاينة جميع شاشات ومكونات هذا القالب من المعرض التفصيلي بالأعلى."
                    : "You can preview screen layouts and assets using the interactive gallery above."}
                </p>
                {galleryScreenshots.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(180px, 1fr))",
                      gap: "12px",
                      marginTop: "16px",
                    }}
                  >
                    {galleryScreenshots.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Screenshot ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid var(--line)",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "20px 0", color: "var(--muted)" }}>
                    {isRTL
                      ? "لا توجد صور إضافية متوفرة لهذا القالب."
                      : "No additional screenshot images available for this template."}
                  </div>
                )}
              </div>
            )}

            {activeTab === 4 && (
              <div id="tab-sec-docs">
                <h3>
                  {isRTL ? "التوثيق وطريقة الاستخدام" : "Documentation & Setup"}
                </h3>
                <p
                  style={{
                    color: "var(--muted)",
                    fontSize: "13px",
                    lineHeight: "1.7",
                  }}
                >
                  {isRTL
                    ? "يتضمن ملف القالب التوثيق الكامل وطريقة التعديل وتثبيت المكونات بخطوات بسيطة. عند تحميل الملف ستجد مجلد docs يحتوي على جميع التعليمات وطريقة الربط."
                    : "Includes step-by-step instructions, file structures, and customization guide. Upon downloading, check the included /docs folder for full details."}
                </p>
              </div>
            )}

            {activeTab === 5 && (
              <div id="tab-sec-reviews">
                <h3>
                  {isRTL ? "تقييمات وآراء المستخدمين" : "Customer Reviews"}
                </h3>
                <div
                  style={{
                    background: "rgba(37, 99, 235, 0.05)",
                    padding: "20px",
                    borderRadius: "12px",
                    marginTop: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#eab308",
                    }}
                  >
                    ★★★★★ {t.rating || "5.0"}{" "}
                    <span
                      style={{
                        color: "var(--text)",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      / 5.0
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "13px",
                      margin: "8px 0 0",
                      lineHeight: "1.6",
                    }}
                  >
                    {isRTL
                      ? "حصل هذا القالب على تقييمات ممتازة وسريعة من المطورين والمصممين لجودة الأكواد والتصميم المتجاوب."
                      : "Highly rated for clean code, rich customization features, and modern responsive design."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <aside className="info">
          <span className={t.price === "Premium" ? "premium" : "free"}>
            {t.price === "Premium" ? tr("premium") : tr("free")}
          </span>
          <h1>{displayName}</h1>
          <p className="lead">
            {getResourceTypeLabel(t.resourceType)} · {displayCategory}
          </p>
          <div className="rating">
            ★★★★★{" "}
            <span>
              {t.rating} {isRTL ? "تقييم" : "rating"}
            </span>
          </div>
          <div className="download-meta">
            <Download size={14} /> {t.downloads} {isRTL ? "تحميل" : "Downloads"}{" "}
            · {t.size}
          </div>
          <div className="tags mini">
            {t.resource_type_raw === "website" ||
            String(t.resourceType || "")
              .toLowerCase()
              .includes("website") ? (
              <span>{displayTech || "HTML & CSS"}</span>
            ) : (
              (t.formats || []).map((x: string) => <span key={x}>{x}</span>)
            )}
          </div>
          <div className="quality-line">
            <span>
              {isRTL ? "الجودة المتاحة: " : "Available quality: "}
              {displayQualities.join(" · ")}
            </span>
          </div>

          <Link className="downloadbtn" href={`/download?template=${t.slug}`}>
            <Download size={16} />{" "}
            {isRTL ? "تحميل القالب" : "Download Template"} <Heart size={16} />
          </Link>

          <div className="two-actions">
            {(t.resource_type_raw === "website" ||
              String(t.resourceType || "")
                .toLowerCase()
                .includes("website") ||
              String(t.resourceType || "").includes("موقع")) &&
              t.demo_url && (
                <Link
                  className="outline"
                  href={`/preview?template=${t.slug}`}
                  target="_blank"
                  style={{
                    textAlign: "center",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  {tr("preview")} ↗
                </Link>
              )}
            <button
              className="outline square"
              aria-label={isRTL ? "رابط خارجي" : "External link"}
            >
              <ExternalLink size={15} />
            </button>
            <button
              className="outline square"
              aria-label={isRTL ? "إضافة للمفضلة" : "Favorite"}
            >
              <Heart size={16} />
            </button>
          </div>

          <div className="features">
            {activeFeatures.map((x: string) => (
              <div className="feature" key={x}>
                <CheckCircle size={16} />
                {x}
              </div>
            ))}
          </div>

          <div className="custom-box">
            <Info />
            <div>
              <b>{isRTL ? "هل تحتاج إلى تعديل خاص؟" : "Need Customization?"}</b>
              <p>
                {isRTL
                  ? "يمكننا تعديل وتخصيص هذا القالب بالكامل ليناسب هوية ونشاط شركتك."
                  : "We can customize this template for your business needs."}
              </p>
              <Link href="/services#request-service">
                {isRTL
                  ? "تواصل معنا للحصول على عرض سعر ←"
                  : "Get in touch for a quick quote →"}
              </Link>
            </div>
          </div>

          <div className="related">
            <h2>{isRTL ? "قد يعجبك أيضاً" : "You May Also Like"}</h2>
            {relatedList.map((r: any) => (
              <Link href={`/templates/${r.slug}`} key={r.slug}>
                <img
                  src={getAssetUrl(r.image)}
                  alt={isRTL ? r.name_ar || r.name : r.name}
                />
                <span>
                  <b>{isRTL ? r.name_ar || r.name : r.name}</b>
                  <small>★★★★★ {r.rating}</small>
                </span>
                <em>{r.price === "Premium" ? tr("premium") : tr("free")}</em>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <div className="bottom-cta">
        <div>🚀</div>
        <div>
          <h2>{isRTL ? "هل أعجبك هذا القالب؟" : "Like This Template?"}</h2>
          <p>
            {isRTL
              ? "استكشف المزيد من القوالب والموارد الرائعة وأطلق مشروعك القادم بسرعة."
              : "Explore more amazing templates and build your next project faster."}
          </p>
        </div>
        <Link className="smallprimary" href="/templates">
          {isRTL ? "تصفح المزيد من القوالب ←" : "Browse More Templates →"}
        </Link>
      </div>
    </main>
  );
}
