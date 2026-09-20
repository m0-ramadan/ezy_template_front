"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Plus, Trash2, Printer } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function QuoteGenerator() {
  const { isRTL } = useLanguage();
  const [clientName, setClientName] = useState("شركة المستقبل للتطوير");
  const [quoteNumber, setQuoteNumber] = useState("QUO-2026-01");
  const [validUntil, setValidUntil] = useState("2026-10-01");
  const [items, setItems] = useState([
    { id: "1", desc: "استشارات تقنية وتصميم نظام", qty: 1, price: 5000 },
  ]);

  trackToolEvent("quote-generator", "use_tool");

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div
      style={{
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {isRTL ? "اسم العميل / الشركة:" : "Client Name:"}
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {isRTL ? "رقم عرض السعر:" : "Quote Number:"}
          </label>
          <input
            type="text"
            value={quoteNumber}
            onChange={(e) => setQuoteNumber(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>
      </div>

      {/* Items Table */}
      <div style={{ marginBottom: "24px" }}>
        <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>
          {isRTL ? "بنود عرض السعر:" : "Quote Line Items:"}
        </h4>
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr 1fr 40px",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              value={item.desc}
              onChange={(e) => {
                const next = [...items];
                next[index].desc = e.target.value;
                setItems(next);
              }}
              placeholder={isRTL ? "وصف الخدمة أو المنتج" : "Description"}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
              }}
            />
            <input
              type="number"
              value={item.qty}
              onChange={(e) => {
                const next = [...items];
                next[index].qty = Number(e.target.value);
                setItems(next);
              }}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
              }}
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) => {
                const next = [...items];
                next[index].price = Number(e.target.value);
                setItems(next);
              }}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
              }}
            />
            <button
              onClick={() => setItems(items.filter((_, i) => i !== index))}
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            setItems([
              ...items,
              { id: Date.now().toString(), desc: "", qty: 1, price: 0 },
            ])
          }
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            background: "var(--bg)",
            border: "1px solid var(--line)",
            fontWeight: 600,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Plus size={16} />
          {isRTL ? "إضافة بند آخر" : "Add Item"}
        </button>
      </div>

      {/* Subtotal */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: "1px solid var(--line)",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: 800 }}>
          {isRTL ? "الإجمالي الكلي:" : "Total Estimate:"}{" "}
          {subtotal.toLocaleString()} {isRTL ? "ج.م" : "EGP"}
        </div>
        <button
          onClick={() => window.print()}
          style={{
            padding: "12px 24px",
            borderRadius: "10px",
            background: "var(--blue)",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Printer size={18} />
          {isRTL ? "طباعة / تصدير PDF" : "Print / Export PDF"}
        </button>
      </div>
    </div>
  );
}
