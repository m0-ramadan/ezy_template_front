import Metadata from "next";
import ToolsClientPage from "./ToolsClientPage";

export const metadata = {
  title: "الأدوات الرقمية المجانية | EzyTemplate",
  description:
    "مجموعة من الأدوات المجانية لمعالجة الملفات، إنشاء الفواتير، رموز QR والحسابات اليومية بدون تسجيل.",
  keywords: [
    "أدوات مجانية",
    "مولد فواتير",
    "مولد qr",
    "ضغط pdf",
    "حاسبة الضريبة",
    "vat calculator",
  ],
  openGraph: {
    title: "الأدوات الرقمية المجانية | EzyTemplate",
    description:
      "مجموعة من الأدوات المجانية لمعالجة الملفات، إنشاء الفواتير، رموز QR والحسابات اليومية بدون تسجيل.",
  },
};

export default function ToolsPage() {
  return <ToolsClientPage />;
}
