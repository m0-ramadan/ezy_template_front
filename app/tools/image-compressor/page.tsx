import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageCompressor from "@/components/tools/image/ImageCompressor";

export const metadata: Metadata = {
  title: "ضغط الصور مجاناً أونلاين | EzyTemplate",
  description:
    "ضغط وتصغير حجم صور JPG و PNG و WEBP بسرعة وبأعلى جودة مجاناً بدون تسجيل.",
  keywords: [
    "ضغط الصور",
    "image compressor",
    "تصغير الصور",
    "تقليل حجم الصورة",
  ],
};

export default function ImageCompressorPage() {
  return (
    <ToolPageShell slug="image-compressor">
      <ImageCompressor />
    </ToolPageShell>
  );
}
