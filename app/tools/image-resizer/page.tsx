import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageResizer from "@/components/tools/image/ImageResizer";

export const metadata: Metadata = {
  title: "تغيير حجم الصور مجاناً أونلاين | EzyTemplate",
  description:
    "تعديل أبعاد الصور مع قياسات جاهزة للسوشيال ميديا (انستجرام، فيسبوك، A4) مجاناً بدون تسجيل.",
  keywords: [
    "تغيير حجم الصور",
    "image resizer",
    "تعديل ابعاد الصورة",
    "مقاسات الانستقرام",
  ],
};

export default function ImageResizerPage() {
  return (
    <ToolPageShell slug="image-resizer">
      <ImageResizer />
    </ToolPageShell>
  );
}
