"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Tag, DollarSign, Percent } from "lucide-react";

export default function DiscountCalculator() {
  const { isRTL } = useLanguage();
  const [originalPrice, setOriginalPrice] = useState<number | "">(500);
  const [discountPercent, setDiscountPercent] = useState<number | "">(20);

  const price = Number(originalPrice) || 0;
  const discount = Number(discountPercent) || 0;

  const savings = (price * discount) / 100;
  const finalPrice = Math.max(0, price - savings);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "28px",
        alignItems: "start",
      }}
    >
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <label
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              display: "block",
              marginBottom: "6px",
            }}
          >
            {isRTL ? "السعر الأصلي للمنتج:" : "Original Price:"}
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) =>
              setOriginalPrice(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              background: "var(--card-bg)",
              color: "var(--text)",
            }}
          />
        </div>
        <div>
          <label
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              display: "block",
              marginBottom: "6px",
            }}
          >
            {isRTL ? "نسبة الخصم والتخفيض (%):" : "Discount Percentage (%):"}
          </label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) =>
              setDiscountPercent(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid var(--line)",
              background: "var(--card-bg)",
              color: "var(--text)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 700,
            margin: 0,
            color: "var(--text)",
          }}
        >
          {isRTL ? "تفاصيل السعر والتوفير:" : "Final Price & Savings:"}
        </h3>

        <div
          style={{
            padding: "16px",
            background: "var(--bg)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>{isRTL ? "مقدار التوفير (Savings):" : "You Save:"}</span>
          <strong style={{ fontSize: "20px", color: "#dc2626" }}>
            -{savings.toLocaleString()}
          </strong>
        </div>

        <div
          style={{
            padding: "16px",
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 700, color: "#166534" }}>
            {isRTL ? "السعر النهائي الشامل (Final Price):" : "Final Price:"}
          </span>
          <strong style={{ fontSize: "24px", color: "#16a34a" }}>
            {finalPrice.toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
}
