"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { KeyRound, Copy, Check, RefreshCw } from "lucide-react";

export default function PasswordGenerator() {
  const { isRTL } = useLanguage();
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (useUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!charset) {
      setPassword("");
      return;
    }

    let res = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      res += charset[array[i] % charset.length];
    }
    setPassword(res);
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrengthLabel = () => {
    if (length < 8)
      return { label: isRTL ? "ضعيفة" : "Weak", color: "#dc2626" };
    if (length < 12)
      return { label: isRTL ? "متوسطة" : "Medium", color: "#eab308" };
    return { label: isRTL ? "قوية جداً" : "Very Strong", color: "#16a34a" };
  };

  const strength = getStrengthLabel();

  return (
    <div
      style={{
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--line, #e2e8f0)",
        borderRadius: "16px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      {/* Generated Password Box */}
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: "12px",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: "1px",
            color: "var(--text)",
            wordBreak: "break-all",
          }}
        >
          {password ||
            (isRTL
              ? "حدد خياراً واحداً على الأقل"
              : "Select at least 1 option")}
        </span>
        <div style={{ display: "flex", gap: "6px" }}>
          <button
            onClick={generatePassword}
            style={{
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid var(--line)",
              background: "var(--card-bg)",
              cursor: "pointer",
            }}
            title={isRTL ? "إعادة توليد" : "Regenerate"}
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={handleCopy}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              background: "var(--blue)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>
              {copied
                ? isRTL
                  ? "تم النسخ"
                  : "Copied"
                : isRTL
                  ? "نسخ"
                  : "Copy"}
            </span>
          </button>
        </div>
      </div>

      {/* Strength Indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "13px",
        }}
      >
        <span>{isRTL ? "قوة كلمة المرور:" : "Password Strength:"}</span>
        <strong style={{ color: strength.color }}>{strength.label}</strong>
      </div>

      {/* Length Slider */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            fontSize: "13.5px",
            fontWeight: 700,
          }}
        >
          <span>{isRTL ? "طول كلمة السر:" : "Password Length:"}</span>
          <strong style={{ color: "var(--blue)" }}>
            {length} {isRTL ? "حرف" : "chars"}
          </strong>
        </div>
        <input
          type="range"
          min="6"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      {/* Toggles */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={useUpper}
            onChange={(e) => setUseUpper(e.target.checked)}
          />
          <span>{isRTL ? "أحرف كبيرة (A-Z)" : "Uppercase (A-Z)"}</span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={useLower}
            onChange={(e) => setUseLower(e.target.checked)}
          />
          <span>{isRTL ? "أحرف صغيرة (a-z)" : "Lowercase (a-z)"}</span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={(e) => setUseNumbers(e.target.checked)}
          />
          <span>{isRTL ? "أرقام (0-9)" : "Numbers (0-9)"}</span>
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={(e) => setUseSymbols(e.target.checked)}
          />
          <span>{isRTL ? "رموز خاصة (!@#$)" : "Symbols (!@#$)"}</span>
        </label>
      </div>
    </div>
  );
}
