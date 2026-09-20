"use client";

import { use, useEffect, useState, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Download,
  Folder,
  LifeBuoy,
  BookOpen,
  Tag,
  Calendar,
  FileArchive,
  CheckCircle2,
  Clock,
  Loader2,
} from "lucide-react";
import {
  getResourceBySlug,
  getResources,
  normalizeTemplate,
  getAssetUrl,
  API_BASE_URL,
} from "@/lib/api";
import { templates as fallbackTemplates } from "@/data/templates";
import { useLanguage } from "@/context/LanguageContext";
import TemplateCard from "@/components/TemplateCard";

export default function DownloadPage({
  searchParams,
}: {
  searchParams?: Promise<{ template?: string }>;
}) {
  const { t, isRTL } = useLanguage();
  const resolvedParams = searchParams ? use(searchParams) : {};
  const slug = resolvedParams.template || "travelix";

  const [template, setTemplate] = useState<any>(null);
  const [relatedList, setRelatedList] = useState<any[]>([]);

  // 20-Second Countdown & Download State
  const [countdown, setCountdown] = useState<number>(20);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [downloadStarted, setDownloadStarted] = useState<boolean>(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const hasAutoTriggered = useRef<boolean>(false);

  useEffect(() => {
    getResourceBySlug(slug)
      .then((res) => {
        if (res) setTemplate(normalizeTemplate(res, isRTL ? "ar" : "en"));
      })
      .catch(() => {});

    getResources({ per_page: 4 })
      .then((res) => {
        if (res?.data?.length > 0) {
          setRelatedList(
            res.data
              .filter((r: any) => r.slug !== slug)
              .slice(0, 4)
              .map((r: any) => normalizeTemplate(r, isRTL ? "ar" : "en")),
          );
        }
      })
      .catch(() => {});
  }, [slug, isRTL]);

  const defaultFallback = {
    slug: slug || "template",
    name: "Template",
    name_en: "Template",
    name_ar: "قالب",
    title: "Template",
    category: "General",
    category_ar: "عام",
    license: "Free",
    version: "1.0.0",
    size: "10 MB",
    resourceType: "Website Template",
  };

  const rawItem =
    template ||
    fallbackTemplates.find((x) => x?.slug === slug) ||
    fallbackTemplates[0] ||
    defaultFallback;

  const tItem = useMemo(() => {
    const item = rawItem || defaultFallback;
    const nameVal = item.name_en || item.name || item.title || "Template";
    const nameArVal = item.name_ar || item.title_ar || nameVal;

    return {
      ...item,
      slug: item.slug || slug || "template",
      name: isRTL ? nameArVal : nameVal,
      name_ar: nameArVal,
      category: isRTL
        ? item.category_ar || item.category || "عام"
        : item.category || "General",
      license: isRTL
        ? item.license_ar || item.license || "مجاني"
        : item.license || "Free",
    };
  }, [rawItem, isRTL, slug]);

  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);

  const rawFiles = useMemo(() => {
    return Array.isArray(rawItem?.files) ? rawItem.files : [];
  }, [rawItem]);

  const availableFormats = useMemo(() => {
    const rawType = String(
      rawItem?.resource_type_raw || rawItem?.resourceType || "",
    ).toLowerCase();
    const isWebsite = rawType.includes("website") || rawType === "website";

    if (isWebsite) return [];

    // Formats from raw files
    const fileFormats = rawFiles
      .map((f: any) =>
        f?.extension
          ? String(f.extension).toUpperCase().replace(/^\./, "")
          : "",
      )
      .filter(Boolean);

    // Formats from normalized formats array
    const itemFormats = (tItem?.formats || [])
      .map((fmt: any) => String(fmt).toUpperCase().trim())
      .filter((fmt: string) => fmt !== "ZIP");

    const merged = Array.from(new Set([...fileFormats, ...itemFormats]));
    return merged;
  }, [rawFiles, rawItem, tItem]);

  // Set default format if not set
  useEffect(() => {
    if (availableFormats.length > 0 && !selectedFormat) {
      setSelectedFormat(availableFormats[0]);
    }
  }, [availableFormats, selectedFormat]);

  const selectedFile = useMemo(() => {
    if (rawFiles.length === 0) return null;
    if (!selectedFormat)
      return rawFiles.find((f: any) => f.is_primary) || rawFiles[0];

    const match = rawFiles.find((f: any) => {
      const ext = f?.extension
        ? String(f.extension).toUpperCase().replace(/^\./, "")
        : "";
      return ext === selectedFormat;
    });

    return match || rawFiles.find((f: any) => f.is_primary) || rawFiles[0];
  }, [rawFiles, selectedFormat]);

  const primaryFile =
    selectedFile ||
    rawFiles.find((file: any) => file.is_primary) ||
    rawFiles[0];

  const fileExtension = selectedFormat
    ? `.${selectedFormat.toLowerCase()}`
    : primaryFile?.extension
      ? `.${String(primaryFile.extension).replace(/^\./, "")}`
      : ".zip";

  const originalName = primaryFile?.original_name
    ? String(primaryFile.original_name)
    : `${tItem.slug}-template`;

  const downloadFileName = originalName
    .toLowerCase()
    .endsWith(fileExtension.toLowerCase())
    ? originalName
    : `${originalName.replace(/\.[^/.]+$/, "")}${fileExtension}`;

  // Function to execute the actual file download
  const handleExecuteDownload = useCallback(async () => {
    setDownloadStarted(true);
    setDownloadError(null);
    let fileUrl: string | null = null;

    if (primaryFile && rawItem?.id) {
      try {
        const fileId = primaryFile.id;
        const res = await fetch(
          `${API_BASE_URL}/resources/${rawItem.id}/files/${fileId}/download`,
          {
            method: "POST",
            headers: { Accept: "application/json" },
          },
        );
        if (!res.ok) throw new Error(`Download request failed (${res.status})`);
        const resData = await res.json();
        if (resData?.url) {
          fileUrl = new URL(resData.url, `${API_BASE_URL}/`).toString();
        }
      } catch (err) {
        console.warn("API download error, using fallback:", err);
      }
    }

    if (!fileUrl && rawItem?.zip_url) {
      fileUrl = getAssetUrl(rawItem.zip_url);
    }

    const canvaExternalLink =
      rawItem?.canva_url ||
      rawItem?.source_url ||
      rawItem?.demo_url ||
      rawItem?.external_url;

    if (!fileUrl && canvaExternalLink) {
      if (typeof window !== "undefined") {
        window.open(canvaExternalLink, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (!fileUrl) {
      setDownloadStarted(false);
      setDownloadError(
        isRTL
          ? "تعذّر تجهيز الملف. برجاء المحاولة مرة أخرى أو التواصل مع الدعم."
          : "The file could not be prepared. Please try again or contact support.",
      );
      return;
    }

    // Save to download history in localStorage
    if (typeof window !== "undefined") {
      try {
        let history: any[] = JSON.parse(
          localStorage.getItem("ezy_downloads") || "[]",
        );
        if (!Array.isArray(history)) history = [];

        history = history.filter((h) => h.slug !== tItem.slug);
        history.unshift({
          slug: tItem.slug,
          name: tItem.name,
          name_ar: tItem.name_ar || tItem.name,
          category: tItem.category,
          image: tItem.image,
          resourceType: tItem.resourceType || "Website Template",
          downloadedAt: new Date().toISOString(),
          fileName: downloadFileName,
          size: tItem.size || "12.4 MB",
          version: tItem.version || "1.0.0",
        });

        localStorage.setItem("ezy_downloads", JSON.stringify(history));
        window.dispatchEvent(new Event("ezy_downloads_change"));
      } catch (err) {
        console.error("Failed to save download history:", err);
      }
    }

    // Trigger browser save dialog
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", downloadFileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [rawItem, primaryFile, tItem, downloadFileName, isRTL]);

  const downloadActionRef = useRef<() => void>(() => {});
  useEffect(() => {
    downloadActionRef.current = handleExecuteDownload;
  }, [handleExecuteDownload]);

  // 20 Seconds Countdown Effect (Pauses when tab is inactive)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsReady(true);
            if (!hasAutoTriggered.current) {
              hasAutoTriggered.current = true;
              downloadActionRef.current();
            }
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressPercentage = Math.round(((20 - countdown) / 20) * 100);

  return (
    <main className="container download-page">
      <div className="breadcrumbs">
        <Link href="/">{t("home")}</Link>　›　
        <Link href="/templates">{t("templates")}</Link>　›　
        <Link href={`/templates/${tItem.slug}`}>{tItem.name}</Link>　›　
        <b>{t("download")}</b>
      </div>

      <div className="download-grid">
        <section>
          {/* COUNTDOWN & DOWNLOAD READY CARD */}
          <div className="ready">
            {!isReady ? (
              /* INLINE COUNTDOWN CARD STATE */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "24px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ maxWidth: "520px", width: "100%", margin: "0 auto" }}
                >
                  {/* CIRCULAR TIMER DISPLAY */}
                  <div
                    style={{
                      width: "96px",
                      height: "96px",
                      borderRadius: "50%",
                      background: "rgba(37, 99, 235, 0.12)",
                      border: "4px solid var(--blue, #2563eb)",
                      boxShadow: "0 0 30px rgba(37, 99, 235, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "36px",
                        fontWeight: 800,
                        color: "var(--blue, #2563eb)",
                        lineHeight: 1,
                      }}
                    >
                      {countdown}
                    </span>
                    <small
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        fontSize: "10px",
                        color: "var(--muted)",
                        fontWeight: 700,
                      }}
                    >
                      {isRTL ? "ثانية" : "sec"}
                    </small>
                  </div>

                  <h1
                    style={{
                      fontSize: "clamp(20px, 5vw, 26px)",
                      fontWeight: 800,
                      marginBottom: "12px",
                      color: "var(--text)",
                      lineHeight: 1.35,
                    }}
                  >
                    {isRTL
                      ? `جاري فحص وتجهيز رابط تحميل ${tItem.name}...`
                      : `Preparing download link for ${tItem.name}...`}
                  </h1>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--muted)",
                      maxWidth: "460px",
                      margin: "0 auto 24px",
                      lineHeight: 1.6,
                    }}
                  >
                    {isRTL
                      ? `يرجى الانتظار (${countdown} ثانية). سيبدأ التحميل تلقائياً فور اكتمال الفحص.`
                      : `Please wait ${countdown} seconds. Your download will start automatically once ready.`}
                  </p>

                  {/* PROGRESS BAR */}
                  <div
                    style={{
                      maxWidth: "380px",
                      width: "100%",
                      height: "10px",
                      background: "rgba(255, 255, 255, 0.08)",
                      borderRadius: "20px",
                      margin: "0 auto 24px",
                      overflow: "hidden",
                      border:
                        "1px solid var(--line, rgba(255, 255, 255, 0.12))",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${progressPercentage}%`,
                        background:
                          "linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)",
                        borderRadius: "20px",
                        transition: "width 1s linear",
                      }}
                    />
                  </div>

                  {/* STATUS BADGE DURING COUNTDOWN */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      borderRadius: "30px",
                      background: "rgba(37, 99, 235, 0.12)",
                      border: "1px solid rgba(37, 99, 235, 0.25)",
                      color: "#60a5fa",
                      fontSize: "13px",
                      fontWeight: 700,
                      maxWidth: "100%",
                    }}
                  >
                    <Loader2
                      size={16}
                      style={{
                        animation: "spin 1.5s linear infinite",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isRTL
                        ? `جاري فحص وتأمين الملف... (${countdown} ثانية)`
                        : `Verifying & securing link... (${countdown}s)`}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* READY & COMPLETED STATE */
              <div style={{ padding: "10px 0" }}>
                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "rgba(16, 185, 129, 0.15)",
                    color: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <CheckCircle2 size={40} />
                </div>

                <h1
                  style={{
                    fontSize: "26px",
                    fontWeight: 800,
                    marginBottom: "8px",
                    color: "var(--text)",
                  }}
                >
                  {isRTL
                    ? "رابط التحميل جاهز الآن!"
                    : "Your Download is Ready!"}
                </h1>

                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--muted)",
                    maxWidth: "500px",
                    margin: "0 auto 20px",
                  }}
                >
                  {rawItem?.canva_url ||
                  rawItem?.source_url ||
                  rawItem?.demo_url
                    ? isRTL
                      ? `تصميم Canva الخاص بـ ${tItem.name} جاهز للفتح والتعديل المباشر.`
                      : `Canva design for ${tItem.name} is ready to open and edit directly.`
                    : downloadStarted
                      ? isRTL
                        ? `بدأ تحميل ${tItem.name} تلقائياً. إذا لم يبدأ التحميل على جهازك، اضغط الزر أدناه.`
                        : `Download for ${tItem.name} started automatically. If it didn't start, click the button below.`
                      : isRTL
                        ? `اضغط على الزر أدناه لبدء تحميل ${tItem.name}.`
                        : `Click the button below to download ${tItem.name}.`}
                </p>

                {availableFormats.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        marginBottom: "10px",
                        color: "var(--text)",
                      }}
                    >
                      {isRTL
                        ? "اختر صيغة التحميل المناسبة:"
                        : "Select your preferred format:"}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {availableFormats.map((fmt) => {
                        const active = selectedFormat === fmt;
                        return (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setSelectedFormat(fmt)}
                            style={{
                              padding: "8px 18px",
                              borderRadius: "20px",
                              border: active
                                ? "2px solid #2563eb"
                                : "1px solid var(--line, rgba(255,255,255,0.2))",
                              background: active
                                ? "rgba(37, 99, 235, 0.15)"
                                : "rgba(255, 255, 255, 0.05)",
                              color: active ? "#60a5fa" : "var(--text)",
                              fontWeight: active ? 800 : 600,
                              fontSize: "13px",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {fmt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {downloadError && (
                  <p
                    role="alert"
                    style={{
                      color: "#dc2626",
                      fontSize: "14px",
                      fontWeight: 600,
                      margin: "-8px auto 16px",
                    }}
                  >
                    {downloadError}
                  </p>
                )}

                <button
                  onClick={handleExecuteDownload}
                  className="downloadbtn ready-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "14px 32px",
                    borderRadius: "12px",
                    background: "#10b981",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 4px 14px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <Download size={20} />
                  <span>
                    {rawItem?.canva_url ||
                    rawItem?.source_url ||
                    rawItem?.demo_url
                      ? isRTL
                        ? "فتح القالب على Canva للتعديل"
                        : "Open Template on Canva"
                      : isRTL
                        ? "تحميل الملف الآن"
                        : "Download File Now"}
                  </span>
                  <Download size={20} />
                </button>
              </div>
            )}

            <div className="file-meta" style={{ marginTop: "20px" }}>
              {t("download_file_label")}: <b>{downloadFileName}</b>　|　
              {t("download_size_label")}: <b>{tItem.size || "12.4 MB"}</b>　|　
              {t("download_version_label")}: <b>{tItem.version || "1.0.0"}</b>
            </div>
          </div>

          {/* AD BANNER */}
          <div className="ad">
            <div className="ad-logo">H</div>
            <div>
              <b>Hostinger</b>
              <strong>
                {isRTL ? "ابنِ موقع أحلامك الآن" : "Build Your Dream Website"}
              </strong>
              <span>
                {isRTL
                  ? "احصل على خصم 75% على الاستضافة + دومين مجاني"
                  : "Get 75% OFF on Hosting + Free Domain"}
              </span>
            </div>
            <div className="ad-art">▰▰▰</div>
            <div className="ad-fast">
              {isRTL ? "سريع" : "Fast"}
              <br />
              <b>
                {isRTL ? "آمن" : "Secure"}
                <br />
                {isRTL ? "موثوق" : "Reliable"}
              </b>
            </div>
          </div>

          {/* HELP SECTION */}
          <div className="ready-help">
            <h2>{t("download_help_title")}</h2>
            <p>{t("download_help_desc")}</p>
            <div className="help-links">
              <Link href="/blog">
                <BookOpen size={18} />
                <span>
                  <b>
                    {isRTL ? "دليل التثبيت والبدء" : "Getting Started Guide"}
                  </b>
                  <small>
                    {isRTL
                      ? "شرح خطوة بخطوة لتشغيل القالب"
                      : "Step-by-step tutorial"}
                  </small>
                </span>
              </Link>
              <Link href="/services#request-service">
                <LifeBuoy size={18} />
                <span>
                  <b>
                    {isRTL
                      ? "طلب مساعدة في التثبيت"
                      : "Need Installation Help?"}
                  </b>
                  <small>
                    {isRTL
                      ? "فريقنا يمكنه مساعدتك في التثبيت"
                      : "Our team can help"}
                  </small>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* SIDEBAR */}
        <aside className="download-sidebar">
          <div className="box">
            <h3>{isRTL ? "تفاصيل الملف" : "File Details"}</h3>
            <div className="detail-facts">
              <div>
                <FileArchive />
                <b>{isRTL ? "اسم الملف" : "Filename"}</b>
                <span>{downloadFileName}</span>
              </div>
              <div>
                <Folder />
                <b>{isRTL ? "الصيغة" : "Format"}</b>
                <span>{(tItem.formats || ["ZIP"]).join(", ")}</span>
              </div>
              <div>
                <Tag />
                <b>{isRTL ? "الترخيص" : "License"}</b>
                <span>
                  {tItem.license ||
                    (isRTL
                      ? "مجاني للاستخدام التجاري"
                      : "Free for Commercial Use")}
                </span>
              </div>
              <div>
                <Calendar />
                <b>{isRTL ? "الإصدار" : "Version"}</b>
                <span>{tItem.version || "1.0.0"}</span>
              </div>
            </div>
          </div>

          <div className="box related-downloads">
            <h3>{isRTL ? "قوالب مشابهة قد تعجبك" : "You Might Also Like"}</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              {relatedList.map((r: any) => (
                <TemplateCard key={r.slug || r.id} t={r} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
