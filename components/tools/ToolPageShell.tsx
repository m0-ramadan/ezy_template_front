"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import ToolBreadcrumb from "@/components/tools/ToolBreadcrumb";
import ToolFeaturesUsage from "@/components/tools/ToolFeaturesUsage";
import ToolFAQ from "@/components/tools/ToolFAQ";
import RelatedTools from "@/components/tools/RelatedTools";
import RelatedTemplates from "@/components/tools/RelatedTemplates";
import ToolAdSlot from "@/components/tools/ToolAdSlot";
import { getToolBySlugFromApi, trackToolEvent } from "@/lib/api";
import { getToolBySlug } from "@/lib/toolsUtils";
import { AlertCircle, Lock } from "lucide-react";

export default function ToolPageShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const { isRTL } = useLanguage();
  const [apiData, setApiData] = useState<any>(null);

  // Fallback to static seed data if offline/loading
  const fallbackTool = getToolBySlug(slug);

  useEffect(() => {
    // Track Page View
    trackToolEvent(slug, "page_view");

    getToolBySlugFromApi(slug).then((res) => {
      if (res && res.tool) {
        setApiData(res);
      }
    });
  }, [slug]);

  const tool = apiData?.tool || fallbackTool;
  const relatedTemplates = apiData?.related_templates || [];

  const rawTitle = isRTL
    ? tool?.name_ar || tool?.title?.ar || tool?.name || tool?.title
    : tool?.name || tool?.title?.en || tool?.title;
  const title =
    typeof rawTitle === "string"
      ? rawTitle
      : isRTL
        ? rawTitle?.ar || rawTitle?.en || String(rawTitle || slug)
        : rawTitle?.en || rawTitle?.ar || String(rawTitle || slug);

  const rawDesc = isRTL
    ? tool?.description_ar || tool?.description?.ar || tool?.description
    : tool?.description || tool?.description?.en || tool?.description;
  const description =
    typeof rawDesc === "string"
      ? rawDesc
      : isRTL
        ? rawDesc?.ar || rawDesc?.en || String(rawDesc || "")
        : rawDesc?.en || rawDesc?.ar || String(rawDesc || "");

  const isAvailable = tool?.is_available !== false;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${title} | EzyTemplate`,
    url: `https://ezytemplate.com/tools/${slug}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "80vh",
        padding: "32px 0 80px",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <ToolBreadcrumb
          title={title || slug}
          categorySlug={tool?.category?.slug || tool?.category}
          categoryName={
            tool?.category?.name_ar
              ? { ar: tool.category.name_ar, en: tool.category.name }
              : undefined
          }
        />

        {/* Tool Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "var(--text)",
              marginBottom: "12px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              maxWidth: "800px",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        </div>

        {/* Workspace or Capability Disabled Warning */}
        {isAvailable ? (
          <div>{children}</div>
        ) : (
          <div
            style={{
              padding: "32px",
              borderRadius: "16px",
              background: "var(--card-bg, #ffffff)",
              border: "1px solid #fecaca",
              textAlign: "center",
              color: "#991b1b",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "#fef2f2",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
              }}
            >
              <AlertCircle size={28} color="#dc2626" />
            </div>
            <h3
              style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0" }}
            >
              {isRTL
                ? "هذه الأداة غير متاحة حالياً على السيرفر"
                : "This tool is temporarily unavailable"}
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--muted)",
                margin: 0,
                maxWidth: "500px",
                marginInline: "auto",
              }}
            >
              {isRTL
                ? "الخدمة تتطلب مكتبة معالجة خاصة على السيرفر (مثل Ghostscript أو LibreOffice) وهي غير مفعالة في الوقت الحالي."
                : "This tool requires a server dependency (such as Ghostscript or LibreOffice) that is currently disabled."}
            </p>
          </div>
        )}

        {/* Ad Placement Slot */}
        <ToolAdSlot placement="below-workspace" />

        {/* Features & Usage Steps */}
        <ToolFeaturesUsage
          features={tool?.features}
          usageSteps={tool?.usage_steps || tool?.usageSteps}
        />

        {/* FAQ Section */}
        <ToolFAQ faqs={tool?.faqs} />

        {/* Related Templates Interlinking */}
        <RelatedTemplates templates={relatedTemplates} />

        {/* Related Tools */}
        <RelatedTools currentSlug={slug} />
      </div>
    </div>
  );
}
