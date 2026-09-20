import { Metadata } from "next";
import CategoryToolsClientPage from "./CategoryToolsClientPage";

export const metadata: Metadata = {
  title: "أدوات ومرافق رقمية مجانية | EzyTemplate Tools",
  description:
    "تصفح الأدوات المجانية حسب القسم لمعالجة الملفات وحسابات الأعمال والتصميم بدون تسجيل.",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  return <CategoryToolsClientPage categorySlug={resolvedParams.category} />;
}
