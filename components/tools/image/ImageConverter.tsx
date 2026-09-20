"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  UploadCloud,
  Download,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";
import { trackToolEvent } from "@/lib/api";

export default function ImageConverter() {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<"png" | "jpeg" | "webp">(
    "png",
  );
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setConvertedUrl(null);
  };

  const handleConvert = () => {
    if (!file || !preview) return;
    setIsProcessing(true);
    trackToolEvent("image-converter", "use_tool");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        if (targetFormat === "jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);
        const mimeType = `image/${targetFormat}`;
        const dataUrl = canvas.toDataURL(mimeType, 0.92);
        setConvertedUrl(dataUrl);
      }
      setIsProcessing(false);
    };
    img.src = preview;
  };

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
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) =>
          e.target.files?.[0] && handleFileSelect(e.target.files[0])
        }
      />

      {!preview ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: "2px dashed var(--blue, #2563eb)",
            borderRadius: "16px",
            padding: "48px 24px",
            textAlign: "center",
            cursor: "pointer",
            background: "rgba(37, 99, 235, 0.02)",
          }}
        >
          <UploadCloud
            size={48}
            className="text-blue-500"
            style={{ margin: "0 auto 16px" }}
          />
          <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px" }}>
            {isRTL ? "اختر صورة لتحويل صيغتها" : "Select Image to Convert"}
          </h3>
          <p style={{ fontSize: "14px", color: "var(--muted)", margin: 0 }}>
            {isRTL
              ? "يدعم صيغ JPG, PNG, WEBP, GIF, SVG"
              : "Supports JPG, PNG, WEBP, GIF, SVG"}
          </p>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "24px",
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                {isRTL ? "الصورة الأصلية:" : "Original Image:"}
              </p>
              <img
                src={preview}
                alt="Original"
                style={{
                  maxHeight: "220px",
                  borderRadius: "12px",
                  objectFit: "contain",
                  border: "1px solid var(--line)",
                  width: "100%",
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <label style={{ fontWeight: 600, fontSize: "14px" }}>
                {isRTL ? "اختر الصيغة المستهدفة:" : "Target Format:"}
              </label>
              <div style={{ display: "flex", gap: "12px" }}>
                {(["png", "jpeg", "webp"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setTargetFormat(fmt)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      borderRadius: "10px",
                      border:
                        targetFormat === fmt
                          ? "2px solid var(--blue)"
                          : "1px solid var(--line)",
                      background:
                        targetFormat === fmt
                          ? "rgba(37,99,235,0.08)"
                          : "var(--bg)",
                      fontWeight: 700,
                      color:
                        targetFormat === fmt ? "var(--blue)" : "var(--text)",
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    {fmt === "jpeg" ? "JPG" : fmt}
                  </button>
                ))}
              </div>

              <button
                onClick={handleConvert}
                disabled={isProcessing}
                style={{
                  marginTop: "12px",
                  padding: "14px",
                  borderRadius: "12px",
                  background: "var(--blue, #2563eb)",
                  color: "#fff",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <RefreshCw
                  size={18}
                  className={isProcessing ? "animate-spin" : ""}
                />
                {isRTL ? "تحويل الصيغة الآن" : "Convert Format Now"}
              </button>
            </div>
          </div>

          {convertedUrl && (
            <div
              style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: "1px dashed var(--line)",
              }}
            >
              <a
                href={convertedUrl}
                download={`converted-image.${targetFormat === "jpeg" ? "jpg" : targetFormat}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  borderRadius: "12px",
                  background: "#16a34a",
                  color: "#ffffff",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <Download size={20} />
                {isRTL
                  ? `تحميل الصورة بصيغة (${targetFormat.toUpperCase()})`
                  : `Download Image (${targetFormat.toUpperCase()})`}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
