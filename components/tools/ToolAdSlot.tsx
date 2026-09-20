"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ToolAdSlot({
  placement = "below-tool",
}: {
  placement?: string;
}) {
  const { isRTL } = useLanguage();

  return (
    <div
      className="tool-ad-slot"
      style={{
        margin: "32px 0",
        padding: "16px",
        borderRadius: "14px",
        background: "var(--card-bg, #ffffff)",
        border: "1px dashed var(--line, #cbd5e1)",
        textAlign: "center",
        color: "var(--muted, #64748b)",
        fontSize: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
      }}
    >
      <span
        style={{
          fontSize: "10px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {isRTL ? "مساحة إعلانية" : "ADVERTISEMENT"}
      </span>
      {/* Safe AdSense Responsive Container Slot */}
      <div
        style={{
          minHeight: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        <span>
          {isRTL ? "مكان مخصص للإعلانات الآمنة" : "Safe Ad Placement Slot"}
        </span>
      </div>
    </div>
  );
}
