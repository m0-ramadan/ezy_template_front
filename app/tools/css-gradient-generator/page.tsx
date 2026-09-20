import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import CSSGradientGenerator from "@/components/tools/image/CSSGradientGenerator";

export const metadata: Metadata = {
  title: "مولد التدرجات اللونية CSS | EzyTemplate",
  description:
    "أداة تفاعلية لتصميم التدرجات اللونية الخطية والدائرية ونسخ كود CSS جاهز للموقع.",
};

export default function CSSGradientGeneratorPage() {
  return (
    <ToolPageShell slug="css-gradient-generator">
      <CSSGradientGenerator />
    </ToolPageShell>
  );
}
