import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PasswordGenerator from "@/components/tools/dev/PasswordGenerator";

export const metadata: Metadata = {
  alternates: { canonical: "/tools/password-generator" },
  title: "Strong Password Generator – Free Online",
  description:
    "Generate secure random passwords with custom length, symbols and character rules.",
  keywords: [
    "مولد كلمات المرور",
    "password generator",
    "كلمة سر قوية",
    "باسورد عشوائي",
  ],
};

export default function PasswordGeneratorPage() {
  return (
    <ToolPageShell slug="password-generator">
      <PasswordGenerator />
    </ToolPageShell>
  );
}
