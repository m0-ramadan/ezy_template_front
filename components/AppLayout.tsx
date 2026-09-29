"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPreviewPage =
    pathname === "/preview" || pathname?.startsWith("/preview");

  if (isPreviewPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
