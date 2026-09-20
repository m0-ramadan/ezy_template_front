"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Plus,
  Trash2,
  Download,
  Printer,
  RotateCcw,
  Upload,
  Globe,
} from "lucide-react";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

const CURRENCIES = ["EGP", "USD", "EUR", "GBP", "SAR", "AED", "KWD", "QAR"];

export default function InvoiceGenerator() {
  const { isRTL } = useLanguage();
  const [lang, setLang] = useState<"ar" | "en">("ar");

  // Company Details
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("شركة الحلول البرمجية");
  const [companyEmail, setCompanyEmail] = useState("info@company.com");
  const [companyPhone, setCompanyPhone] = useState("+20 100 000 0000");
  const [companyAddress, setCompanyAddress] = useState("القاهرة، مصر");
  const [companyTaxId, setCompanyTaxId] = useState("123-456-789");

  // Customer Details
  const [customerName, setCustomerName] = useState("مؤسسة الأمل للتجارة");
  const [customerEmail, setCustomerEmail] = useState("client@domain.com");
  const [customerPhone, setCustomerPhone] = useState("+20 111 222 3333");
  const [customerAddress, setCustomerAddress] = useState("الجيزة، مصر");

  // Invoice Details
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2026-0001");
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().split("T")[0],
  );
  const [currency, setCurrency] = useState("EGP");

  // Items
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "تصميم وتطوير موقع إلكتروني متجاوب",
      quantity: 1,
      unitPrice: 15000,
    },
    {
      id: "2",
      description: "خدمات الاستضافة وسيرفر لمدة سنة",
      quantity: 1,
      unitPrice: 3000,
    },
  ]);

  // Financials
  const [discountVal, setDiscountVal] = useState(5);
  const [vatPercent, setVatPercent] = useState(14);
  const [shippingFee, setShippingFee] = useState(0);

  // Notes & Terms
  const [notes, setNotes] = useState("شكراً لتعاملكم معنا!");
  const [terms, setTerms] = useState(
    "يرجى سداد قيمة الفاتورة خلال 14 يوماً من تاريخ الإصدار.",
  );

  // Calculated totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.quantity * item.unitPrice,
    0,
  );

  const discountAmount = (subtotal * discountVal) / 100;
  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const vatAmount = (afterDiscount * vatPercent) / 100;
  const grandTotal = afterDiscount + vatAmount + Number(shippingFee || 0);

  // Logo upload handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Item Handlers
  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleReset = () => {
    setCompanyName("شركة الحلول البرمجية");
    setCustomerName("مؤسسة الأمل للتجارة");
    setInvoiceNumber(`INV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setItems([
      {
        id: "1",
        description: "خدمة استشارية برمجية",
        quantity: 1,
        unitPrice: 5000,
      },
    ]);
    setDiscountVal(0);
    setVatPercent(14);
    setShippingFee(0);
  };

  const handlePrint = () => {
    window.print();
  };

  const isAr = lang === "ar";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
      {/* Action Bar Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "16px 24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              background: "var(--bg)",
              color: "var(--text)",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Globe size={16} />
            <span>{lang === "ar" ? "English Preview" : "معاينة بالعربية"}</span>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleReset}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              background: "var(--card-bg)",
              color: "var(--muted)",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={16} />
            <span>{isRTL ? "إعادة تعيين" : "Reset"}</span>
          </button>

          <button
            onClick={handlePrint}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              background: "var(--bg)",
              color: "var(--text)",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Printer size={16} />
            <span>{isRTL ? "طباعة" : "Print"}</span>
          </button>

          <button
            onClick={handlePrint}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "var(--blue, #2563eb)",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.25)",
            }}
          >
            <Download size={16} />
            <span>{isRTL ? "تحميل PDF" : "Download PDF"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form (Right) & Live Preview (Left) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Form Container */}
        <div
          style={{
            background: "var(--card-bg, #ffffff)",
            border: "1px solid var(--line, #e2e8f0)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
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
            {isRTL ? "بيانات الفاتورة" : "Invoice Form Details"}
          </h3>

          {/* Section 1: Company Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--blue)",
                margin: 0,
              }}
            >
              {isRTL ? "بيانات الشركة (البائع)" : "Company Information"}
            </h4>

            {/* Logo Input */}
            <div>
              <label
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {isRTL ? "شعار الشركة" : "Company Logo"}
              </label>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {companyLogo && (
                  <img
                    src={companyLogo}
                    alt="Logo"
                    style={{
                      height: "40px",
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
                  }}
                >
                  <Upload size={14} />
                  <span>
                    {companyLogo
                      ? isRTL
                        ? "تغيير الشعار"
                        : "Change Logo"
                      : isRTL
                        ? "رفع الشعار"
                        : "Upload Logo"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    style={{ display: "none" }}
                  />
                </label>
                {companyLogo && (
                  <button
                    onClick={() => setCompanyLogo(null)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#ef4444",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    {isRTL ? "حذف" : "Remove"}
                  </button>
                )}
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
                  {isRTL ? "اسم الشركة *" : "Company Name *"}
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
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
                  {isRTL ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
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
                  {isRTL ? "الهاتف" : "Phone"}
                </label>
                <input
                  type="text"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
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
                  {isRTL ? "الرقم الضريبي" : "Tax ID / VAT Registration"}
                </label>
                <input
                  type="text"
                  value={companyTaxId}
                  onChange={(e) => setCompanyTaxId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Customer Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--blue)",
                margin: 0,
              }}
            >
              {isRTL ? "بيانات العميل (المشتري)" : "Customer Information"}
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
                  {isRTL ? "اسم العميل / الشركة *" : "Client Name *"}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
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
                  {isRTL ? "البريد الإلكتروني" : "Email"}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Invoice Metadata & Currency */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--blue)",
                margin: 0,
              }}
            >
              {isRTL ? "تفاصيل الفاتورة والعملة" : "Invoice Metadata"}
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
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
                  {isRTL ? "رقم الفاتورة" : "Invoice No."}
                </label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
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
                  {isRTL ? "تاريخ الفاتورة" : "Invoice Date"}
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
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
                  {isRTL ? "تاريخ الاستحقاق" : "Due Date"}
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    color: "var(--text)",
                    fontSize: "13px",
                  }}
                />
              </div>
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
                {isRTL ? "العملة" : "Currency"}
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
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
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 4: Dynamic Invoice Items */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--blue)",
                  margin: 0,
                }}
              >
                {isRTL ? "بنود الفاتورة" : "Invoice Line Items"}
              </h4>
              <button
                onClick={addItem}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  background: "rgba(37, 99, 235, 0.1)",
                  color: "var(--blue)",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                <Plus size={14} />
                <span>{isRTL ? "إضافة بند" : "Add Item"}</span>
              </button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr auto",
                    gap: "8px",
                    alignItems: "center",
                    background: "var(--bg)",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                  }}
                >
                  <input
                    type="text"
                    placeholder={
                      isRTL ? "وصف الخدمة / المنتج" : "Item description"
                    }
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--line)",
                      background: "var(--card-bg)",
                      color: "var(--text)",
                      fontSize: "12px",
                    }}
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder={isRTL ? "الكمية" : "Qty"}
                    value={item.quantity}
                    onChange={(e) =>
                      updateItem(item.id, "quantity", Number(e.target.value))
                    }
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--line)",
                      background: "var(--card-bg)",
                      color: "var(--text)",
                      fontSize: "12px",
                    }}
                  />
                  <input
                    type="number"
                    min="0"
                    placeholder={isRTL ? "السعر" : "Price"}
                    value={item.unitPrice}
                    onChange={(e) =>
                      updateItem(item.id, "unitPrice", Number(e.target.value))
                    }
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "1px solid var(--line)",
                      background: "var(--card-bg)",
                      color: "var(--text)",
                      fontSize: "12px",
                    }}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      border: "none",
                      background: "none",
                      color: "#ef4444",
                      padding: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Taxes & Discounts */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
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
                {isRTL ? "الخصم (%)" : "Discount (%)"}
              </label>
              <input
                type="number"
                min="0"
                value={discountVal}
                onChange={(e) => setDiscountVal(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "13px",
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
                {isRTL ? "ضريبة VAT (%)" : "VAT Rate (%)"}
              </label>
              <input
                type="number"
                min="0"
                value={vatPercent}
                onChange={(e) => setVatPercent(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "13px",
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
                {isRTL ? "مصاريف الشحن" : "Shipping Fee"}
              </label>
              <input
                type="number"
                min="0"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--bg)",
                  color: "var(--text)",
                  fontSize: "13px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Live Invoice Preview Side */}
        <div
          id="invoice-preview-node"
          className="print-node invoice-preview-sheet"
          style={{
            background: "var(--card-bg, #ffffff)",
            color: "var(--text, #0f172a)",
            borderRadius: "16px",
            border: "1px solid var(--line, #e2e8f0)",
            padding: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            direction: isAr ? "rtl" : "ltr",
          }}
        >
          {/* Invoice Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "2px solid #2563eb",
              paddingBottom: "24px",
              marginBottom: "24px",
            }}
          >
            <div>
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt="Logo"
                  style={{ maxHeight: "60px", marginBottom: "12px" }}
                />
              ) : (
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "var(--blue, #2563eb)",
                    margin: "0 0 6px 0",
                  }}
                >
                  {companyName}
                </h2>
              )}
              <p
                style={{
                  margin: "2px 0",
                  fontSize: "13px",
                  color: "var(--muted, #64748b)",
                }}
              >
                {companyAddress}
              </p>
              <p
                style={{
                  margin: "2px 0",
                  fontSize: "13px",
                  color: "var(--muted, #64748b)",
                }}
              >
                {companyEmail} • {companyPhone}
              </p>
              {companyTaxId && (
                <p
                  style={{
                    margin: "2px 0",
                    fontSize: "12px",
                    color: "var(--muted, #64748b)",
                  }}
                >
                  Tax ID: {companyTaxId}
                </p>
              )}
            </div>

            <div style={{ textAlign: isAr ? "left" : "right" }}>
              <h1
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "var(--text, #0f172a)",
                  margin: "0 0 8px 0",
                }}
              >
                {isAr ? "فاتورة مبيعات" : "INVOICE"}
              </h1>
              <p
                style={{
                  margin: "2px 0",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--blue, #2563eb)",
                }}
              >
                #{invoiceNumber}
              </p>
              <p
                style={{
                  margin: "2px 0",
                  fontSize: "12px",
                  color: "var(--muted, #64748b)",
                }}
              >
                {isAr ? "تاريخ الإصدار:" : "Date:"} {invoiceDate}
              </p>
              <p
                style={{
                  margin: "2px 0",
                  fontSize: "12px",
                  color: "var(--muted, #64748b)",
                }}
              >
                {isAr ? "تاريخ الاستحقاق:" : "Due Date:"} {dueDate}
              </p>
            </div>
          </div>

          {/* Customer info preview */}
          <div
            style={{
              background: "var(--bg, #f8fafc)",
              borderRadius: "10px",
              padding: "16px 20px",
              marginBottom: "24px",
              border: "1px solid var(--line, #e2e8f0)",
            }}
          >
            <h4
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                color: "var(--muted, #64748b)",
                margin: "0 0 6px 0",
              }}
            >
              {isAr ? "مفوتر إلى (العميل):" : "Billed To:"}
            </h4>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 700,
                margin: "0 0 4px 0",
                color: "var(--text, #0f172a)",
              }}
            >
              {customerName}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted, #64748b)",
                margin: "2px 0",
              }}
            >
              {customerAddress}
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted, #64748b)",
                margin: "2px 0",
              }}
            >
              {customerEmail} • {customerPhone}
            </p>
          </div>

          {/* Items Table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "24px",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--blue, #2563eb)",
                  color: "#ffffff",
                  textAlign: isAr ? "right" : "left",
                }}
              >
                <th
                  style={{
                    padding: "10px 14px",
                    borderRadius: isAr ? "0 8px 8px 0" : "8px 0 0 8px",
                    fontSize: "13px",
                  }}
                >
                  {isAr ? "البند / الوصف" : "Item Description"}
                </th>
                <th
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {isAr ? "الكمية" : "Qty"}
                </th>
                <th
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    textAlign: "center",
                  }}
                >
                  {isAr ? "السعر" : "Unit Price"}
                </th>
                <th
                  style={{
                    padding: "10px 14px",
                    borderRadius: isAr ? "8px 0 0 8px" : "0 8px 8px 0",
                    fontSize: "13px",
                    textAlign: isAr ? "left" : "right",
                  }}
                >
                  {isAr ? "الإجمالي" : "Total"}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const lineTotal = item.quantity * item.unitPrice;
                return (
                  <tr
                    key={index}
                    style={{ borderBottom: "1px solid var(--line, #e2e8f0)" }}
                  >
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--text, #0f172a)",
                      }}
                    >
                      {item.description ||
                        (isAr ? "بند بدون عنوان" : "Untitled Item")}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: "13px",
                        textAlign: "center",
                        color: "var(--text, #0f172a)",
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: "13px",
                        textAlign: "center",
                        color: "var(--text, #0f172a)",
                      }}
                    >
                      {item.unitPrice.toLocaleString()} {currency}
                    </td>
                    <td
                      style={{
                        padding: "12px 14px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--text, #0f172a)",
                        textAlign: isAr ? "left" : "right",
                      }}
                    >
                      {lineTotal.toLocaleString()} {currency}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Totals Summary */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "260px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  color: "var(--muted, #64748b)",
                }}
              >
                <span>{isAr ? "المجموع الفرعي:" : "Subtotal:"}</span>
                <span>
                  {subtotal.toLocaleString()} {currency}
                </span>
              </div>
              {discountAmount > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    color: "#ef4444",
                  }}
                >
                  <span>
                    {isAr
                      ? `الخصم (${discountVal}%):`
                      : `Discount (${discountVal}%):`}
                  </span>
                  <span>
                    -{discountAmount.toLocaleString()} {currency}
                  </span>
                </div>
              )}
              {vatPercent > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    color: "var(--muted, #64748b)",
                  }}
                >
                  <span>
                    {isAr
                      ? `الضريبة (${vatPercent}%):`
                      : `VAT (${vatPercent}%):`}
                  </span>
                  <span>
                    +{vatAmount.toLocaleString()} {currency}
                  </span>
                </div>
              )}
              {shippingFee > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                    color: "var(--muted, #64748b)",
                  }}
                >
                  <span>{isAr ? "الشحن:" : "Shipping:"}</span>
                  <span>
                    +{Number(shippingFee).toLocaleString()} {currency}
                  </span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "var(--text, #0f172a)",
                  borderTop: "2px solid var(--line, #e2e8f0)",
                  paddingTop: "8px",
                  marginTop: "4px",
                }}
              >
                <span>{isAr ? "الإجمالي الكلي:" : "Grand Total:"}</span>
                <span style={{ color: "var(--blue, #2563eb)" }}>
                  {grandTotal.toLocaleString()} {currency}
                </span>
              </div>
            </div>
          </div>

          {/* Terms & Notes */}
          <div
            style={{
              borderTop: "1px solid var(--line, #e2e8f0)",
              paddingTop: "16px",
              fontSize: "12px",
              color: "var(--muted, #64748b)",
            }}
          >
            {terms && (
              <p style={{ margin: "4px 0" }}>
                <strong>{isAr ? "شروط الدفع:" : "Terms:"}</strong> {terms}
              </p>
            )}
            {notes && (
              <p style={{ margin: "4px 0" }}>
                <strong>{isAr ? "ملاحظات:" : "Notes:"}</strong> {notes}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
