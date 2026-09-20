"use client";

import { useEffect, useState } from "react";
import {
  Wrench,
  CheckCircle2,
  Clock,
  DollarSign,
  Send,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getCustomPageContent, submitServiceRequest } from "@/lib/api";
import PageLoader from "@/components/PageLoader";

interface CustomRequestsData {
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  starting_price?: string;
  turn_around?: string;
  features?: string[];
}

export default function CustomRequestsPage() {
  const { isRTL } = useLanguage();
  const [data, setData] = useState<CustomRequestsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Custom Template Design",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    getCustomPageContent("custom_requests")
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
            ? "حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً."
            : "Failed to submit request. Please try again.",
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
    ? data?.title_ar || "طلبات القوالب الخاصة"
    : data?.title || "Custom Template Requests";
  const subtitle = isRTL
    ? data?.subtitle_ar ||
      "تصميم وبرمجة قوالب مخصصة بالكامل تناسب احتياجات عملك ومواصفاتك الفنية."
    : data?.subtitle ||
      "Get a bespoke, high-performance template tailored specifically for your business requirements.";

  const features = data?.features || [
    "Full source code ownership",
    "Clean & documented Next.js / Tailwind code",
    "Responsive across all screens & browsers",
    "SEO & performance optimized",
    "Dedicated post-launch support",
  ];

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
              background: "rgba(168, 85, 247, 0.15)",
              color: "#c084fc",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <Sparkles size={16} />
            <span>{isRTL ? "خدمة حسب الطلب" : "Tailored Solutions"}</span>
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

        {/* TWO COLUMN CONTENT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {/* LEFT: INFO & FEATURES */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            {/* BADGES */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div
                style={{
                  background: "var(--card-bg)",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ color: "#34d399", marginBottom: "8px" }}>
                  <DollarSign size={24} />
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {isRTL ? "السعر يبدأ من" : "Starting Price"}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  {data?.starting_price || "$99"}
                </div>
              </div>

              <div
                style={{
                  background: "var(--card-bg)",
                  padding: "20px",
                  borderRadius: "16px",
                  border: "1px solid var(--line)",
                }}
              >
                <div style={{ color: "#818cf8", marginBottom: "8px" }}>
                  <Clock size={24} />
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {isRTL ? "مدة التنفيذ" : "Turnaround Time"}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "var(--text)",
                  }}
                >
                  {data?.turn_around || "3 - 5 Days"}
                </div>
              </div>
            </div>

            {/* WHAT'S INCLUDED */}
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
                  marginBottom: "20px",
                  color: "var(--text)",
                }}
              >
                {isRTL ? "مميزات طلب قوالب خاصة" : "What is Included?"}
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <CheckCircle2
                      size={20}
                      style={{
                        color: "#34d399",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "15px",
                        color: "var(--text)",
                        lineHeight: 1.5,
                      }}
                    >
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FORM */}
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
                    ? "تم استلام طلبك بنجاح!"
                    : "Request Submitted Successfully!"}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {isRTL
                    ? "شكراً لتواصلك معنا. سيقوم فريقنا بمراجعة تفاصيل طلبك والتواصل معك عبر البريد الإلكتروني في أقرب وقت."
                    : "Thank you for reaching out. Our design team will review your specifications and get back to you shortly."}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      service: "Custom Template Design",
                      budget: "",
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
                  {isRTL ? "إرسال طلب آخر" : "Submit Another Request"}
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
                  {isRTL ? "قدم تفاصيل طلبك" : "Request a Quote"}
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
                    {isRTL ? "الاسم الكامل *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isRTL ? "أدخل اسمك" : "e.g. John Doe"}
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
                      ? "الميزانية المتاحة (اختياري)"
                      : "Estimated Budget (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) =>
                      setForm({ ...form, budget: e.target.value })
                    }
                    placeholder={
                      isRTL ? "مثال: $100 - $300" : "e.g. $100 - $300"
                    }
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
                    {isRTL ? "تفاصيل الطلب *" : "Project Details & Specs *"}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder={
                      isRTL
                        ? "اشرح الفكرة والتصاميم أو الصفحات المطلوبة بالتفصيل..."
                        : "Describe the features, layout requirements, or reference links..."
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
                      "linear-gradient(135deg, #a855f7 0%, #6366f1 100%)",
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
                        ? "جاري الإرسال..."
                        : "Submitting..."
                      : isRTL
                        ? "إرسال الطلب الآن"
                        : "Submit Custom Request"}
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
