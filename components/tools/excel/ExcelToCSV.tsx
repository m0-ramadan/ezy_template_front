"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  UploadCloud,
  FileCode2,
  Download,
  Loader2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import * as XLSX from "xlsx";
import { trackToolEvent } from "@/lib/api";

export default function ExcelToCSV() {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string>("");
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [csvUrl, setCsvUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (
      !selectedFile.name.endsWith(".xls") &&
      !selectedFile.name.endsWith(".xlsx")
    )
      return;
    setFile(selectedFile);
    setCsvUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const wb = XLSX.read(data, { type: "array" });
      setWorkbook(wb);
      setSheetNames(wb.SheetNames);
      if (wb.SheetNames.length > 0) setSelectedSheet(wb.SheetNames[0]);
    };
    reader.readAsArrayBuffer(selectedFile);
  };

  const handleConvert = () => {
    if (!workbook || !selectedSheet) return;
    setIsProcessing(true);
    trackToolEvent("excel-to-csv", "upload_started");

    try {
      const sheet = workbook.Sheets[selectedSheet];
      const csvOutput = XLSX.utils.sheet_to_csv(sheet);
      const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
      setCsvUrl(URL.createObjectURL(blob));
      trackToolEvent("excel-to-csv", "processing_success");
    } catch (err) {
      console.error("Excel to CSV error:", err);
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
            accept=".xls, .xlsx"
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
              ? "اختر ملف Excel (.xls, .xlsx) لتحويله إلى CSV"
              : "Select Excel file (.xls, .xlsx) to convert to CSV"}
          </h3>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              padding: "16px",
              background: "var(--bg)",
              borderRadius: "12px",
              border: "1px solid var(--line)",
            }}
          >
            <strong style={{ fontSize: "14px", color: "var(--text)" }}>
              {file.name}
            </strong>
          </div>

          {sheetNames.length > 1 && (
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                {isRTL ? "اختر ورقة العمل (Sheet):" : "Select Worksheet:"}
              </label>
              <select
                value={selectedSheet}
                onChange={(e) => setSelectedSheet(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid var(--line)",
                  background: "var(--card-bg)",
                  color: "var(--text)",
                }}
              >
                {sheetNames.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          )}

          {!csvUrl ? (
            <button
              onClick={handleConvert}
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
                    ? "جاري الاستخراج..."
                    : "Extracting..."
                  : isRTL
                    ? "استخراج وحفظ ملف CSV"
                    : "Convert & Export CSV"}
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
                  ? "تم تحويل ورقة العمل إلى CSV بنجاح!"
                  : "Sheet Converted to CSV Successfully!"}
              </h4>
              <a
                href={csvUrl}
                download={`${file.name.replace(/\.[^/.]+$/, "")}.csv`}
                onClick={() =>
                  trackToolEvent("excel-to-csv", "result_downloaded")
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
                <span>{isRTL ? "تحميل ملف CSV" : "Download CSV File"}</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
