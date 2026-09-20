import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ExcelToCSV from "@/components/tools/excel/ExcelToCSV";

export const metadata: Metadata = {
  title: "تحويل Excel إلى CSV مجاناً أونلاين | EzyTemplate",
  description:
    "استخراج ورقة العمل من ملفات XLS و XLSX وتحويلها إلى ملف CSV بسهولة مجاناً بدون تسجيل.",
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
