"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Monitor,
  Smartphone,
  Download,
  ArrowLeft,
  ArrowRight,
  X,
  ExternalLink,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { templates } from "@/data/templates";
import { getResourceBySlug, normalizeTemplate, getAssetUrl } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

type DeviceMode = "desktop" | "mobile";

function PreviewContent() {
  const searchParams = useSearchParams();
  const templateSlug = searchParams.get("template") || "travelix";
  const { isRTL, t, locale } = useLanguage();

  const [device, setDevice] = useState<DeviceMode>("mobile");
  const [showTopAd, setShowTopAd] = useState(true);
  const [showBottomAd, setShowBottomAd] = useState(true);
  const [showSideAds, setShowSideAds] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);
  const [fetchedTemplate, setFetchedTemplate] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    if (templateSlug) {
      getResourceBySlug(templateSlug)
        .then((res) => {
          if (mounted && res) {
            const normalized = normalizeTemplate(res, locale);
            if (normalized) {
              setFetchedTemplate(normalized);
            }
          }
        })
        .catch(() => {});
    }
    return () => {
      mounted = false;
    };
  }, [templateSlug, locale]);

  // Find template by slug, or fallback to API result or fallback item
  const localMatch = templates.find(
    (item) =>
      item.slug?.toLowerCase() === templateSlug.toLowerCase() ||
      (item as any)?.id === templateSlug,
  );

  const templateItem = fetchedTemplate || localMatch || templates[0] || {};

  const displayName = isRTL
    ? templateItem?.name_ar ||
      templateItem?.name ||
      templateItem?.title ||
      "Template"
    : templateItem?.name_en ||
      templateItem?.name ||
      templateItem?.title ||
      "Template";

  const displayCategory = isRTL
    ? templateItem?.category_ar || templateItem?.category
    : templateItem?.category;

  const rawDemoUrl =
    templateItem?.demo_url ||
    templateItem?.preview_url ||
    templateItem?.demoUrl ||
    templateItem?.previewUrl;

  const demoUrl = rawDemoUrl
    ? rawDemoUrl.startsWith("http://") || rawDemoUrl.startsWith("https://")
      ? rawDemoUrl
      : getAssetUrl(rawDemoUrl)
    : null;

  const reloadIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div
      className={`preview-page-container ${device}`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxHeight: "100vh",
        background: "var(--bg, #0b1329)",
        color: "var(--text, #f1f5f9)",
        overflow: "hidden",
      }}
    >
      {/* ================= 1. TOP CONTROL BAR ================= */}
      <header
        className="preview-header"
        style={{
          height: "56px",
          background: "var(--card-bg, #111c2f)",
          borderBottom: "1px solid var(--line, #1e293b)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 100,
          flexShrink: 0,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}
      >
        {/* Left: Brand & Back to Details */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href={`/templates/${templateItem.slug}`}
            className="preview-back-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.06)",
              color: "var(--text, #f1f5f9)",
              fontSize: "12px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            title={isRTL ? "العودة لتفاصيل القالب" : "Back to Template Details"}
          >
            {isRTL ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
            <span>{isRTL ? "عودة للتفاصيل" : "Back"}</span>
          </Link>

          <div
            className="preview-template-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderLeft: isRTL ? "none" : "1px solid var(--line, #334155)",
              borderRight: isRTL ? "1px solid var(--line, #334155)" : "none",
              paddingLeft: isRTL ? 0 : "12px",
              paddingRight: isRTL ? "12px" : 0,
            }}
          >
            <img
              src={templateItem.image || "/assets/travelix-card.png"}
              alt={displayName}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
            <div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: "13px",
                  lineHeight: "1.2",
                  color: "var(--text)",
                }}
              >
                {displayName}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "var(--muted, #94a3b8)",
                }}
              >
                {displayCategory}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div
          className="preview-device-switcher"
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.2)",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid var(--line, #1e293b)",
            gap: "4px",
          }}
        >
          <button
            type="button"
            className={`device-btn ${device === "desktop" ? "active" : ""}`}
            onClick={() => setDevice("desktop")}
            title={isRTL ? "معاينة سطح المكتب" : "Desktop View"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "7px",
              border: "none",
              background:
                device === "desktop" ? "var(--blue, #2563eb)" : "transparent",
              color: device === "desktop" ? "#fff" : "var(--muted, #94a3b8)",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <Monitor size={16} />
            <span className="device-label">
              {isRTL ? "كمبيوتر" : "Desktop"}
            </span>
          </button>

          <button
            type="button"
            className={`device-btn ${device === "mobile" ? "active" : ""}`}
            onClick={() => setDevice("mobile")}
            title={isRTL ? "معاينة الجوال (375px)" : "Mobile View"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "7px",
              border: "none",
              background:
                device === "mobile" ? "var(--blue, #2563eb)" : "transparent",
              color: device === "mobile" ? "#fff" : "var(--muted, #94a3b8)",
              fontWeight: 700,
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            <Smartphone size={16} />
            <span className="device-label">{isRTL ? "جوال" : "Mobile"}</span>
          </button>

          <button
            type="button"
            onClick={reloadIframe}
            title={isRTL ? "إعادة تحميل المعاينة" : "Reload Preview"}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--muted, #94a3b8)",
              padding: "6px 8px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Right: Download Button */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Link
            href={`/download?template=${templateItem.slug}`}
            className="smallprimary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 16px",
              borderRadius: "8px",
              background: "var(--blue, #2563eb)",
              color: "#fff",
              fontSize: "12px",
              fontWeight: 800,
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            }}
          >
            <Download size={14} />
            <span>{isRTL ? "تحميل القالب" : "Download Template"}</span>
          </Link>
        </div>
      </header>

      {/* ================= 2. TOP AD BANNER SPOT ================= */}
      {showTopAd && (
        <div
          className="preview-ad-top"
          style={{
            background: "var(--card-bg, #111c2f)",
            borderBottom: "1px solid var(--line, #1e293b)",
            padding: "6px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "4px",
              left: isRTL ? "auto" : "12px",
              right: isRTL ? "12px" : "auto",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              color: "#64748b",
              textTransform: "uppercase",
            }}
          >
            {isRTL ? "مساحة إعلانية" : "ADVERTISEMENT"}
          </div>

          <div
            className="ad-placeholder-leaderboard"
            style={{
              width: "100%",
              maxWidth: "728px",
              height: "46px",
              borderRadius: "6px",
              background:
                "linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1))",
              border: "1px dashed rgba(59, 130, 246, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              color: "var(--text)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "var(--blue, #2563eb)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={15} />
              </div>
              <div>
                <strong style={{ fontSize: "12px", display: "block" }}>
                  {isRTL
                    ? "قوالب ووردبريس ولارافيل باحترافية عالية!"
                    : "Premium Responsive Web Templates & UI Kits"}
                </strong>
                <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                  {isRTL
                    ? "احصل على ترخيص غير محدود مع تحديثات مجانية مدى الحياة"
                    : "Unlimited Downloads with Commercial License"}
                </span>
              </div>
            </div>

            <a
              href="/templates?price=Premium"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "5px 12px",
                background: "var(--blue, #2563eb)",
                color: "#fff",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {isRTL ? "استكشف القوالب الممتازة ←" : "Explore Premium →"}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setShowTopAd(false)}
            title={isRTL ? "إغلاق الإعلان" : "Close Ad"}
            style={{
              position: "absolute",
              right: isRTL ? "auto" : "12px",
              left: isRTL ? "12px" : "auto",
              background: "transparent",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ================= 3. MAIN PREVIEW CANVAS AREA ================= */}
      <main
        className="preview-body-area"
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          background: "var(--bg, #0b1329)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left Fixed Side Ad Slot (Far Left Edge) */}
        {showSideAds && (
          <aside
            className="side-ad-left"
            style={{
              position: "fixed",
              left: "20px",
              top: showTopAd ? "135px" : "75px",
              width: "160px",
              height: "560px",
              maxHeight: "calc(100vh - 180px)",
              background: "var(--card-bg, #111c2f)",
              border: "1px dashed rgba(59, 130, 246, 0.3)",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 10px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              zIndex: 40,
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                color: "#64748b",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              {isRTL ? "مساحة إعلان جانبي" : "SIDEBAR AD"}
            </div>
            <Sparkles
              size={32}
              style={{ color: "var(--blue)", marginBottom: "12px" }}
            />
            <strong style={{ fontSize: "12px", color: "var(--text)" }}>
              {isRTL ? "اعلن هنا معنا" : "Promote Your Business"}
            </strong>
            <p
              style={{
                fontSize: "10px",
                color: "var(--muted)",
                margin: "8px 0 16px",
                lineHeight: "1.4",
              }}
            >
              {isRTL
                ? "وصل منتجك لآلاف المصممين والمطورين شهرياً"
                : "Reach 50,000+ developers monthly"}
            </p>
            <a
              href="/services#request-service"
              style={{
                padding: "7px 12px",
                background: "rgba(37, 99, 235, 0.15)",
                color: "var(--blue)",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {isRTL ? "احجز المساحة" : "Advertise Here"}
            </a>
            <button
              type="button"
              onClick={() => setShowSideAds(false)}
              style={{
                marginTop: "20px",
                background: "none",
                border: "none",
                color: "#64748b",
                fontSize: "10px",
                cursor: "pointer",
              }}
            >
              {isRTL ? "إخفاء الإعلان" : "Hide Ad"}
            </button>
          </aside>
        )}

        {/* Center Viewport Frame Container */}
        <div
          className={`viewport-frame ${device}`}
          style={{
            width:
              device === "desktop"
                ? showSideAds
                  ? "calc(100% - 400px)"
                  : "100%"
                : "375px",
            maxWidth:
              device === "desktop"
                ? showSideAds
                  ? "calc(100% - 400px)"
                  : "100%"
                : "none",
            height: "100%",
            maxHeight: device === "desktop" ? "100%" : "667px",
            borderRadius: device === "desktop" ? "12px" : "32px",
            border:
              device === "desktop"
                ? "1px solid var(--line, #1e293b)"
                : "12px solid #1e293b",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            background: "#ffffff",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          {/* Mobile Speaker Notch Simulation */}
          {device === "mobile" && (
            <div
              style={{
                height: "22px",
                background: "#1e293b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "4px",
                  borderRadius: "3px",
                  background: "#334155",
                }}
              />
            </div>
          )}

          {/* Iframe Viewport or Image Preview Canvas */}
          {demoUrl ? (
            <iframe
              key={iframeKey}
              src={demoUrl}
              title={`${displayName} Live Demo`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                background: "#ffffff",
                flex: 1,
              }}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                background: "#0f172a",
                color: "#f8fafc",
                textAlign: "center",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  maxWidth: "800px",
                  width: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  marginBottom: "20px",
                  background: "#1e293b",
                }}
              >
                <img
                  src={
                    templateItem?.detail_image ||
                    templateItem?.preview_image ||
                    templateItem?.image ||
                    "/assets/travelix-card.png"
                  }
                  alt={displayName}
                  style={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "520px",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "8px",
                }}
              >
                {displayName}
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginBottom: "20px",
                  maxWidth: "500px",
                }}
              >
                {isRTL
                  ? "هذا القالب عبارة عن ملف جاهز للتحميل والفتح المباشر. يمكنك تحميل الملف واستخدامه مباشرة على جهازك."
                  : "This resource is a downloadable template file. You can download and edit it directly on your device."}
              </p>

              <Link
                href={`/download?template=${templateItem?.slug || templateSlug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "14px",
                  textDecoration: "none",
                  boxShadow: "0 10px 20px rgba(37, 99, 235, 0.3)",
                }}
              >
                <Download size={18} />
                <span>
                  {isRTL ? "تحميل القالب الآن" : "Download Template Now"}
                </span>
              </Link>
            </div>
          )}

          {/* Mobile Home Bar Simulation */}
          {device === "mobile" && (
            <div
              style={{
                height: "14px",
                background: "#1e293b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "3px",
                  borderRadius: "2px",
                  background: "#475569",
                }}
              />
            </div>
          )}
        </div>

        {/* Right Fixed Side Ad Slot (Far Right Edge) */}
        {showSideAds && (
          <aside
            className="side-ad-right"
            style={{
              position: "fixed",
              right: "20px",
              top: showTopAd ? "135px" : "75px",
              width: "160px",
              height: "560px",
              maxHeight: "calc(100vh - 180px)",
              background: "var(--card-bg, #111c2f)",
              border: "1px dashed rgba(59, 130, 246, 0.3)",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 10px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              zIndex: 40,
              transition: "all 0.2s ease",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: 800,
                color: "#64748b",
                marginBottom: "16px",
                textTransform: "uppercase",
              }}
            >
              {isRTL ? "مساحة إعلان جانبي" : "SIDEBAR AD"}
            </div>
            <ShieldCheck
              size={32}
              style={{ color: "#10b981", marginBottom: "12px" }}
            />
            <strong style={{ fontSize: "12px", color: "var(--text)" }}>
              {isRTL ? "ضمان وجودة 100%" : "Certified Quality"}
            </strong>
            <p
              style={{
                fontSize: "10px",
                color: "var(--muted)",
                margin: "8px 0 16px",
                lineHeight: "1.4",
              }}
            >
              {isRTL
                ? "جميع القوالب مفحوصة ومحدثة لأعلى كفاءة"
                : "Tested and clean source codes"}
            </p>
            <a
              href="/templates"
              style={{
                padding: "7px 12px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#10b981",
                borderRadius: "6px",
                fontSize: "11px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {isRTL ? "تصفح القوالب" : "Browse All"}
            </a>
          </aside>
        )}
      </main>

      {/* ================= 4. BOTTOM STICKY AD BAR ================= */}
      {showBottomAd && (
        <div
          className="preview-ad-bottom"
          style={{
            background: "var(--card-bg, #111c2f)",
            borderTop: "1px solid var(--line, #1e293b)",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            flexShrink: 0,
            boxShadow: "0 -4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "970px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: "1 1 200px",
                minWidth: 0,
              }}
            >
              <span
                style={{
                  background: "var(--blue, #2563eb)",
                  color: "#fff",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "9px",
                  fontWeight: 800,
                  flexShrink: 0,
                }}
              >
                {isRTL ? "إعلان" : "AD"}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--text)",
                  lineHeight: 1.35,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {isRTL
                  ? `هل تبحث عن تصميم خاص بمشروعك؟ احصل على خصم 20% مع فريق EzyTemplate`
                  : `Need a custom design for ${displayName}? Get 20% off with EzyTemplate Services`}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <a
                href="/services#request-service"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "6px 12px",
                  background: "var(--blue, #2563eb)",
                  color: "#fff",
                  borderRadius: "6px",
                  fontSize: "11px",
                  fontWeight: 700,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {isRTL ? "اطلب تصميمك ←" : "Request Customization →"}
              </a>

              <button
                type="button"
                onClick={() => setShowBottomAd(false)}
                title={isRTL ? "إغلاق الإعلان" : "Close Ad"}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#64748b",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                }}
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0b1329",
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Loading live preview...
        </div>
      }
    >
      <PreviewContent />
    </Suspense>
  );
}
