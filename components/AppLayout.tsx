"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdBlockDetector from "@/components/AdBlockDetector";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPreviewPage =
    pathname === "/preview" || pathname?.startsWith("/preview");

  if (isPreviewPage) {
    return (
      <>
        {children}
        <AdBlockDetector />
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <AdBlockDetector />
    </>
  );
}
