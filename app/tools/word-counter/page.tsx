import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import WordCounter from "@/components/tools/text/WordCounter";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/word-counter" },
  title: "Word Counter – Words, Characters and Reading Time",
  description:
    "Count words, characters, sentences and paragraphs, and estimate reading time as you type.",
  keywords: ["عداد الكلمات", "word counter", "حساب الكلمات", "عد الحروف"],
};

export default function WordCounterPage() {
  return (
    <ToolPageShell slug="word-counter">
      <WordCounter />
    </ToolPageShell>
  );
}
