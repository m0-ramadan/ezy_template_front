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
  Trash2,
} from "lucide-react";
import { jsPDF } from "jspdf";
import { trackToolEvent } from "@/lib/api";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

export default function ImageToPDF() {
  const { isRTL } = useLanguage();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [orientation, setOrientation] = useState<"p" | "l">("p");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImagesSelect = (files: FileList | File[]) => {
    const newItems: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          previewUrl: URL.createObjectURL(file),
        });
      }
    });
    setImages((prev) => [...prev, ...newItems]);
    setPdfUrl(null);
  };

  const handleGenerate = async () => {
    if (images.length === 0) return;
    setIsProcessing(true);
    trackToolEvent("image-to-pdf", "upload_started");

    try {
      const doc = new jsPDF({
        orientation: orientation,
        unit: "mm",
        format: pageSize === "a4" ? "a4" : "a4",
      });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) doc.addPage();
        const img = images[i];
        const dataUrl = await fileToDataUrl(img.file);
        const imgProperties = doc.getImageProperties(dataUrl);

        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();

        let w = pdfWidth;
        let h = (imgProperties.height * pdfWidth) / imgProperties.width;

        if (h > pdfHeight) {
          h = pdfHeight;
          w = (imgProperties.width * pdfHeight) / imgProperties.height;
        }

        const x = (pdfWidth - w) / 2;
        const y = (pdfHeight - h) / 2;

        doc.addImage(dataUrl, "JPEG", x, y, w, h);
      }

      const blob = doc.output("blob");
      setPdfUrl(URL.createObjectURL(blob));
      trackToolEvent("image-to-pdf", "processing_success", {
        output_size_bytes: blob.size,
      });
    } catch (err) {
      console.error("Image to PDF error:", err);
      trackToolEvent("image-to-pdf", "processing_failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
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
      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: "2px dashed var(--blue, #2563eb)",
          borderRadius: "16px",
          padding: "36px 24px",
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
          onChange={(e) => e.target.files && handleImagesSelect(e.target.files)}
          style={{ display: "none" }}
        />
        <UploadCloud
          size={36}
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
            ? "اختر الصور أو اسحبها هنا (JPG, PNG, WEBP)"
            : "Select images or drop them here (JPG, PNG, WEBP)"}
        </h3>
      </div>

      {images.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: "12px",
            }}
          >
            {images.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  position: "relative",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid var(--line)",
                  height: "110px",
                }}
              >
                <img
                  src={item.previewUrl}
                  alt="Upload"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <button
                  onClick={() =>
                    setImages(images.filter((x) => x.id !== item.id))
                  }
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "4px",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
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
                {isRTL ? "حجم الصفحة:" : "Page Size:"}
              </label>
              <select
                value={pageSize}
                onChange={(e: any) => setPageSize(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              >
                <option value="a4">A4 Page</option>
                <option value="fit">Fit Image</option>
              </select>
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
                {isRTL ? "اتجاه الصفحة:" : "Orientation:"}
              </label>
              <select
                value={orientation}
                onChange={(e: any) => setOrientation(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              >
                <option value="p">
                  {isRTL ? "عمودي (Portrait)" : "Portrait"}
                </option>
                <option value="l">
                  {isRTL ? "أفقي (Landscape)" : "Landscape"}
                </option>
              </select>
            </div>
          </div>

          {!pdfUrl ? (
            <button
              onClick={handleGenerate}
              disabled={isProcessing}
              className="btn primary"
              style={{
                padding: "14px",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "15px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {isProcessing ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Sparkles size={18} />
              )}
              <span>
                {isProcessing
                  ? isRTL
                    ? "جاري تحويل الصور..."
                    : "Converting Images..."
                  : isRTL
                    ? "إنشاء ملف PDF الآن"
                    : "Generate PDF Document"}
              </span>
            </button>
          ) : (
            <div
              style={{
                padding: "20px",
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <CheckCircle
                size={32}
                color="#16a34a"
                style={{ margin: "0 auto 8px" }}
              />
              <h4 style={{ color: "#166534", margin: "0 0 12px 0" }}>
                {isRTL
                  ? "تم تحويل الصور إلى PDF بنجاح!"
                  : "Images Converted to PDF Successfully!"}
              </h4>
              <a
                href={pdfUrl}
                download="images_document.pdf"
                onClick={() =>
                  trackToolEvent("image-to-pdf", "result_downloaded")
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
                <span>{isRTL ? "تحميل ملف PDF" : "Download PDF File"}</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
