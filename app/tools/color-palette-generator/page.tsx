import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ColorPaletteGenerator from "@/components/tools/image/ColorPaletteGenerator";

export const metadata: Metadata = {
  title: "مولد لوحات الألوان مجاناً أونلاين | EzyTemplate",
  description:
    "توليد تناسقات ألوان عصرية واستخراج كود الألوان (HEX/RGB) من الصور مجاناً بدون تسجيل.",
  keywords: [
    "لوحات ألوان",
    "color palette generator",
    "استخراج الألوان",
    "كود الهيكس",
  ],
};

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolPageShell slug="color-palette-generator">
      <ColorPaletteGenerator />
    </ToolPageShell>
  );
}
