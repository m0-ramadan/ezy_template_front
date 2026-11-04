import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CSVToExcel from "@/components/tools/excel/CSVToExcel";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/csv-to-excel" },
  title: "CSV to Excel Converter – Free Online",
  description:
    "Convert CSV files into .xlsx Excel workbooks in your browser. Your data never leaves your device.",
  keywords: [
    "تحويل csv الى excel",
    "csv to xlsx",
    "تحويل الجداول",
    "csv to excel",
  ],
};

export default function CSVToExcelPage() {
  return (
    <ToolPageShell slug="csv-to-excel">
      <CSVToExcel />
    </ToolPageShell>
  );
}
