import type { Metadata } from "next";
import { getCustomPageContent } from "@/lib/api";
import { SITE_URL } from "@/lib/site";
import FaqView from "./FaqView";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about EzyTemplate downloads, licences, accounts, payments and support.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "Frequently Asked Questions | EzyTemplate",
    description:
      "Answers to common questions about EzyTemplate templates, downloads and support.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
};

export default async function FaqPage() {
  const data = await getCustomPageContent("faq");
  const items = data?.items || [];

  const faqJsonLd =
    items.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items
            .filter((item: { question?: string; answer?: string }) => item?.question && item?.answer)
            .map(
              (item: {
                question: string;
                question_ar?: string;
                answer: string;
                answer_ar?: string;
              }) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              }),
            ),
        }
      : null;

  return (
    <>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <FaqView initialData={data} />
    </>
  );
}
