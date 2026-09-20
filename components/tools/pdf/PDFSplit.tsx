"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  UploadCloud,
  FileText,
  Download,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { trackToolEvent } from "@/lib/api";
import { formatBytes } from "@/lib/toolsUtils";

export default function PDFSplit() {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [mode, setMode] = useState<"all" | "range">("all");
  const [rangeInput, setRangeInput] = useState<string>("1-3");
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState<
    { name: string; url: string }[]
  >([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setErrorMsg(null);
    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.endsWith(".pdf")
    ) {
      setErrorMsg(
        isRTL ? "يرجى اختيار ملف PDF صالح." : "Please select a valid PDF file.",
      );
      return;
    }

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const count = pdf.getPageCount();
      setPageCount(count);
      setFile(selectedFile);
      setDownloadUrls([]);
    } catch (err) {
      setErrorMsg(
        isRTL
          ? "تعذر قراءة ملف PDF. قد يكون محتواه محمي أو تالف."
          : "Could not read PDF file. It might be password protected.",
      );
    }
  };

  const handleSplit = async () => {
    if (!file || pageCount === 0) return;
    setIsProcessing(true);
    setErrorMsg(null);
    trackToolEvent("pdf-split", "upload_started");

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const results: { name: string; url: string }[] = [];

      if (mode === "all") {
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
          const pdfBytes = await newPdf.save();
          const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
            type: "application/pdf",
          });
          results.push({
            name: `page_${i + 1}.pdf`,
            url: URL.createObjectURL(blob),
          });
        }
      } else {
        // Parse range input e.g. "1-3, 5"
        const pagesToExtract = new Set<number>();
        const parts = rangeInput.split(",");
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.includes("-")) {
            const [start, end] = trimmed
              .split("-")
              .map((n) => parseInt(n.trim()));
            if (!isNaN(start) && !isNaN(end)) {
              for (
                let p = Math.max(1, start);
                p <= Math.min(pageCount, end);
                p++
              )
                pagesToExtract.add(p - 1);
            }
          } else {
            const pageNum = parseInt(trimmed);
            if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount)
              pagesToExtract.add(pageNum - 1);
          }
        }

        if (pagesToExtract.size === 0) {
          setErrorMsg(
            isRTL
              ? "يرجى تحديد نطاق صفحات صحيح."
              : "Please specify a valid page range.",
          );
          setIsProcessing(false);
          return;
        }

        const newPdf = await PDFDocument.create();
        const indices = Array.from(pagesToExtract).sort((a, b) => a - b);
        const copiedPages = await newPdf.copyPages(pdfDoc, indices);
        copiedPages.forEach((page) => newPdf.addPage(page));
        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
          type: "application/pdf",
        });
        results.push({
          name: `extracted_pages.pdf`,
          url: URL.createObjectURL(blob),
        });
      }

      setDownloadUrls(results);
      trackToolEvent("pdf-split", "processing_success");
    } catch (err) {
      console.error("PDF Split Error:", err);
      setErrorMsg(
        isRTL ? "حدث خطأ أثناء تقسيم الملف." : "Error splitting PDF file.",
      );
      trackToolEvent("pdf-split", "processing_failed");
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
            accept="application/pdf"
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
            {isRTL ? "اختر ملف PDF لتقسيمه" : "Select PDF file to split"}
          </h3>
          <p style={{ fontSize: "13.5px", color: "var(--muted)", margin: 0 }}>
            {isRTL ? "ملف PDF واحد حتى 50MB" : "Single PDF file up to 50MB"}
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              background: "var(--bg)",
              borderRadius: "12px",
              border: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <FileText size={24} color="var(--blue)" />
              <div>
                <strong
                  style={{
                    fontSize: "14px",
                    color: "var(--text)",
                    display: "block",
                  }}
                >
                  {file.name}
                </strong>
                <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {formatBytes(file.size)} · {pageCount}{" "}
                  {isRTL ? "صفحة" : "pages"}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setDownloadUrls([]);
              }}
              style={{
                border: "1px solid var(--line)",
                background: "var(--card-bg)",
                padding: "6px 12px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {isRTL ? "تغيير الملف" : "Change File"}
            </button>
          </div>

          {/* Options */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <button
              onClick={() => setMode("all")}
              style={{
                padding: "14px",
                borderRadius: "10px",
                border:
                  mode === "all"
                    ? "2px solid var(--blue)"
                    : "1px solid var(--line)",
                background:
                  mode === "all" ? "rgba(37, 99, 235, 0.05)" : "var(--card-bg)",
                fontWeight: 700,
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {isRTL ? "فصل كل صفحة كملف مستقل" : "Split Every Page Separately"}
            </button>
            <button
              onClick={() => setMode("range")}
              style={{
                padding: "14px",
                borderRadius: "10px",
                border:
                  mode === "range"
                    ? "2px solid var(--blue)"
                    : "1px solid var(--line)",
                background:
                  mode === "range"
                    ? "rgba(37, 99, 235, 0.05)"
                    : "var(--card-bg)",
                fontWeight: 700,
                cursor: "pointer",
                textAlign: "center",
              }}
            >
              {isRTL ? "استخراج نطاق صفحات مخصص" : "Extract Custom Page Range"}
            </button>
          </div>

          {mode === "range" && (
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--text)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {isRTL
                  ? `أدخل أرقام الصفحات (1 - ${pageCount}):`
                  : `Enter Page Range (1 - ${pageCount}):`}
              </label>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder="e.g. 1-3, 5, 8-10"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              />
            </div>
          )}

          {!downloadUrls.length && (
            <button
              onClick={handleSplit}
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
                    ? "جاري التقسيم..."
                    : "Splitting..."
                  : isRTL
                    ? "تقسيم ملف PDF"
                    : "Split PDF Document"}
              </span>
            </button>
          )}

          {downloadUrls.length > 0 && (
            <div
              style={{
                padding: "20px",
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "12px",
              }}
            >
              <h4
                style={{
                  color: "#166534",
                  margin: "0 0 12px 0",
                  fontSize: "15px",
                }}
              >
                {isRTL
                  ? "تم التقسيم بنجاح! جاهز للتحميل:"
                  : "Splitting complete! Ready for download:"}
              </h4>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {downloadUrls.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: "#fff",
                      borderRadius: "8px",
                      border: "1px solid var(--line)",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: 600 }}>
                      {item.name}
                    </span>
                    <a
                      href={item.url}
                      download={item.name}
                      onClick={() =>
                        trackToolEvent("pdf-split", "result_downloaded")
                      }
                      style={{
                        color: "var(--blue)",
                        fontWeight: 700,
                        fontSize: "12px",
                        textDecoration: "none",
                      }}
                    >
                      {isRTL ? "تحميل ↓" : "Download ↓"}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
