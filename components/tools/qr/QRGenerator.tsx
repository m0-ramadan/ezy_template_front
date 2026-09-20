"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import QRCode from "qrcode";
import {
  Download,
  RotateCcw,
  Copy,
  Check,
  Globe,
  MessageSquare,
  Phone,
  Mail,
  MessageCircle,
  Wifi,
  FileText,
  Upload,
} from "lucide-react";

type QRType = "url" | "text" | "whatsapp" | "phone" | "email" | "sms" | "wifi";

export default function QRGenerator() {
  const { isRTL } = useLanguage();

  const [qrType, setQrType] = useState<QRType>("url");

  // Input states
  const [url, setUrl] = useState("https://ezytemplate.com");
  const [text, setText] = useState("مرحباً بكم في EzyTemplate");

  // WhatsApp
  const [waPhone, setWaPhone] = useState("+201000000000");
  const [waMessage, setWaMessage] = useState(
    "مرحباً، أود الاستفسار عن القوالب المتاحة.",
  );

  // Phone
  const [phone, setPhone] = useState("+201000000000");

  // Email
  const [email, setEmail] = useState("contact@domain.com");
  const [emailSubject, setEmailSubject] = useState("استفسار جديد");
  const [emailBody, setEmailBody] = useState("السلام عليكم ورحمة الله وبركاته");

  // SMS
  const [smsPhone, setSmsPhone] = useState("+201000000000");
  const [smsMessage, setSmsMessage] = useState("مرحباً بك!");

  // WiFi
  const [wifiSsid, setWifiSsid] = useState("MyHomeNetwork");
  const [wifiPass, setWifiPass] = useState("Pass12345");
  const [wifiType, setWifiType] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  // Customization
  const [fgColor, setFgColor] = useState("#0f172a");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [size, setSize] = useState<number>(512);
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">(
    "M",
  );
  const [logo, setLogo] = useState<string | null>(null);

  // Canvas ref for image generation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Construct raw string based on selected QRType
  const getQRRawValue = (): string => {
    switch (qrType) {
      case "url":
        return url || "https://ezytemplate.com";
      case "text":
        return text || "EzyTemplate";
      case "whatsapp":
        const cleanWa = waPhone.replace(/[^0-9]/g, "");
        return `https://wa.me/${cleanWa}?text=${encodeURIComponent(waMessage)}`;
      case "phone":
        return `tel:${phone}`;
      case "email":
        return `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "sms":
        return `smsto:${smsPhone}:${smsMessage}`;
      case "wifi":
        return `WIFI:S:${wifiSsid};T:${wifiType};P:${wifiPass};H:${wifiHidden ? "true" : "false"};;`;
      default:
        return "https://ezytemplate.com";
    }
  };

  // Render QR Code to Data URL
  useEffect(() => {
    const rawVal = getQRRawValue();
    QRCode.toDataURL(rawVal, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor,
      },
      errorCorrectionLevel: errorCorrection,
    })
      .then((urlData) => {
        if (!logo) {
          setQrDataUrl(urlData);
        } else {
          // Draw logo in center using html canvas
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              const qrImg = new Image();
              qrImg.onload = () => {
                ctx.drawImage(qrImg, 0, 0, size, size);
                // Draw white background circle for logo
                const logoSize = size * 0.22;
                const center = size / 2;
                ctx.fillStyle = bgColor;
                ctx.beginPath();
                ctx.arc(center, center, logoSize / 2 + 6, 0, Math.PI * 2);
                ctx.fill();
                // Draw logo
                ctx.drawImage(
                  img,
                  center - logoSize / 2,
                  center - logoSize / 2,
                  logoSize,
                  logoSize,
                );
                setQrDataUrl(canvas.toDataURL());
              };
              qrImg.src = urlData;
            }
          };
          img.src = logo;
        }
      })
      .catch((err) => {
        console.error("QR Code Error:", err);
      });
  }, [
    qrType,
    url,
    text,
    waPhone,
    waMessage,
    phone,
    email,
    emailSubject,
    emailBody,
    smsPhone,
    smsMessage,
    wifiSsid,
    wifiPass,
    wifiType,
    wifiHidden,
    fgColor,
    bgColor,
    size,
    errorCorrection,
    logo,
  ]);

  const handleDownload = (format: "png" | "svg") => {
    if (format === "png") {
      const link = document.createElement("a");
      link.download = `qrcode-${Date.now()}.png`;
      link.href = qrDataUrl;
      link.click();
    } else {
      const rawVal = getQRRawValue();
      QRCode.toString(rawVal, {
        type: "svg",
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: errorCorrection,
      }).then((svgString) => {
        const blob = new Blob([svgString], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.download = `qrcode-${Date.now()}.svg`;
        link.href = URL.createObjectURL(blob);
        link.click();
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getQRRawValue());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "url", label: isRTL ? "رابط موقع" : "URL", icon: Globe },
    { id: "text", label: isRTL ? "نص عادي" : "Text", icon: FileText },
    {
      id: "whatsapp",
      label: isRTL ? "واتساب" : "WhatsApp",
      icon: MessageCircle,
    },
    { id: "phone", label: isRTL ? "هاتف" : "Phone", icon: Phone },
    { id: "email", label: isRTL ? "بريد" : "Email", icon: Mail },
    { id: "sms", label: isRTL ? "رسالة SMS" : "SMS", icon: MessageSquare },
    { id: "wifi", label: isRTL ? "شبكة Wi-Fi" : "Wi-Fi", icon: Wifi },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
      {/* Type Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
          borderBottom: "1px solid var(--line, #e2e8f0)",
        }}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = qrType === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setQrType(tab.id as QRType)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "10px",
                border: active
                  ? "1px solid var(--blue, #2563eb)"
                  : "1px solid var(--line, #e2e8f0)",
                background: active
                  ? "var(--blue, #2563eb)"
                  : "var(--card-bg, #ffffff)",
                color: active ? "#ffffff" : "var(--text)",
                fontWeight: 600,
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Inputs (Left/Right) & QR Live Preview */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Form Inputs & Customizations */}
        <div
          style={{
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--line, #e2e8f0)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
              color: "var(--text)",
            }}
          >
            {isRTL ? "إدخال البيانات والتخصيص" : "QR Content & Customization"}
          </h3>

          {/* Dynamic Input fields per type */}
          {qrType === "url" && (
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {isRTL ? "رابط الموقع الإلكتروني (URL)" : "Website URL"}
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "14px",
                }}
              />
            </div>
          )}

          {qrType === "text" && (
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {isRTL ? "النص المطلق" : "Plain Text"}
              </label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  isRTL
                    ? "اكتب النص الذي تريد تشفيره هنا..."
                    : "Type text to encode..."
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
              />
            </div>
          )}

          {qrType === "whatsapp" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {isRTL
                    ? "رقم الواتساب مع كود الدولة"
                    : "WhatsApp Number with Country Code"}
                </label>
                <input
                  type="text"
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  placeholder="+201000000000"
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {isRTL ? "الرسالة الافتراضية" : "Pre-filled Message"}
                </label>
                <textarea
                  rows={3}
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>
          )}

          {qrType === "phone" && (
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {isRTL ? "رقم الهاتف" : "Phone Number"}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+201000000000"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "14px",
                }}
              />
            </div>
          )}

          {qrType === "email" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {isRTL ? "عنوان البريد الإلكتروني" : "Email Address"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {isRTL ? "موضوع الرسالة" : "Subject"}
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          )}

          {qrType === "wifi" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {isRTL ? "اسم الشبكة (SSID)" : "Network SSID"}
                </label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  {isRTL ? "كلمة المرور" : "Password"}
                </label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "14px",
                  }}
                />
              </div>
            </div>
          )}

          {/* Customization Options Divider */}
          <hr
            style={{
              border: "none",
              borderTop: "1px solid var(--line)",
              margin: "8px 0",
            }}
          />

          <h4
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--blue)",
              margin: 0,
            }}
          >
            {isRTL ? "تخصيص الشكل والألوان" : "Style & Color Customization"}
          </h4>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "لون الرمز (أمامي)" : "Foreground Color"}
              </label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                  background: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "لون الخلفية" : "Background Color"}
              </label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  cursor: "pointer",
                  background: "none",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "الدقة / الحجم" : "Resolution (px)"}
              </label>
              <select
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "13px",
                }}
              >
                <option value={256}>256 x 256 px</option>
                <option value={512}>512 x 512 px</option>
                <option value={1024}>1024 x 1024 px (HD)</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "تصحيح الأخطاء" : "Error Correction"}
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value as any)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "13px",
                }}
              >
                <option value="L">L - Low (7%)</option>
                <option value="M">M - Medium (15%)</option>
                <option value="Q">Q - Quartile (25%)</option>
                <option value="H">H - High (30%)</option>
              </select>
            </div>
          </div>

          {/* Logo Option */}
          <div>
            <label
              style={{
                fontSize: "12px",
                color: "var(--muted)",
                display: "block",
                marginBottom: "6px",
              }}
            >
              {isRTL
                ? "إضافة شعار بالمنتصف (اختياري)"
                : "Center Logo (Optional)"}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "36px",
                    height: "36px",
                    objectFit: "contain",
                    borderRadius: "6px",
                  }}
                />
              )}
              <label
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "1px dashed var(--line)",
                  background: "var(--bg)",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "var(--text)",
                }}
              >
                <Upload size={14} />
                <span>
                  {logo
                    ? isRTL
                      ? "تغيير الشعار"
                      : "Change"
                    : isRTL
                      ? "رفع شعار"
                      : "Upload Logo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
              </label>
              {logo && (
                <button
                  onClick={() => setLogo(null)}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#ef4444",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  {isRTL ? "إزالة" : "Remove"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Preview & Downloads */}
        <div
          style={{
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--line, #e2e8f0)",
            borderRadius: "16px",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderRadius: "16px",
              background: bgColor,
              border: "1px solid var(--line, #e2e8f0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            }}
          >
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt="Generated QR Code"
                style={{
                  width: "240px",
                  height: "240px",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "240px",
                  height: "240px",
                  background: "var(--bg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                }}
              >
                Loading QR...
              </div>
            )}
          </div>

          {/* Live Data String Display */}
          <div
            style={{
              width: "100%",
              background: "var(--bg)",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              fontSize: "12px",
              color: "var(--muted)",
              wordBreak: "break-all",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {getQRRawValue()}
            </span>
            <button
              onClick={handleCopy}
              style={{
                border: "none",
                background: "none",
                color: "var(--blue)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "11px",
                fontWeight: 700,
              }}
            >
              {copied ? (
                <Check size={14} className="text-emerald-500" />
              ) : (
                <Copy size={14} />
              )}
              <span>
                {copied
                  ? isRTL
                    ? "تم النسخ!"
                    : "Copied!"
                  : isRTL
                    ? "نسخ"
                    : "Copy"}
              </span>
            </button>
          </div>

          {/* Action Download Buttons */}
          <div style={{ display: "flex", gap: "12px", width: "100%" }}>
            <button
              onClick={() => handleDownload("png")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "10px",
                border: "none",
                background: "var(--blue, #2563eb)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
              }}
            >
              <Download size={16} />
              <span>{isRTL ? "تنزيل PNG" : "Download PNG"}</span>
            </button>

            <button
              onClick={() => handleDownload("svg")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                background: "var(--bg)",
                color: "var(--text)",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              <Download size={16} />
              <span>{isRTL ? "تنزيل SVG" : "Download SVG"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
