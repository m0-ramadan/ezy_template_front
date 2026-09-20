"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Landmark, Calculator, RefreshCw } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function LoanEMICalculator() {
  const { isRTL } = useLanguage();
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenureYears, setTenureYears] = useState(5);

  trackToolEvent("loan-emi-calculator", "use_tool");

  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const p = loanAmount;
  const r = interestRate / 12 / 100;
  const n = tenureYears * 12;

  const emi =
    r > 0 ? (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;

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
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}
      >
        {/* Input Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              {isRTL ? "مبلغ القرض / التمويل:" : "Loan Amount:"}
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                fontSize: "16px",
                fontWeight: 700,
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              {isRTL
                ? "نسبة الفائدة السنوية (%):"
                : "Annual Interest Rate (%):"}
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                fontSize: "16px",
                fontWeight: 700,
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "8px",
              }}
            >
              {isRTL ? "مدة السداد بالسنوات:" : "Tenure (Years):"}
            </label>
            <input
              type="number"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                fontSize: "16px",
                fontWeight: 700,
              }}
            />
          </div>
        </div>

        {/* Results Box */}
        <div
          style={{
            background: "var(--bg, #f8fafc)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <div>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {isRTL ? "القسط الشهري المتوقع (EMI):" : "Monthly EMI Payment:"}
            </span>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "var(--blue)",
              }}
            >
              {Math.round(emi).toLocaleString()} {isRTL ? "ج.م" : "EGP"}
            </div>
          </div>

          <div
            style={{ borderTop: "1px dashed var(--line)", paddingTop: "14px" }}
          >
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {isRTL ? "إجمالي الفائدة المستحقة:" : "Total Interest Payable:"}
            </span>
            <div
              style={{ fontSize: "20px", fontWeight: 700, color: "#dc2626" }}
            >
              {Math.round(totalInterest).toLocaleString()}{" "}
              {isRTL ? "ج.م" : "EGP"}
            </div>
          </div>

          <div
            style={{ borderTop: "1px dashed var(--line)", paddingTop: "14px" }}
          >
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {isRTL
                ? "إجمالي التكلفة الكلية مع الفائدة:"
                : "Total Amount Payable:"}
            </span>
            <div
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              {Math.round(totalPayment).toLocaleString()}{" "}
              {isRTL ? "ج.م" : "EGP"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
