"use client";

import { Calendar, Scale } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Section {
  title: string;
  title_ar?: string;
  content: string;
  content_ar?: string;
}

export interface TermsData {
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  last_updated?: string;
  sections?: Section[];
}

export default function TermsView({
  initialData,
}: {
  initialData: TermsData | null;
}) {
  const { isRTL } = useLanguage();
  const data = initialData;

  const title = isRTL
    ? data?.title_ar || "شروط الاستخدام والخدمة"
    : data?.title || "Terms of Service";
  const subtitle = isRTL
    ? data?.subtitle_ar ||
      "الشروط والأحكام وتراخيص الاستخدام المنظمة لاستخدامك لمنصة وقوالب إيزي تيمبلت."
    : data?.subtitle ||
      "Terms and conditions governing your use of EzyTemplate platform and downloaded products.";

  // Use the CMS sections only when they are reasonably complete; otherwise
  // fall back to the comprehensive in-app terms.
  const sections =
    (data?.sections?.length ?? 0) >= 4
      ? data!.sections!
      : [
    { title: "Using the website", title_ar: "استخدام الموقع", content: "Use the site lawfully and do not interfere with security, availability, accounts or other users. Automated abuse, malware, deceptive activity and attempts to bypass access controls are prohibited.", content_ar: "استخدم الموقع بشكل قانوني، ولا تتدخل في الأمان أو التوفر أو الحسابات أو حقوق الآخرين. يُمنع الإساءة الآلية والبرمجيات الضارة والخداع وتجاوز ضوابط الوصول." },
    { title: "Downloads and licences", title_ar: "التحميلات والتراخيص", content: "Each template may have separate licence terms. You must review them before use. A free download does not by itself grant ownership, commercial-use, resale or redistribution rights. Do not remove required attribution or redistribute source files unless the applicable licence expressly allows it.", content_ar: "قد يكون لكل قالب شروط ترخيص منفصلة يجب مراجعتها قبل الاستخدام. التحميل المجاني لا يمنح تلقائياً الملكية أو حق الاستخدام التجاري أو إعادة البيع أو التوزيع." },
    { title: "Copyright and reports", title_ar: "حقوق النشر والبلاغات", content: "Respect third-party intellectual property. Rights concerns can be reported under our Copyright and Takedown Policy. We may restrict or remove disputed material while reviewing a sufficiently detailed notice.", content_ar: "احترم حقوق الملكية الفكرية للغير. يمكن الإبلاغ عن المخاوف وفق سياسة حقوق النشر والإزالة، وقد نقيد المادة المتنازع عليها أثناء المراجعة." },
    { title: "Availability and third parties", title_ar: "التوفر والأطراف الخارجية", content: "Features and files may change, be corrected or become unavailable. External sites and services have their own terms and privacy practices; verify them before relying on a link or resource.", content_ar: "قد تتغير الميزات والملفات أو يتم تصحيحها أو تتوقف. للمواقع والخدمات الخارجية شروطها وممارساتها الخاصة، فتحقق منها قبل الاعتماد على أي رابط أو مورد." },
    { title: "Disclaimers, changes and contact", title_ar: "إخلاء المسؤولية والتغييرات والتواصل", content: "The site is provided on an as-available basis to the extent permitted by applicable law. Test downloaded files safely and keep backups. We may update these terms and will change the displayed date. Contact us through the Contact page with questions. These general terms are not a substitute for jurisdiction-specific legal review.", content_ar: "يُقدم الموقع حسب التوفر في حدود القانون المنطبق. اختبر الملفات بأمان واحتفظ بنسخ احتياطية. قد نحدث هذه الشروط ونغير التاريخ المعروض. تواصل معنا عبر صفحة التواصل. هذه شروط عامة وليست بديلاً عن مراجعة قانونية خاصة بدولة." },
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
              background: "rgba(99, 102, 241, 0.15)",
              color: "#818cf8",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <Scale size={16} />
            <span>{isRTL ? "الاتفاقية القانونية" : "Legal Agreement"}</span>
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
                      background: "rgba(99, 102, 241, 0.15)",
                      color: "#818cf8",
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
