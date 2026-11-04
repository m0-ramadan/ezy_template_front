import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageResizer from "@/components/tools/image/ImageResizer";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/image-resizer" },
  title: "Image Resizer – Resize Images Online",
  description:
    "Resize images to exact pixel dimensions for web, social media and print. Free and private.",
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
