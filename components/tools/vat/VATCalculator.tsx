"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Copy,
  Check,
  RotateCcw,
  Calculator,
  ArrowRightLeft,
} from "lucide-react";
import { formatCurrencyAmount } from "@/lib/toolsUtils";

type VATMode = "add" | "remove";

const CURRENCIES = ["EGP", "SAR", "AED", "USD", "EUR", "GBP"];
const PRESET_RATES = [5, 10, 14, 15, 20];

export default function VATCalculator() {
  const { isRTL } = useLanguage();
  const [mode, setMode] = useState<VATMode>("add");

  const [amount, setAmount] = useState<number | "">(1000);
  const [vatRate, setVatRate] = useState<number>(14);
  const [currency, setCurrency] = useState<string>("EGP");

  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Perform accurate VAT calculations
  const results = useMemo(() => {
    const numAmount = Number(amount) || 0;
    const rate = Number(vatRate) || 0;

    if (mode === "add") {
      // Net -> Gross
      const net = numAmount;
      const vat = (net * rate) / 100;
      const gross = net + vat;
      return { net, vat, gross };
    } else {
      // Gross -> Net
      const gross = numAmount;
      const net = gross / (1 + rate / 100);
      const vat = gross - net;
      return { net, vat, gross };
    }
  }, [mode, amount, vatRate]);

  const handleCopy = (val: number, label: string) => {
    navigator.clipboard.writeText(val.toFixed(2));
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleReset = () => {
    setAmount(1000);
    setVatRate(14);
    setCurrency("EGP");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "32px",
        alignItems: "start",
      }}
    >
      {/* Input Form Box */}
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
        {/* Mode Switch Tabs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            background: "var(--bg, #f8fafc)",
            padding: "4px",
            borderRadius: "10px",
            border: "1px solid var(--line, #e2e8f0)",
          }}
        >
          <button
            onClick={() => setMode("add")}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background:
                mode === "add" ? "var(--blue, #2563eb)" : "transparent",
              color: mode === "add" ? "#ffffff" : "var(--text)",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {isRTL ? "إضافة الضريبة (قبل الضريبة)" : "Add VAT (Net Price)"}
          </button>

          <button
            onClick={() => setMode("remove")}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background:
                mode === "remove" ? "var(--blue, #2563eb)" : "transparent",
              color: mode === "remove" ? "#ffffff" : "var(--text)",
              fontWeight: 700,
              fontSize: "13.5px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {isRTL
              ? "استخراج الضريبة (شامل الضريبة)"
              : "Extract VAT (Gross Price)"}
          </button>
        </div>

        {/* Input Amount */}
        <div>
          <label
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              color: "var(--text)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {mode === "add"
              ? isRTL
                ? "السعر الصافي (قبل الضريبة)"
                : "Net Price (Excl. VAT)"
              : isRTL
                ? "السعر الإجمالي (شامل الضريبة)"
                : "Gross Total (Incl. VAT)"}
          </label>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="1000"
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                background: "var(--bg)",
                color: "var(--text)",
                fontSize: "16px",
                fontWeight: 700,
                outline: "none",
              }}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid var(--line)",
                background: "var(--bg)",
                color: "var(--text)",
                fontSize: "14px",
                fontWeight: 600,
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

        {/* Preset Rates & Custom Rate */}
        <div>
          <label
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              color: "var(--text)",
              display: "block",
              marginBottom: "8px",
            }}
          >
            {isRTL ? "نسبة ضريبة القيمة المضافة (VAT %)" : "VAT Tax Rate (%)"}
          </label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "12px",
            }}
          >
            {PRESET_RATES.map((rate) => {
              const active = vatRate === rate;
              return (
                <button
                  key={rate}
                  onClick={() => setVatRate(rate)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "8px",
                    border: active
                      ? "1px solid var(--blue, #2563eb)"
                      : "1px solid var(--line, #e2e8f0)",
                    background: active ? "rgba(37, 99, 235, 0.1)" : "var(--bg)",
                    color: active ? "var(--blue, #2563eb)" : "var(--text)",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {rate}%
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {isRTL ? "نسبة مخصصة:" : "Custom rate:"}
            </span>
            <input
              type="number"
              min="0"
              step="0.1"
              value={vatRate}
              onChange={(e) => setVatRate(Number(e.target.value))}
              style={{
                width: "100px",
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid var(--line)",
                background: "var(--bg)",
                color: "var(--text)",
                fontSize: "13px",
                fontWeight: 600,
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--text)",
              }}
            >
              %
            </span>
          </div>
        </div>

        <button
          onClick={handleReset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid var(--line)",
            background: "var(--bg)",
            color: "var(--muted)",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "8px",
          }}
        >
          <RotateCcw size={14} />
          <span>{isRTL ? "إعادة تعيين الحقول" : "Reset Fields"}</span>
        </button>
      </div>

      {/* Results Display Box */}
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Calculator size={22} className="text-blue-500" />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: 0,
              color: "var(--text)",
            }}
          >
            {isRTL ? "نتائج الحساب اللحظية" : "Live VAT Calculation Result"}
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Net Amount Result */}
          <div
            style={{
              background: "var(--bg, #f8fafc)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid var(--line, #e2e8f0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  display: "block",
                }}
              >
                {isRTL
                  ? "السعر قبل الضريبة (الصافي)"
                  : "Net Amount (Excl. VAT)"}
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--text)",
                }}
              >
                {results.net.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {currency}
              </span>
            </div>
            <button
              onClick={() => handleCopy(results.net, "net")}
              style={{
                border: "none",
                background: "none",
                color: "var(--blue)",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              {copiedField === "net" ? (
                <Check size={18} className="text-emerald-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>

          {/* VAT Value Result */}
          <div
            style={{
              background: "rgba(37, 99, 235, 0.05)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid rgba(37, 99, 235, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--blue)",
                  fontWeight: 600,
                  display: "block",
                }}
              >
                {isRTL
                  ? `قيمة الضريبة المضافة (${vatRate}%)`
                  : `VAT Amount (${vatRate}%)`}
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--blue)",
                }}
              >
                +
                {results.vat.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {currency}
              </span>
            </div>
            <button
              onClick={() => handleCopy(results.vat, "vat")}
              style={{
                border: "none",
                background: "none",
                color: "var(--blue)",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              {copiedField === "vat" ? (
                <Check size={18} className="text-emerald-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>

          {/* Gross Amount Result */}
          <div
            style={{
              background: "var(--bg, #f8fafc)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid var(--line, #e2e8f0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--muted)",
                  display: "block",
                }}
              >
                {isRTL
                  ? "السعر الإجمالي (شامل الضريبة)"
                  : "Gross Total (Incl. VAT)"}
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "var(--text)",
                }}
              >
                {results.gross.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {currency}
              </span>
            </div>
            <button
              onClick={() => handleCopy(results.gross, "gross")}
              style={{
                border: "none",
                background: "none",
                color: "var(--blue)",
                cursor: "pointer",
                padding: "6px",
              }}
            >
              {copiedField === "gross" ? (
                <Check size={18} className="text-emerald-500" />
              ) : (
                <Copy size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
