import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ExcelToCSV from "@/components/tools/excel/ExcelToCSV";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/excel-to-csv" },
  title: "Excel to CSV Converter – Free Online",
  description:
    "Turn Excel workbooks into clean CSV files in the browser, with no upload and no signup.",
  keywords: [
    "تحويل excel الى csv",
    "xlsx to csv",
    "استخراج ورقة العمل",
    "excel to csv",
  ],
};

export default function ExcelToCSVPage() {
  return (
    <ToolPageShell slug="excel-to-csv">
      <ExcelToCSV />
    </ToolPageShell>
  );
}
