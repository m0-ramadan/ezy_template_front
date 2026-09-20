"use client";

import { useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  UploadCloud,
  FileSpreadsheet,
  Download,
  Loader2,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import * as XLSX from "xlsx";
import { trackToolEvent } from "@/lib/api";

export default function CSVToExcel() {
  const { isRTL } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string[][]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [excelUrl, setExcelUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.endsWith(".csv") && selectedFile.type !== "text/csv")
      return;
    setFile(selectedFile);
    setExcelUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const workbook = XLSX.read(text, { type: "string" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
      setPreviewData(data.slice(0, 8)); // preview top 8 rows
    };
    reader.readAsText(selectedFile);
  };

  const handleConvert = () => {
    if (!file) return;
    setIsProcessing(true);
    trackToolEvent("csv-to-excel", "upload_started");

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const workbook = XLSX.read(text, { type: "string" });
        const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([wbout], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        setExcelUrl(URL.createObjectURL(blob));
        trackToolEvent("csv-to-excel", "processing_success");
      } catch (err) {
        console.error("CSV Convert error:", err);
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
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
            accept=".csv, text/csv"
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
              ? "اختر ملف CSV لتحويله إلى Excel"
              : "Select CSV file to convert to Excel"}
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

          {/* Table Preview */}
          {previewData.length > 0 && (
            <div
              style={{
                overflowX: "auto",
                border: "1px solid var(--line)",
                borderRadius: "10px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                }}
              >
                <tbody>
                  {previewData.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      style={{
                        background: rIdx === 0 ? "var(--bg)" : "transparent",
                      }}
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          style={{
                            padding: "8px 12px",
                            border: "1px solid var(--line)",
                            fontWeight: rIdx === 0 ? 700 : 400,
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!excelUrl ? (
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
                    ? "جاري التحويل..."
                    : "Converting..."
                  : isRTL
                    ? "تحويل إلى Excel XLSX"
                    : "Convert to Excel XLSX"}
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
                  ? "تم التحويل إلى جدول Excel بنجاح!"
                  : "Converted to Excel File Successfully!"}
              </h4>
              <a
                href={excelUrl}
                download={`${file.name.replace(".csv", "")}.xlsx`}
                onClick={() =>
                  trackToolEvent("csv-to-excel", "result_downloaded")
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
                    ? "تحميل ملف Excel (.xlsx)"
                    : "Download Excel File (.xlsx)"}
                </span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
