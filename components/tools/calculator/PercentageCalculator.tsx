"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Copy,
  Check,
  RotateCcw,
  Calculator,
  ArrowRightLeft,
} from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function PercentageCalculator() {
  const { isRTL } = useLanguage();

  // Mode 1: What is X% of Y?
  const [val1X, setVal1X] = useState<number | "">(15);
  const [val1Y, setVal1Y] = useState<number | "">(500);

  // Mode 2: X is what % of Y?
  const [val2X, setVal2X] = useState<number | "">(75);
  const [val2Y, setVal2Y] = useState<number | "">(500);

  // Mode 3: Percentage Increase/Decrease from X to Y
  const [val3X, setVal3X] = useState<number | "">(200);
  const [val3Y, setVal3Y] = useState<number | "">(250);

  const res1 = ((Number(val1X) || 0) * (Number(val1Y) || 0)) / 100;
  const res2 =
    (Number(val2Y) || 0) !== 0
      ? ((Number(val2X) || 0) / (Number(val2Y) || 1)) * 100
      : 0;

  const diff3 = (Number(val3Y) || 0) - (Number(val3X) || 0);
  const res3 =
    (Number(val3X) || 0) !== 0 ? (diff3 / (Number(val3X) || 1)) * 100 : 0;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px",
      }}
    >
      {/* Tool 1 */}
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 16px 0" }}>
          {isRTL ? "1. حساب قيمة النسبة من المبلغ:" : "1. What is X% of Y?"}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <span>{isRTL ? "كم تبلغ قيمة" : "What is"}</span>
          <input
            type="number"
            value={val1X}
            onChange={(e) =>
              setVal1X(e.target.value === "" ? "" : Number(e.target.value))
            }
            style={{
              width: "80px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
          <span>% {isRTL ? "من المبلغ" : "of"}</span>
          <input
            type="number"
            value={val1Y}
            onChange={(e) =>
              setVal1Y(e.target.value === "" ? "" : Number(e.target.value))
            }
            style={{
              width: "100px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>
        <div
          style={{
            padding: "16px",
            background: "var(--bg)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <small style={{ color: "var(--muted)", display: "block" }}>
            {isRTL ? "النتيجة:" : "Result:"}
          </small>
          <strong style={{ fontSize: "24px", color: "var(--blue)" }}>
            {res1.toLocaleString()}
          </strong>
        </div>
      </div>

      {/* Tool 2 */}
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 16px 0" }}>
          {isRTL ? "2. حساب نسبة رقم من رقم آخر:" : "2. X is what % of Y?"}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <span>{isRTL ? "العدد" : "Number"}</span>
          <input
            type="number"
            value={val2X}
            onChange={(e) =>
              setVal2X(e.target.value === "" ? "" : Number(e.target.value))
            }
            style={{
              width: "80px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
          <span>{isRTL ? "يمثل نسبة كم من" : "is what % of"}</span>
          <input
            type="number"
            value={val2Y}
            onChange={(e) =>
              setVal2Y(e.target.value === "" ? "" : Number(e.target.value))
            }
            style={{
              width: "100px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>
        <div
          style={{
            padding: "16px",
            background: "var(--bg)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <small style={{ color: "var(--muted)", display: "block" }}>
            {isRTL ? "النسبة المئوية:" : "Percentage:"}
          </small>
          <strong style={{ fontSize: "24px", color: "var(--blue)" }}>
            {res2.toFixed(2)}%
          </strong>
        </div>
      </div>

      {/* Tool 3 */}
      <div
        style={{
          background: "var(--card-bg, #ffffff)",
          border: "1px solid var(--line, #e2e8f0)",
          borderRadius: "16px",
          padding: "24px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 16px 0" }}>
          {isRTL
            ? "3. حساب نسبة الزيادة أو النقصان:"
            : "3. Percentage Increase / Decrease:"}
        </h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          <span>{isRTL ? "من" : "From"}</span>
          <input
            type="number"
            value={val3X}
            onChange={(e) =>
              setVal3X(e.target.value === "" ? "" : Number(e.target.value))
            }
            style={{
              width: "90px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
          <span>{isRTL ? "إلى" : "To"}</span>
          <input
            type="number"
            value={val3Y}
            onChange={(e) =>
              setVal3Y(e.target.value === "" ? "" : Number(e.target.value))
            }
            style={{
              width: "90px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
            }}
          />
        </div>
        <div
          style={{
            padding: "16px",
            background: "var(--bg)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <small style={{ color: "var(--muted)", display: "block" }}>
            {isRTL ? "تغير النسبة:" : "Percentage Change:"}
          </small>
          <strong
            style={{
              fontSize: "24px",
              color: res3 >= 0 ? "#16a34a" : "#dc2626",
            }}
          >
            {res3 >= 0 ? `+${res3.toFixed(2)}%` : `${res3.toFixed(2)}%`}
          </strong>
        </div>
      </div>
    </div>
  );
}
