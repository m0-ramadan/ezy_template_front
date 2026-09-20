"use client";

import { useEffect, useState } from "react";
import {
  LifeBuoy,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Send,
  FileText,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCustomPageContent, submitServiceRequest } from "@/lib/api";
import PageLoader from "@/components/PageLoader";

interface SupportData {
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  response_time?: string;
  status?: string;
}

export default function TechnicalSupportPage() {
  const { isRTL } = useLanguage();
  const [data, setData] = useState<SupportData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Technical Support",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    getCustomPageContent("support")
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setErrorMsg(
        isRTL
          ? "يرجى ملء جميع الحقول المطلوبة."
          : "Please fill out all required fields.",
      );
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await submitServiceRequest(form);
      if (
        res &&
        (res.id ||
          res.message ||
          res.status === "success" ||
          res.success !== false)
      ) {
        setSubmitted(true);
      } else {
        setErrorMsg(
          isRTL
            ? "حدث خطأ أثناء تقديم تذكرة الدعم."
            : "Failed to submit ticket. Please try again.",
        );
      }
    } catch (err) {
      setErrorMsg(
        isRTL ? "تعذر الاتصال بالسيرفر." : "Network error. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;

  const title = isRTL
    ? data?.title_ar || "الدعم الفني والتقني"
    : data?.title || "Technical Support";
  const subtitle = isRTL
    ? data?.subtitle_ar ||
      "فريقنا الهندسي متواجد على مدار الساعة لمساعدتك في حل أي المشكلات والرد على استفساراتك التقنية."
    : data?.subtitle ||
      "Our engineering team is ready to assist you with installation, customization, and troubleshooting.";

  return (
    <div style={{ minHeight: "85vh", padding: "40px 16px 80px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
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
            <LifeBuoy size={16} />
            <span>{isRTL ? "24/7 مساعدة متواصلة" : "24/7 Assistance"}</span>
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
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* TOP STATUS CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "var(--card-bg)",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
              }}
            >
              <Clock size={24} />
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                {isRTL ? "متوسط سرعة الاستجابة" : "Avg. Response Time"}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--text)",
                }}
              >
                {data?.response_time || "< 2 Hours"}
              </div>
            </div>
          </div>

          <div
            style={{
              background: "var(--card-bg)",
              padding: "24px",
              borderRadius: "16px",
              border: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderRadius: "12px",
                background: "rgba(99, 102, 241, 0.15)",
                color: "#818cf8",
              }}
            >
              <Zap size={24} />
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "var(--muted)" }}>
                {isRTL ? "حالة النظام والخدمات" : "System Status"}
              </div>
              <div
                style={{ fontSize: "18px", fontWeight: 800, color: "#34d399" }}
              >
                {data?.status || "All Systems Operational"}
              </div>
            </div>
          </div>
        </div>

        {/* TWO COLUMN SUPPORT & TICKET */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {/* SUPPORT GUIDANCE */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                background: "var(--card-bg)",
                padding: "28px",
                borderRadius: "20px",
                border: "1px solid var(--line)",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--text)",
                }}
              >
                <FileText size={20} style={{ color: "#818cf8" }} />
                <span>
                  {isRTL
                    ? "كيفية التجهيز قبل تقديم تذكرة"
                    : "Before Submitting a Ticket"}
                </span>
              </h3>
              <ul
                style={{
                  paddingLeft: isRTL ? 0 : "20px",
                  paddingRight: isRTL ? "20px" : 0,
                  color: "var(--muted)",
                  fontSize: "14px",
                  lineHeight: 1.8,
                }}
              >
                <li>
                  {isRTL
                    ? "تأكد من مراجعة صفحة الأسئلة الشائعة."
                    : "Check our FAQ page for instant answers to common issues."}
                </li>
                <li>
                  {isRTL
                    ? "يرجى ذكر اسم القالب وإصدار Next.js / Node المستخدَم."
                    : "Include your template name and environment details (Node version, Next.js)."}
                </li>
                <li>
                  {isRTL
                    ? "ارفاق نص الخطأ (Error Console output) لسرعة الحل."
                    : "Provide exact console error messages or stack traces if applicable."}
                </li>
              </ul>
            </div>

            <div
              style={{
                background: "var(--card-bg)",
                padding: "28px",
                borderRadius: "20px",
                border: "1px solid var(--line)",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "var(--text)",
                }}
              >
                <ShieldAlert size={20} style={{ color: "#fbbf24" }} />
                <span>
                  {isRTL ? "ضمان الدعم والضمانات" : "Support Guarantee"}
                </span>
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}
              >
                {isRTL
                  ? "نضمن تقديم الدعم الفني لكافة القوالب المشتراة أو المحمّلة لضمان تشغيلها بدون أي أخطاء برمجية."
                  : "We guarantee technical support for all downloaded templates to ensure they run bug-free in your environment."}
              </p>
            </div>
          </div>

          {/* TICKET FORM */}
          <div
            style={{
              background: "var(--card-bg)",
              padding: "32px",
              borderRadius: "20px",
              border: "1px solid var(--line)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            {submitted ? (
              <div style={{ textAlign: "center", padding: "40px 10px" }}>
                <CheckCircle2
                  size={56}
                  style={{ color: "#34d399", margin: "0 auto 16px" }}
                />
                <h3
                  style={{
                    fontSize: "22px",
                    fontWeight: 800,
                    marginBottom: "10px",
                    color: "var(--text)",
                  }}
                >
                  {isRTL
                    ? "تم فتح تذكرة الدعم بنجاح!"
                    : "Ticket Submitted Successfully!"}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {isRTL
                    ? "قام النظام بتسجيل تذكرتك. سيتواصل معك أحد مهندسينا عبر الإيميل في أقرب وقت."
                    : "Your support request has been logged. An engineer will respond to your email shortly."}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      service: "Technical Support",
                      message: "",
                    });
                  }}
                  style={{
                    marginTop: "24px",
                    padding: "10px 24px",
                    borderRadius: "10px",
                    background: "#6366f1",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {isRTL ? "إرسال استفسار آخر" : "Submit Another Ticket"}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    marginBottom: "4px",
                    color: "var(--text)",
                  }}
                >
                  {isRTL ? "فتح تذكرة دعم جديدة" : "Open a Support Ticket"}
                </h3>

                {errorMsg && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid #ef4444",
                      color: "#f87171",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      fontSize: "14px",
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "6px",
                      color: "var(--text)",
                    }}
                  >
                    {isRTL ? "الاسم *" : "Your Name *"}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isRTL ? "أدخل اسمك" : "e.g. Alex Smith"}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                      background: "var(--card-bg)",
                      color: "var(--text)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "6px",
                      color: "var(--text)",
                    }}
                  >
                    {isRTL ? "البريد الإلكتروني *" : "Email Address *"}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder={isRTL ? "name@domain.com" : "name@example.com"}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                      background: "var(--card-bg)",
                      color: "var(--text)",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "13px",
                      fontWeight: 600,
                      marginBottom: "6px",
                      color: "var(--text)",
                    }}
                  >
                    {isRTL
                      ? "توضيح المشكلة أو الاستفسار *"
                      : "Problem Description / Issue *"}
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder={
                      isRTL
                        ? "اشرح المشكلة بالتفصيل والخطوات لإعادتها..."
                        : "Describe the issue, error codes, and steps to reproduce..."
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "10px",
                      border: "1px solid var(--line)",
                      background: "var(--card-bg)",
                      color: "var(--text)",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: submitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  <Send size={18} />
                  <span>
                    {submitting
                      ? isRTL
                        ? "جاري التقديم..."
                        : "Submitting..."
                      : isRTL
                        ? "تقديم التذكرة"
                        : "Submit Support Ticket"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
