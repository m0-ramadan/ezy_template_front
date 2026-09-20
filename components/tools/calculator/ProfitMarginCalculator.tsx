"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TrendingUp, DollarSign, Percent } from "lucide-react";

export default function ProfitMarginCalculator() {
  const { isRTL } = useLanguage();
  const [cost, setCost] = useState<number | "">(100);
  const [sellingPrice, setSellingPrice] = useState<number | "">(150);

  const numCost = Number(cost) || 0;
  const numPrice = Number(sellingPrice) || 0;

  const profit = numPrice - numCost;
  const marginPercent = numPrice > 0 ? (profit / numPrice) * 100 : 0;
  const markupPercent = numCost > 0 ? (profit / numCost) * 100 : 0;

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
            {isRTL ? "تكلـفة المنتج (Cost Price):" : "Cost Price:"}
          </label>
          <input
            type="number"
            value={cost}
            onChange={(e) =>
              setCost(e.target.value === "" ? "" : Number(e.target.value))
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
            {isRTL ? "سعر البيع (Revenue / Selling Price):" : "Selling Price:"}
          </label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) =>
              setSellingPrice(
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
          {isRTL ? "نتائج الربح والمحيط المالي:" : "Profit & Margin Results:"}
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
          <span>
            {isRTL ? "صافي الأرباح (Gross Profit):" : "Gross Profit:"}
          </span>
          <strong
            style={{
              fontSize: "20px",
              color: profit >= 0 ? "#16a34a" : "#dc2626",
            }}
          >
            {profit.toLocaleString()}
          </strong>
        </div>

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
          <span>
            {isRTL ? "هامش الربح (Profit Margin %):" : "Profit Margin:"}
          </span>
          <strong style={{ fontSize: "20px", color: "var(--blue)" }}>
            {marginPercent.toFixed(2)}%
          </strong>
        </div>

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
          <span>{isRTL ? "نسبة الزيادة (Markup %):" : "Markup:"}</span>
          <strong style={{ fontSize: "20px", color: "#7c3aed" }}>
            {markupPercent.toFixed(2)}%
          </strong>
        </div>
      </div>
    </div>
  );
}
