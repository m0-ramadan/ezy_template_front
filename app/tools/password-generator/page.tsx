import { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import PasswordGenerator from "@/components/tools/dev/PasswordGenerator";

export const metadata: Metadata = {
  title: "مولد كلمات المرور القوية مجاناً | EzyTemplate",
  description:
    "توليد كلمات مرور عشوائية وآمنة جداً مع التحكم بالأرقام والرموز والطول مجاناً بالمتصفح.",
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
