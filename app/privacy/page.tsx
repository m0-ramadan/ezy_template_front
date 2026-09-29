"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCustomPageContent } from "@/lib/api";
import PageLoader from "@/components/PageLoader";

interface Section {
  title: string;
  title_ar?: string;
  content: string;
  content_ar?: string;
}

interface PrivacyData {
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  last_updated?: string;
  sections?: Section[];
}

export default function PrivacyPage() {
  const { isRTL } = useLanguage();
  const [data, setData] = useState<PrivacyData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getCustomPageContent("privacy")
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
  }, []);

  if (loading) return <PageLoader />;

  const title = isRTL
    ? data?.title_ar || "سياسة الخصوصية"
    : data?.title || "Privacy Policy";
  const subtitle = isRTL
    ? data?.subtitle_ar ||
      "نحن نلتزم بحماية بياناتك وشرح طريقة جمع واستخدام واستضافة البيانات بكل شفافية."
    : data?.subtitle ||
      "We are committed to protecting your personal data and providing clear info about privacy.";

  const sections = data?.sections?.length ? data.sections : [
    { title: "Information we collect", title_ar: "البيانات التي نجمعها", content: "We receive information you submit through account, contact, service-request and newsletter forms. Our servers also process technical records such as IP address, user agent, referring page, requested path and timestamps for security, delivery and aggregate usage measurement.", content_ar: "نستلم البيانات التي ترسلها عبر نماذج الحساب والتواصل وطلبات الخدمات والنشرة البريدية. كما تعالج الخوادم سجلات تقنية مثل عنوان IP ونوع المتصفح والصفحة المحيلة والمسار والوقت للأمان والتشغيل والقياس المجمع." },
    { title: "How information is used", title_ar: "كيفية استخدام البيانات", content: "We use information to provide downloads and requested services, operate accounts, answer messages, prevent abuse, maintain security, improve content and meet legal obligations. We do not sell contact-form content.", content_ar: "نستخدم البيانات لتقديم التحميلات والخدمات المطلوبة وتشغيل الحسابات والرد على الرسائل ومنع الإساءة وتحسين المحتوى والوفاء بالالتزامات. لا نبيع محتوى نماذج التواصل." },
    { title: "Advertising and Google", title_ar: "الإعلانات وGoogle", content: "When enabled, Google AdSense and its partners may process cookies, IP addresses, device/browser information and ad interactions to deliver, secure and measure advertising. Google-certified consent controls must be used where required in the EEA, UK and Switzerland. See our Cookie Policy and Google's own privacy information for details and choices.", content_ar: "عند تفعيل الإعلانات، قد تعالج Google AdSense وشركاؤها ملفات الارتباط وعناوين IP وبيانات الجهاز والمتصفح وتفاعلات الإعلان للعرض والأمان والقياس. يجب استخدام أدوات موافقة معتمدة من Google حيث يلزم." },
    { title: "Service providers and retention", title_ar: "مقدمو الخدمة ومدة الاحتفاظ", content: "Hosting, security, email and advertising providers may process only the data needed for their role. We retain records only as long as reasonably needed for the purpose, security, disputes and legal duties, then delete or anonymise them when practical.", content_ar: "قد يعالج مقدمو الاستضافة والأمان والبريد والإعلانات فقط البيانات اللازمة لدورهم. نحتفظ بالسجلات للمدة المعقولة اللازمة للغرض والأمان والالتزامات، ثم نحذفها أو نجهلها عندما يكون ذلك عملياً." },
    { title: "Your choices and contact", title_ar: "خياراتك والتواصل", content: "Depending on applicable law, you may request access, correction, deletion or objection. You may unsubscribe from newsletters and manage browser/advertising consent choices. Submit privacy requests through the Contact page; identity verification may be required.", content_ar: "بحسب القانون المنطبق، يمكنك طلب الوصول أو التصحيح أو الحذف أو الاعتراض. يمكنك إلغاء الاشتراك وإدارة خيارات المتصفح والإعلانات. أرسل طلبات الخصوصية عبر صفحة التواصل." },
  ];

  return (
    <div style={{ minHeight: "85vh", padding: "40px 16px 80px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "50px",
              background: "rgba(16, 185, 129, 0.15)",
              color: "#34d399",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <ShieldCheck size={16} />
            <span>{isRTL ? "أمان البيانات والخصوصية" : "Data Protection"}</span>
          </div>

          <h1
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              marginBottom: "16px",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "16px",
              color: "var(--muted)",
              maxWidth: "640px",
              margin: "0 auto 20px",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "var(--muted)",
              background: "var(--card-bg)",
              padding: "6px 14px",
              borderRadius: "20px",
              border: "1px solid var(--line)",
            }}
          >
            <Calendar size={14} />
            <span>
              {isRTL
                ? `آخر تحديث: ${data?.last_updated || "29 سبتمبر 2026"}`
                : `Last Updated: ${data?.last_updated || "September 29, 2026"}`}
            </span>
          </div>
        </div>

        {/* CONTENT SECTIONS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {sections.map((sec, idx) => {
            const secTitle = isRTL
              ? sec.title_ar || sec.title
              : sec.title || sec.title_ar;
            const secContent = isRTL
              ? sec.content_ar || sec.content
              : sec.content || sec.content_ar;

            return (
              <div
                key={idx}
                style={{
                  background: "var(--card-bg)",
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid var(--line)",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.02)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "10px",
                      background: "rgba(16, 185, 129, 0.15)",
                      color: "#34d399",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "14px",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "var(--text)",
                    }}
                  >
                    {secTitle}
                  </h2>
                </div>

                <div
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "var(--muted)",
                    whiteSpace: "pre-line",
                  }}
                >
                  {secContent}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
