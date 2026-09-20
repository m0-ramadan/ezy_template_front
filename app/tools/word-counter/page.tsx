import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import WordCounter from "@/components/tools/text/WordCounter";

export const metadata: Metadata = {
  title: "عداد الكلمات والحروف مجاناً أونلاين | EzyTemplate",
  description:
    "عد الكلمات والحروف بدون مسافات، الجمل، الفقرات ووقت القراءة المقدر مجاناً بدون تسجيل.",
  keywords: ["عداد الكلمات", "word counter", "حساب الكلمات", "عد الحروف"],
};

export default function WordCounterPage() {
  return (
    <ToolPageShell slug="word-counter">
      <WordCounter />
    </ToolPageShell>
  );
}
