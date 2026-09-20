import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CSVToExcel from "@/components/tools/excel/CSVToExcel";

export const metadata: Metadata = {
  title: "تحويل CSV إلى Excel مجاناً أونلاين | EzyTemplate",
  description:
    "تحويل ملفات البيانات المفصولة بفاصلة CSV إلى جداول إكسيل XLSX مجاناً بدون تسجيل.",
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
