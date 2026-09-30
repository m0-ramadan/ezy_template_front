"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { submitServiceRequest } from "@/lib/api";

export interface ContactData {
  title?: string;
  title_ar?: string;
  subtitle?: string;
  subtitle_ar?: string;
  email?: string;
  phone?: string;
  address?: string;
  working_hours?: string;
}

export default function ContactView({
  initialData,
}: {
  initialData: ContactData | null;
}) {
  const { isRTL } = useLanguage();
  const data = initialData;

  // Hide obvious placeholder values so unverified contact details are never
  // published. Real values must be supplied through the CMS.
  const clean = (v?: string) => {
    const s = (v || "").trim();
    if (
      !s ||
      /example\.com|100 000 0000|0000 0000|placeholder|lorem ipsum/i.test(s)
    ) {
      return "";
    }
    return s;
  };
  const email = clean(data?.email);
  const phone = clean(data?.phone);
  const address = clean(data?.address);
  const workingHours = clean(data?.working_hours);

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "General Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [website, setWebsite] = useState("");

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
      const res = await submitServiceRequest({ ...form, website });
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
            ? "حدث خطأ أثناء إرسال الرسالة."
            : "Failed to send message. Please try again.",
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

  const title = isRTL
    ? data?.title_ar || "تواصل معنا"
    : data?.title || "Contact Us";
  const subtitle = isRTL
    ? data?.subtitle_ar ||
      "يسعدنا دائماً استلام استفساراتك واقتراحاتك والرد عليها في أقرب وقت ممكن."
    : data?.subtitle ||
      "Have questions, feedback, or partnership opportunities? We would love to hear from you.";

  const contactCards = [
    email
      ? {
          key: "email",
          label: isRTL ? "البريد الإلكتروني" : "Email Us",
          icon: <Mail size={24} />,
          tint: "rgba(59, 130, 246, 0.15)",
          color: "#60a5fa",
          value: (
            <a
              href={`mailto:${email}`}
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text)",
                textDecoration: "none",
              }}
            >
              {email}
            </a>
          ),
        }
      : null,
    phone
      ? {
          key: "phone",
          label: isRTL ? "الهاتف" : "Call Us",
          icon: <Phone size={24} />,
          tint: "rgba(16, 185, 129, 0.15)",
          color: "#34d399",
          value: (
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {phone}
            </div>
          ),
        }
      : null,
    address
      ? {
          key: "address",
          label: isRTL ? "العنوان" : "Office Location",
          icon: <MapPin size={24} />,
          tint: "rgba(245, 158, 11, 0.15)",
          color: "#fbbf24",
          value: (
            <div
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {address}
            </div>
          ),
        }
      : null,
    workingHours
      ? {
          key: "hours",
          label: isRTL ? "ساعات العمل" : "Working Hours",
          icon: <Clock size={24} />,
          tint: "rgba(168, 85, 247, 0.15)",
          color: "#c084fc",
          value: (
            <div
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {workingHours}
            </div>
          ),
        }
      : null,
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    icon: React.ReactNode;
    tint: string;
    color: string;
    value: React.ReactNode;
  }>;

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
              background: "rgba(59, 130, 246, 0.15)",
              color: "#60a5fa",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            <MessageSquare size={16} />
            <span>{isRTL ? "نحن هنا لمساعدتك" : "Get in Touch"}</span>
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

        {/* CONTENT GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {/* LEFT CONTACT CARDS */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {contactCards.map((card) => (
              <div
                key={card.key}
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
                    padding: "14px",
                    borderRadius: "14px",
                    background: card.tint,
                    color: card.color,
                  }}
                >
                  {card.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      fontWeight: 600,
                    }}
                  >
                    {card.label}
                  </div>
                  {card.value}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT MESSAGE FORM */}
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
                    ? "تم إرسال رسالتك بنجاح!"
                    : "Message Sent Successfully!"}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--muted)",
                    lineHeight: 1.6,
                  }}
                >
                  {isRTL
                    ? "شكراً لتواصلك معنا. سنرد على رسالتك على البريد الإلكتروني المدخل في أسرع وقت ممكن."
                    : "Thank you for reaching out. We will respond to your email as quickly as possible."}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      service: "General Inquiry",
                      message: "",
                    });
                  }}
                  style={{
                    marginTop: "24px",
                    padding: "10px 24px",
                    borderRadius: "10px",
                    background: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {isRTL ? "إرسال رسالة أخرى" : "Send Another Message"}
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
                <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
                  <label htmlFor="contact-website">Website</label>
                  <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 800,
                    marginBottom: "4px",
                    color: "var(--text)",
                  }}
                >
                  {isRTL ? "أرسل لنا رسالة" : "Send us a Message"}
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
                    {isRTL ? "الاسم *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={isRTL ? "أدخل اسمك" : "e.g. Sarah Jenkins"}
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
                    {isRTL ? "موضوع الرسالة *" : "Message Subject / Topic *"}
                  </label>
                  <input
                    type="text"
                    value={form.service}
                    onChange={(e) =>
                      setForm({ ...form, service: e.target.value })
                    }
                    placeholder={
                      isRTL
                        ? "مثال: استفسار عن ترخيص القوالب"
                        : "e.g. Partnership Opportunity"
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
                    {isRTL ? "نص الرسالة *" : "Your Message *"}
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder={
                      isRTL ? "اكتب رسالتك هنا..." : "Type your message here..."
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
                      "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
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
                        : "Sending..."
                      : isRTL
                        ? "إرسال الرسالة"
                        : "Send Message"}
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
