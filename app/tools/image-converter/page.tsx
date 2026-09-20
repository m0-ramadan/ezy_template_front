import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageConverter from "@/components/tools/image/ImageConverter";

export const metadata: Metadata = {
  title: "محول صيغ الصور مجاناً أونلاين | EzyTemplate",
  description:
    "تحويل صيغ الصور بين PNG و JPG و WEBP فوراً وبأعلى جودة مجاناً بدون رفع لسيرفرات.",
};

export default function ImageConverterPage() {
  return (
    <ToolPageShell slug="image-converter">
      <ImageConverter />
    </ToolPageShell>
  );
}
