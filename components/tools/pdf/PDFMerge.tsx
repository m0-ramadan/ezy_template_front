"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  Download,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Loader2,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { formatBytes } from "@/lib/toolsUtils";
import { trackToolEvent } from "@/lib/api";

interface PDFItem {
  id: string;
  file: File;
  name: string;
  size: number;
}

export default function PDFMerge() {
  const { isRTL } = useLanguage();
  const [items, setItems] = useState<PDFItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedUrl, setMergedUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelect = (selectedFiles: FileList | File[]) => {
    setErrorMsg(null);
    const newItems: PDFItem[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        newItems.push({
          id: Math.random().toString(36).substring(2, 9),
          file,
          name: file.name,
          size: file.size,
        });
      }
    });

    if (newItems.length === 0) {
      setErrorMsg(
        isRTL
          ? "يرجى اختيار ملفات PDF صحيحة فقط."
          : "Please select valid PDF files.",
      );
      return;
    }

    setItems((prev) => [...prev, ...newItems]);
    setMergedUrl(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setItems(updated);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMerge = async () => {
    if (items.length < 2) {
      setErrorMsg(
        isRTL
          ? "يرجى اختيار ملفين PDF على الأقل للدمج."
          : "Please select at least 2 PDF files to merge.",
      );
      return;
    }

    setIsProcessing(true);
    setErrorMsg(null);
    trackToolEvent("pdf-merge", "upload_started");

    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of items) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices(),
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);

      setMergedUrl(url);
      trackToolEvent("pdf-merge", "processing_success", {
        output_size_bytes: blob.size,
      });
    } catch (err) {
      console.error("PDF Merge Error:", err);
      setErrorMsg(
        isRTL
          ? "حدث خطأ أثناء دمج الملفات. تأكد من أن الملفات غير محمية."
          : "Error merging PDF files. Make sure files are not password-protected.",
      );
      trackToolEvent("pdf-merge", "processing_failed");
    } finally {
      setIsProcessing(false);
    }
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
      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) handleFilesSelect(e.dataTransfer.files);
        }}
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
          accept="application/pdf"
          multiple
          onChange={(e) => e.target.files && handleFilesSelect(e.target.files)}
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
            ? "اضغط هنا لاختيار ملفات PDF أو اسحبها برفق"
            : "Click to choose PDF files or drop them here"}
        </h3>
        <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0 }}>
          {isRTL
            ? "يمكنك اختيار ملفات متعددة ثم إعادة ترتيبها بسهولة"
            : "Select multiple files and reorder them easily before merging"}
        </p>
      </div>

      {errorMsg && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#fef2f2",
            color: "#991b1b",
            fontSize: "13.5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Selected Files List & Reordering */}
      {items.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h4
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {isRTL
              ? `الملفات المحددة (${items.length}):`
              : `Selected Files (${items.length}):`}
          </h4>
          {items.map((item, index) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderRadius: "10px",
                background: "var(--bg, #f8fafc)",
                border: "1px solid var(--line, #e2e8f0)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <FileText size={20} color="var(--blue)" />
                <div>
                  <strong
                    style={{
                      fontSize: "13.5px",
                      display: "block",
                      color: "var(--text)",
                    }}
                  >
                    {item.name}
                  </strong>
                  <span style={{ fontSize: "11.5px", color: "var(--muted)" }}>
                    {formatBytes(item.size)}
                  </span>
                </div>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <button
                  disabled={index === 0}
                  onClick={() => moveItem(index, "up")}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid var(--line)",
                    background: "var(--card-bg)",
                    cursor: "pointer",
                    opacity: index === 0 ? 0.4 : 1,
                  }}
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  disabled={index === items.length - 1}
                  onClick={() => moveItem(index, "down")}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "1px solid var(--line)",
                    background: "var(--card-bg)",
                    cursor: "pointer",
                    opacity: index === items.length - 1 ? 0.4 : 1,
                  }}
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    border: "none",
                    background: "#fef2f2",
                    color: "#dc2626",
                    cursor: "pointer",
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {/* Action Button */}
          {!mergedUrl && (
            <button
              onClick={handleMerge}
              disabled={isProcessing || items.length < 2}
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
                marginTop: "12px",
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
                    ? "جاري دمج الملفات..."
                    : "Merging Files..."
                  : isRTL
                    ? "دمج ملفات PDF الآن"
                    : "Merge PDF Files Now"}
              </span>
            </button>
          )}
        </div>
      )}

      {/* Merged Download Result */}
      {mergedUrl && (
        <div
          style={{
            padding: "24px",
            borderRadius: "12px",
            background: "rgba(34, 197, 94, 0.08)",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            textAlign: "center",
          }}
        >
          <CheckCircle
            size={36}
            color="#16a34a"
            style={{ margin: "0 auto 12px" }}
          />
          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#166534",
              margin: "0 0 8px 0",
            }}
          >
            {isRTL
              ? "تم دمج ملفات PDF بنجاح!"
              : "PDF Files Merged Successfully!"}
          </h3>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--muted)",
              marginBottom: "20px",
            }}
          >
            {isRTL
              ? "يمكنك الآن تحميل المستند الجديد المدمج بحرية."
              : "You can now download your new combined PDF document."}
          </p>

          <a
            href={mergedUrl}
            download="merged_document.pdf"
            onClick={() => trackToolEvent("pdf-merge", "result_downloaded")}
            className="btn primary"
            style={{
              padding: "12px 28px",
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
              {isRTL ? "تحميل ملف PDF المدمج" : "Download Merged PDF"}
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
