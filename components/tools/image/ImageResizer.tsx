"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { UploadCloud, Download, Maximize2, RotateCcw } from "lucide-react";
import { trackToolEvent } from "@/lib/api";

const PRESETS = [
  { label: "Instagram Post (1080x1080)", width: 1080, height: 1080 },
  { label: "Instagram Story (1080x1920)", width: 1080, height: 1920 },
  { label: "Facebook Cover (820x312)", width: 820, height: 312 },
  { label: "YouTube Thumbnail (1280x720)", width: 1280, height: 720 },
  { label: "A4 Printable (2480x3508)", width: 2480, height: 3508 },
];

export default function ImageResizer() {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);

  const [targetWidth, setTargetWidth] = useState<number>(1080);
  const [targetHeight, setTargetHeight] = useState<number>(1080);
  const [keepAspect, setKeepAspect] = useState(true);
  const [format, setFormat] = useState<"jpeg" | "png" | "webp">("jpeg");
  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) return;
    const url = URL.createObjectURL(selectedFile);
    const img = new Image();
    img.onload = () => {
      setOrigWidth(img.width);
      setOrigHeight(img.height);
      setTargetWidth(img.width);
      setTargetHeight(img.height);
    };
    img.src = url;
    setFile(selectedFile);
    setPreview(url);
    setResizedDataUrl(null);
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (keepAspect && origWidth > 0) {
      const ratio = origHeight / origWidth;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (keepAspect && origHeight > 0) {
      const ratio = origWidth / origHeight;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
    setKeepAspect(false);
  };

  const handleResize = () => {
    if (!preview) return;
    trackToolEvent("image-resizer", "upload_started");
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      const mime = `image/${format}`;
      const url = canvas.toDataURL(mime, 0.9);
      setResizedDataUrl(url);
      trackToolEvent("image-resizer", "processing_success");
    };
    img.src = preview;
  };

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
      }}
    >
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: "2px dashed var(--blue, #2563eb)",
            borderRadius: "16px",
            padding: "48px 24px",
            textAlign: "center",
            background: "var(--bg, #f8fafc)",
            cursor: "pointer",
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleFileSelect(e.target.files[0])
            }
            style={{ display: "none" }}
          />
          <UploadCloud
            size={40}
            style={{ color: "var(--blue)", marginBottom: "12px" }}
          />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              margin: "0 0 6px 0",
              color: "var(--text)",
            }}
          >
            {isRTL
              ? "اختر الصورة لتغيير حجمها وأبعادها"
              : "Select image to resize"}
          </h3>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Preset Buttons */}
          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: 700,
                display: "block",
                marginBottom: "8px",
              }}
            >
              {isRTL ? "مقاسات جاهزة للسوشيال ميديا:" : "Social Media Presets:"}
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => applyPreset(p.width, p.height)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    border: "1px solid var(--line)",
                    background: "var(--bg)",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Width & Height Inputs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              alignItems: "end",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "العرض (Width px):" : "Width (px):"}
              </label>
              <input
                type="number"
                value={targetWidth}
                onChange={(e) => handleWidthChange(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "الارتفاع (Height px):" : "Height (px):"}
              </label>
              <input
                type="number"
                value={targetHeight}
                onChange={(e) => handleHeightChange(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                {isRTL ? "الصيغة المستخرجة:" : "Output Format:"}
              </label>
              <select
                value={format}
                onChange={(e: any) => setFormat(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              >
                <option value="jpeg">JPG / JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
          </div>

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
              checked={keepAspect}
              onChange={(e) => setKeepAspect(e.target.checked)}
            />
            <span>
              {isRTL
                ? "الحفاظ على تناسب الطول والعرض (Aspect Ratio)"
                : "Maintain Aspect Ratio"}
            </span>
          </label>

          <button
            onClick={handleResize}
            className="btn primary"
            style={{
              padding: "14px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {isRTL ? "تغيير وتصدير الحجم الجديد" : "Resize & Generate Image"}
          </button>

          {resizedDataUrl && (
            <div
              style={{
                padding: "20px",
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <img
                src={resizedDataUrl}
                alt="Resized"
                style={{
                  maxWidth: "100%",
                  maxHeight: "250px",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />
              <br />
              <a
                href={resizedDataUrl}
                download={`resized_${targetWidth}x${targetHeight}.${format}`}
                onClick={() =>
                  trackToolEvent("image-resizer", "result_downloaded")
                }
                className="btn primary"
                style={{
                  padding: "12px 24px",
                  borderRadius: "10px",
                  background: "#16a34a",
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Download size={16} />
                <span>
                  {isRTL
                    ? "تحميل الصورة بالمقاس الجديد"
                    : "Download Resized Image"}
                </span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
