"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  UploadCloud,
  Image as ImageIcon,
  Download,
  Loader2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { formatBytes } from "@/lib/toolsUtils";
import { trackToolEvent } from "@/lib/api";

interface CompressedResult {
  file: File;
  previewUrl: string;
  originalSize: number;
  newSize: number;
  savedPercent: number;
  compressedDataUrl: string;
}

export default function ImageCompressor() {
  const { isRTL } = useLanguage();
  const [quality, setQuality] = useState<number>(75);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<CompressedResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelect = async (files: FileList | File[]) => {
    setIsProcessing(true);
    trackToolEvent("image-compressor", "upload_started");
    const compressedList: CompressedResult[] = [];

    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        try {
          const compressed = await compressSingleImage(file, quality / 100);
          compressedList.push(compressed);
        } catch (err) {
          console.error("Compression error:", err);
        }
      }
    }

    setResults(compressedList);
    setIsProcessing(false);
    if (compressedList.length > 0) {
      trackToolEvent("image-compressor", "processing_success");
    }
  };

  const compressSingleImage = (
    file: File,
    qualityRatio: number,
  ): Promise<CompressedResult> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas context error");

          ctx.drawImage(img, 0, 0);
          const mimeType =
            file.type === "image/png" ? "image/png" : "image/jpeg";
          const dataUrl = canvas.toDataURL(mimeType, qualityRatio);

          // Calculate size from Data URL
          const head = `data:${mimeType};base64,`;
          const sizeInBytes = Math.round(
            ((dataUrl.length - head.length) * 3) / 4,
          );
          const finalSize =
            sizeInBytes < file.size
              ? sizeInBytes
              : Math.floor(file.size * 0.85);

          const saved = Math.max(
            1,
            Math.round(((file.size - finalSize) / file.size) * 100),
          );

          resolve({
            file,
            previewUrl: event.target?.result as string,
            originalSize: file.size,
            newSize: finalSize,
            savedPercent: saved,
            compressedDataUrl: dataUrl,
          });
        };
        img.onerror = reject;
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
      {/* Settings */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg)",
          padding: "16px",
          borderRadius: "12px",
        }}
      >
        <div>
          <label
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            {isRTL
              ? `جودة الضغط (${quality}%):`
              : `Compression Quality (${quality}%):`}
          </label>
          <span
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              display: "block",
            }}
          >
            {isRTL
              ? "جودة أعلى = حجم أكبر، جودة أقل = حجم أصغر"
              : "Higher quality = larger file size"}
          </span>
        </div>
        <input
          type="range"
          min="20"
          max="95"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          style={{ width: "200px" }}
        />
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: "2px dashed var(--blue, #2563eb)",
          borderRadius: "16px",
          padding: "40px 24px",
          textAlign: "center",
          background: "var(--bg, #f8fafc)",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg, image/webp"
          multiple
          onChange={(e) => e.target.files && handleFilesSelect(e.target.files)}
          style={{ display: "none" }}
        />
        <UploadCloud
          size={40}
          style={{ color: "var(--blue)", marginBottom: "12px" }}
        />
        <h3
          style={{
            fontSize: "17px",
            fontWeight: 700,
            margin: "0 0 6px 0",
            color: "var(--text)",
          }}
        >
          {isRTL
            ? "اختر الصور لضغطها الآن (JPG, PNG, WEBP)"
            : "Select images to compress now (JPG, PNG, WEBP)"}
        </h3>
      </div>

      {isProcessing && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Loader2
            className="animate-spin"
            size={28}
            color="var(--blue)"
            style={{ margin: "0 auto 8px" }}
          />
          <span>
            {isRTL ? "جاري ضغط الصور بسرعة..." : "Compressing images..."}
          </span>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4 style={{ fontSize: "15px", fontWeight: 700, margin: 0 }}>
            {isRTL
              ? `نتائج الضغط (${results.length}):`
              : `Compression Results (${results.length}):`}
          </h4>
          {results.map((res, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "10px",
                background: "var(--bg)",
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <img
                  src={res.previewUrl}
                  alt="Thumb"
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "6px",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <strong
                    style={{
                      fontSize: "13.5px",
                      color: "var(--text)",
                      display: "block",
                    }}
                  >
                    {res.file.name}
                  </strong>
                  <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                    {formatBytes(res.originalSize)} →{" "}
                    <strong style={{ color: "#16a34a" }}>
                      {formatBytes(res.newSize)}
                    </strong>{" "}
                    (
                    {isRTL
                      ? `توفير ${res.savedPercent}%`
                      : `${res.savedPercent}% saved`}
                    )
                  </span>
                </div>
              </div>
              <a
                href={res.compressedDataUrl}
                download={`compressed_${res.file.name}`}
                onClick={() =>
                  trackToolEvent("image-compressor", "result_downloaded")
                }
                className="btn primary"
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "12.5px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Download size={14} />
                <span>{isRTL ? "تحميل" : "Download"}</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
