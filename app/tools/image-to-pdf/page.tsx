import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageToPDF from "@/components/tools/pdf/ImageToPDF";

export const metadata: Metadata = {
  title: "تحويل الصور إلى PDF مجاناً أونلاين | EzyTemplate",
  description:
    "تحويل صور JPG و PNG و WEBP إلى ملف PDF مرتب بصيغة A4 مجاناً بدون تسجيل.",
  keywords: ["تحويل الصور إلى pdf", "image to pdf", "jpg to pdf", "png to pdf"],
};

export default function ImageToPDFPage() {
  return (
    <ToolPageShell slug="image-to-pdf">
      <ImageToPDF />
    </ToolPageShell>
  );
}
