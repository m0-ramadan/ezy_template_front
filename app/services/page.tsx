"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  Settings,
  Code2,
  Smartphone,
  Paintbrush,
  LifeBuoy,
  Users,
  ShieldCheck,
  Zap,
  Award,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  Send,
  User,
  Mail,
  DollarSign,
  Layers,
  MessageSquare,
} from "lucide-react";
import {
  getServicesContent,
  submitServiceRequest,
  getAssetUrl,
} from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

const iconMap: Record<string, any> = {
  Settings,
  Code2,
  Smartphone,
  Paintbrush,
  LifeBuoy,
  Users,
  ShieldCheck,
  Zap,
  Award,
};

export default function Services() {
  const { t, isRTL } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Service Request form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Template Customization",
    budget: "$100 - $500",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);

  useEffect(() => {
    getServicesContent()
      .then(setData)
      .catch(() => {});
  }, []);

  async function handleSubmitRequest(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitting(true);
    setSubmitResult(null);
    try {
      const res = await submitServiceRequest(formData);
      if (res.ok) {
        setSubmitResult({
          ok: true,
          msg: t("services_form_success"),
        });
        setFormData({
          name: "",
          email: "",
          service: isRTL ? "تخصيص وتعديل القوالب" : "Template Customization",
          budget: "$100 - $500",
          message: "",
        });
      } else {
        setSubmitResult({
          ok: false,
          msg:
            res.message ||
            (isRTL
              ? "فشل إرسال الطلب، يرجى المحاولة مرة أخرى."
              : "Failed to submit request. Please try again."),
        });
      }
    } catch {
      setSubmitResult({
        ok: false,
        msg: isRTL
          ? "حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى."
          : "Network error occurred. Please try again.",
      });
    }
    setSubmitting(false);
  }

  const hero = useMemo(() => {
    if (data?.hero) {
      return {
        eyebrow: isRTL
          ? data.hero.eyebrow_ar || data.hero.eyebrow || t("services_eyebrow")
          : data.hero.eyebrow || data.hero.eyebrow_ar || t("services_eyebrow"),
        title: isRTL
          ? data.hero.title_ar || data.hero.title || t("services_title_1")
          : data.hero.title || data.hero.title_ar || t("services_title_1"),
        highlight_text: isRTL
          ? data.hero.highlight_text_ar ||
            data.hero.highlight_text ||
            t("services_title_2")
          : data.hero.highlight_text ||
            data.hero.highlight_text_ar ||
            t("services_title_2"),
        lead: isRTL
          ? data.hero.lead_ar || data.hero.lead || t("services_lead")
          : data.hero.lead || data.hero.lead_ar || t("services_lead"),
        hero_image: data.hero.hero_image || "/assets/services-hero.png",
        btn_primary_text: isRTL
          ? data.hero.btn_primary_text_ar || `${t("services_btn_start")} ←`
          : data.hero.btn_primary_text || `${t("services_btn_start")} →`,
        btn_primary_url: data.hero.btn_primary_url || "#request-service",
        btn_secondary_text: isRTL
          ? data.hero.btn_secondary_text_ar || t("services_btn_faq")
          : data.hero.btn_secondary_text || t("services_btn_faq"),
        btn_secondary_url: data.hero.btn_secondary_url || "#faq",
      };
    }
    return {
      eyebrow: t("services_eyebrow"),
      title: t("services_title_1"),
      highlight_text: t("services_title_2"),
      lead: t("services_lead"),
      hero_image: "/assets/services-hero.png",
      btn_primary_text: `${t("services_btn_start")} ${isRTL ? "←" : "→"}`,
      btn_primary_url: "#request-service",
      btn_secondary_text: t("services_btn_faq"),
      btn_secondary_url: "#faq",
    };
  }, [data, isRTL, t]);

  const trustBadges = useMemo(() => {
    if (data?.trust_badges?.length) {
      return data.trust_badges.map((b: any) => ({
        icon: b.icon,
        title: isRTL ? b.title_ar || b.title : b.title || b.title_ar,
        subtitle: isRTL
          ? b.subtitle_ar || b.subtitle
          : b.subtitle || b.subtitle_ar,
      }));
    }
    return [
      {
        icon: "ShieldCheck",
        title: isRTL ? "موثوق ومضمون" : "Trusted & Reliable",
        subtitle: isRTL ? "جودة عالية في الموعد" : "Quality work, on time",
      },
      {
        icon: "Zap",
        title: isRTL ? "تسليم سريع" : "Fast Delivery",
        subtitle: isRTL
          ? "إنجاز مشروعك بسرعة فائقة"
          : "Get your project done quickly",
      },
      {
        icon: "Award",
        title: isRTL ? "ضمان الرضا" : "Satisfaction Guarantee",
        subtitle: isRTL
          ? "نعمل حتى تكون راضياً 100%"
          : "We're not happy until you are",
      },
    ];
  }, [data, isRTL]);

  const defaultServices = useMemo(
    () => [
      {
        icon: "Settings",
        title: isRTL ? "تخصيص وتعديل القوالب" : "Template Customization",
        description: isRTL
          ? "هل تحتاج لتعديل قالب؟ نقوم بتخصيصه وتكييفه ليتطابق مع هويتك ومتطلباتك بدقة."
          : "Need changes to a template? We customize it to match your brand and requirements.",
      },
      {
        icon: "Code2",
        title: isRTL ? "تطوير مواقع كاملة" : "Full Website Development",
        description: isRTL
          ? "بناء وتطوير موقع إلكتروني متكامل من الصفر أو باستخدام قوالبنا الجاهزة."
          : "Get a complete website built using our templates or from scratch.",
      },
      {
        icon: "Smartphone",
        title: isRTL ? "تحويل التصاميم إلى كود" : "Website Conversion",
        description: isRTL
          ? "تحويل تصاميم Figma أو XD إلى أكواد نظيفة في Laravel أو Next.js أو React."
          : "Convert your design to Laravel, Next.js, React or another technology.",
      },
      {
        icon: "Paintbrush",
        title: isRTL ? "تصميم واجهات المستخدم UI/UX" : "UI/UX Design",
        description: isRTL
          ? "تصميم واجهات عصرية وجذابة وسهلة الاستخدام لموقعك أو تطبيقك الرقمي."
          : "Get modern, user-friendly designs for your website or web application.",
      },
      {
        icon: "LifeBuoy",
        title: isRTL ? "التثبيت والإعداد على السيرفر" : "Installation & Setup",
        description: isRTL
          ? "تثبيت وضبط القالب أو الموقع بالكامل على استضافتك وسيرفرك بأمان."
          : "We'll install and configure your template or complete website on your server.",
      },
      {
        icon: "Users",
        title: isRTL ? "الدعم الفني والصيانة المستمرة" : "Ongoing Support",
        description: isRTL
          ? "نقدم المساعدة بعد التسليم من خلال الصيانة الدورية والتحديثات والدعم الفني."
          : "We help after delivery with ongoing maintenance, updates and support.",
      },
    ],
    [isRTL],
  );

  const servicesList = useMemo(() => {
    if (data?.services?.length) {
      return data.services.map((s: any) => ({
        icon: s.icon,
        title: isRTL ? s.title_ar || s.title : s.title || s.title_ar,
        description: isRTL
          ? s.description_ar || s.description
          : s.description || s.description_ar,
      }));
    }
    return defaultServices;
  }, [data, isRTL, defaultServices]);

  const defaultWhyUs = useMemo(
    () => ({
      eyebrow: t("services_why_eyebrow"),
      title: t("services_why_title"),
      lead: t("services_why_lead"),
      image: "/assets/services-why.png",
      bullets: [
        t("services_why_b1"),
        t("services_why_b2"),
        t("services_why_b3"),
        t("services_why_b4"),
        t("services_why_b5"),
      ],
    }),
    [t],
  );

  const whyUs = useMemo(() => {
    if (data?.why_us) {
      return {
        eyebrow: isRTL
          ? data.why_us.eyebrow_ar ||
            data.why_us.eyebrow ||
            t("services_why_eyebrow")
          : data.why_us.eyebrow ||
            data.why_us.eyebrow_ar ||
            t("services_why_eyebrow"),
        title: isRTL
          ? data.why_us.title_ar || data.why_us.title || t("services_why_title")
          : data.why_us.title ||
            data.why_us.title_ar ||
            t("services_why_title"),
        lead: isRTL
          ? data.why_us.lead_ar || data.why_us.lead || t("services_why_lead")
          : data.why_us.lead || data.why_us.lead_ar || t("services_why_lead"),
        image: data.why_us.image || "/assets/services-why.png",
        bullets: isRTL
          ? data.why_us.bullets_ar ||
            data.why_us.bullets ||
            defaultWhyUs.bullets
          : data.why_us.bullets ||
            data.why_us.bullets_ar ||
            defaultWhyUs.bullets,
      };
    }
    return defaultWhyUs;
  }, [data, isRTL, t, defaultWhyUs]);

  const defaultProcess = useMemo(
    () => [
      {
        step: 1,
        title: isRTL ? "أخبرنا باحتياجاتك" : "Tell Us What You Need",
        description: isRTL
          ? "املأ نموذج طلب الخدمة السريع بمواصفات مشروعك ومتطلباتك."
          : "Fill out our quick service request form with your project specifications and requirements.",
      },
      {
        step: 2,
        title: isRTL ? "الحصول على عرض سعر" : "Get a Quote",
        description: isRTL
          ? "ندرس متطلباتك ونقدم لك خطة مخصصة بجدول زمني وسعر دقيق."
          : "We review your needs and provide a tailored plan with accurate timeline and cost.",
      },
      {
        step: 3,
        title: isRTL ? "بدء التنفيذ والإنجاز" : "We Get To Work",
        description: isRTL
          ? "يقوم خبراؤنا بالبناء والتطوير مع إرسال تحديثات مستمرة خطوة بخطوة."
          : "Our developers and designers craft your solution with regular updates along the way.",
      },
      {
        step: 4,
        title: isRTL ? "التسليم والدعم الفني" : "Delivery & Support",
        description: isRTL
          ? "تسليم مشروعك جاهزاً مع دعم فني مستمر لضمان أعلى أداء."
          : "Clear communication and dependable delivery at every step.",
      },
    ],
    [isRTL],
  );

  const process = useMemo(() => {
    if (data?.process?.length) {
      return data.process.map((p: any, i: number) => ({
        step: p.step || i + 1,
        title: isRTL ? p.title_ar || p.title : p.title || p.title_ar,
        description: isRTL
          ? p.description_ar || p.description
          : p.description || p.description_ar,
      }));
    }
    return defaultProcess;
  }, [data, isRTL, defaultProcess]);

  const defaultFaqs = useMemo(
    () => [
      {
        question: isRTL
          ? "كم تبلغ تكلفة تطوير أو تعديل الموقع؟"
          : "How much does a custom website cost?",
        answer: isRTL
          ? "تعتمد التكلفة على حجم المشروع وتعقيده والمدة المطلوبة. تواصل معنا للحصول على عرض سعر مخصص ودقيق."
          : "Pricing depends on project scope, complexity, and timeline. Contact us for an accurate custom quote.",
      },
      {
        question: isRTL
          ? "كم من الوقت يستغرق إنجاز المشروع؟"
          : "How long does it take to complete a project?",
        answer: isRTL
          ? "التعديلات البسيطة تستغرق من 1 إلى 3 أيام عمل. بينما المواقع المتكاملة تستغرق عادة من أسبوع إلى 3 أسابيع."
          : "Small customizations take 1-3 business days. Full custom websites usually take 1 to 3 weeks.",
      },
      {
        question: isRTL
          ? "هل تقدمون دعماً فنياً بعد التسليم؟"
          : "Do you provide support after delivery?",
        answer: isRTL
          ? "نعم، تتضمن جميع باقات الخدمات جولات مراجعة ودعماً فنياً مخصصاً بعد التسليم لضمان رضاك التام."
          : "Yes, every service package includes post-delivery revision rounds and dedicated support.",
      },
      {
        question: isRTL
          ? "هل يمكنكم العمل على تصميماتي الخاصة؟"
          : "Can you work with my existing design?",
        answer: isRTL
          ? "بالتأكيد! يمكننا تحويل ملفات Figma أو Adobe XD أو Sketch أو أي كود موجود لديك إلى موقع جاهز للعمل."
          : "Absolutely! We can work with Figma, Sketch, Adobe XD, or any existing source code.",
      },
      {
        question: isRTL
          ? "ما هي التقنيات التي تعملون بها؟"
          : "What technologies do you work with?",
        answer: isRTL
          ? "نحن متخصصون في Laravel، Next.js، React، Tailwind CSS، TypeScript، و WordPress."
          : "We specialize in Laravel, Next.js, React, Tailwind CSS, TypeScript, and WordPress.",
      },
    ],
    [isRTL],
  );

  const faqs = useMemo(() => {
    if (data?.faqs?.length) {
      return data.faqs.map((f: any) => ({
        question: isRTL
          ? f.question_ar || f.question
          : f.question || f.question_ar,
        answer: isRTL ? f.answer_ar || f.answer : f.answer || f.answer_ar,
      }));
    }
    return defaultFaqs;
  }, [data, isRTL, defaultFaqs]);

  return (
    <main>
      <section className="services-hero">
        <div className="container about-grid">
          <div>
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1>
              {hero.title}
              <br />
              <span className="gradient-text">{hero.highlight_text}</span>
            </h1>
            <p className="lead">{hero.lead}</p>
            <div className="buttons-inline">
              <Link
                className="smallprimary"
                href={hero.btn_primary_url || "#request-service"}
              >
                {hero.btn_primary_text ||
                  `${t("services_btn_start")} ${isRTL ? "←" : "→"}`}
              </Link>
              <Link className="outline" href={hero.btn_secondary_url || "#faq"}>
                {hero.btn_secondary_text || t("services_btn_faq")}
              </Link>
            </div>
            <div className="trust-row">
              {trustBadges.map((b: any, idx: number) => {
                const Icon = iconMap[b.icon] || ShieldCheck;
                return (
                  <span key={idx}>
                    <Icon />
                    <b>{b.title}</b>
                    <small>{b.subtitle}</small>
                  </span>
                );
              })}
            </div>
          </div>
          <img
            src={getAssetUrl(hero.hero_image || "/assets/services-hero.png")}
            alt="Services"
          />
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>{isRTL ? "خدماتنا المتاحة" : "Our Services"}</h2>
          <Link className="view" href="#request-service">
            {isRTL ? "طلب خدمة مخصصة ←" : "Request a Custom Service →"}
          </Link>
        </div>
        <div className="service-grid">
          {servicesList.map((s: any, idx: number) => {
            const Icon = iconMap[s.icon] || Settings;
            return (
              <div className="service-card" key={idx}>
                <div className="service-icon">
                  <Icon />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <Link
                  className="view"
                  href="#request-service"
                  onClick={() => setFormData({ ...formData, service: s.title })}
                >
                  {isRTL ? "طلب هذه الخدمة ←" : "Request This Service →"}
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container why">
        <img
          src={getAssetUrl(whyUs.image || "/assets/services-why.png")}
          alt="Why Choose Us"
        />
        <div>
          <span className="eyebrow">
            {whyUs.eyebrow || t("services_why_eyebrow")}
          </span>
          <h2>{whyUs.title || t("services_why_title")}</h2>
          <p className="lead">{whyUs.lead}</p>
          <ul>
            {whyUs.bullets?.map((x: string) => (
              <li key={x}>●　{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <div>
            <span className="eyebrow">
              {isRTL ? "مراحل العمل" : "Our Process"}
            </span>
            <h2>
              {isRTL
                ? "بسيطة وسلسة من البداية للنهاية"
                : "Simple From Start to Finish"}
            </h2>
          </div>
        </div>
        <div className="process">
          {process.map((p: any, i: number) => (
            <div className="process-item" key={i}>
              <div className="num">{p.step || i + 1}</div>
              <div>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
              </div>
              {i < process.length - 1 && (
                <ArrowRight
                  style={{ transform: isRTL ? "rotate(180deg)" : undefined }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Service Request Form */}
      <section
        className="container section"
        id="request-service"
        style={{ scrollMarginTop: "100px" }}
      >
        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
            background: "var(--card-bg)",
            border: "1px solid var(--line)",
            borderRadius: "20px",
            padding: "40px 32px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "50px",
                background: "rgba(99, 102, 241, 0.12)",
                color: "#818cf8",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "12px",
              }}
            >
              <Send size={14} />
              <span>{isRTL ? "تواصل معنا مباشرة" : "Get In Touch"}</span>
            </div>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--text)",
                margin: "0 0 8px",
              }}
            >
              {t("services_form_title")}
            </h2>
            <p
              style={{
                fontSize: "15px",
                color: "var(--muted)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {t("services_form_subtitle")}
            </p>
          </div>

          {submitResult && (
            <div
              style={{
                marginBottom: "28px",
                padding: "16px 20px",
                borderRadius: "12px",
                background: submitResult.ok
                  ? "rgba(16, 185, 129, 0.12)"
                  : "rgba(239, 68, 68, 0.12)",
                color: submitResult.ok ? "#34d399" : "#f87171",
                border: `1px solid ${
                  submitResult.ok
                    ? "rgba(16, 185, 129, 0.3)"
                    : "rgba(239, 68, 68, 0.3)"
                }`,
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {submitResult.ok && <CheckCircle2 size={20} />}
              <span>{submitResult.msg}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmitRequest}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text)",
                }}
              >
                {t("services_form_name")} *
              </label>
              <div style={{ position: "relative" }}>
                <User
                  size={18}
                  style={{
                    position: "absolute",
                    [isRTL ? "right" : "left"]: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                  }}
                />
                <input
                  type="text"
                  style={{
                    width: "100%",
                    height: "46px",
                    padding: isRTL ? "0 44px 0 14px" : "0 14px 0 44px",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={isRTL ? "محمد أحمد" : "Ahmed Ali"}
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text)",
                }}
              >
                {t("services_form_email")} *
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  style={{
                    position: "absolute",
                    [isRTL ? "right" : "left"]: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                  }}
                />
                <input
                  type="email"
                  style={{
                    width: "100%",
                    height: "46px",
                    padding: isRTL ? "0 44px 0 14px" : "0 14px 0 44px",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text)",
                }}
              >
                {t("services_form_service")}
              </label>
              <div style={{ position: "relative" }}>
                <Layers
                  size={18}
                  style={{
                    position: "absolute",
                    [isRTL ? "right" : "left"]: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                />
                <select
                  style={{
                    width: "100%",
                    height: "46px",
                    padding: isRTL ? "0 44px 0 14px" : "0 14px 0 44px",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                >
                  {servicesList.map((s: any, idx: number) => (
                    <option key={idx} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text)",
                }}
              >
                {t("services_form_budget")}
              </label>
              <div style={{ position: "relative" }}>
                <DollarSign
                  size={18}
                  style={{
                    position: "absolute",
                    [isRTL ? "right" : "left"]: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--muted)",
                    pointerEvents: "none",
                  }}
                />
                <select
                  style={{
                    width: "100%",
                    height: "46px",
                    padding: isRTL ? "0 44px 0 14px" : "0 14px 0 44px",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                >
                  <option value="Under $100">
                    {isRTL ? "أقل من 100$" : "Under $100"}
                  </option>
                  <option value="$100 - $500">$100 - $500</option>
                  <option value="$500 - $1,500">$500 - $1,500</option>
                  <option value="$1,500+">$1,500+</option>
                </select>
              </div>
            </div>

            <div style={{ gridColumn: "1/-1" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  color: "var(--text)",
                }}
              >
                {t("services_form_message")} *
              </label>
              <div style={{ position: "relative" }}>
                <MessageSquare
                  size={18}
                  style={{
                    position: "absolute",
                    [isRTL ? "right" : "left"]: "14px",
                    top: "16px",
                    color: "var(--muted)",
                  }}
                />
                <textarea
                  style={{
                    width: "100%",
                    height: "120px",
                    padding: isRTL
                      ? "12px 44px 12px 14px"
                      : "12px 14px 12px 44px",
                    borderRadius: "12px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.6,
                  }}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder={
                    isRTL
                      ? "اشرح تفاصيل مشروعك، الموعد النهائي المطلوب، أو أي قوالب ترغب في تخصيصها..."
                      : "Describe your project, deadlines, any templates you want customized..."
                  }
                  required
                />
              </div>
            </div>

            <div
              style={{
                gridColumn: "1/-1",
                textAlign: isRTL ? "left" : "right",
                marginTop: "8px",
              }}
            >
              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: "100%",
                  padding: "14px 28px",
                  fontSize: "15px",
                  fontWeight: 700,
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #2563eb 100%)",
                  color: "#ffffff",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.3)",
                  opacity: submitting ? 0.7 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                <Send size={18} />
                <span>
                  {submitting
                    ? isRTL
                      ? "جاري الإرسال..."
                      : "Sending Request..."
                    : t("services_form_submit")}
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="container faq-section" id="faq">
        <div>
          <span className="eyebrow">
            {isRTL ? "الأسئلة المتكررة" : "Frequently Asked Questions"}
          </span>
          <h2>{isRTL ? "هل لديك أي استفسار؟" : "Have Questions?"}</h2>
          <p className="lead">
            {isRTL
              ? "إليك إجابات سريعة على أكثر الأسئلة شيوعاً حول خدماتنا."
              : "Find quick answers to common questions about our services."}
          </p>
          <Link className="outline" href="#request-service">
            {isRTL ? "طرح استفسار مخصص ←" : "Ask a Custom Question →"}
          </Link>
        </div>
        <div className="faq">
          {faqs.map((f: any, idx: number) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  gap: isOpen ? "8px" : "0",
                  transition: "all .2s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{f.question}</span>
                  {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                </div>
                {isOpen && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="faq-help">
          <LifeBuoy />
          <h3>{isRTL ? "ما زال لديك استفسارات؟" : "Still Have Questions?"}</h3>
          <p>
            {isRTL
              ? "نحن هنا لمساعدتك دائماً. تواصل مع فريقنا وسنرد عليك في أقرب وقت."
              : "We're here to help. Contact our team and we'll get back to you as soon as possible."}
          </p>
          <Link className="smallprimary" href="#request-service">
            {isRTL ? "طلب عرض سعر ←" : "Request a Quote →"}
          </Link>
        </div>
      </section>
    </main>
  );
}
