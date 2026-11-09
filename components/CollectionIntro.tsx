import Link from "next/link";

type CollectionKey =
  | "excel"
  | "word"
  | "design"
  | "website"
  | "presentation"
  | "canva";

const COPY: Record<
  CollectionKey,
  { title: string; intro: string; tips: string[]; related: Array<[string, string]> }
> = {
  excel: {
    title: "About the Excel template collection",
    intro:
      "Every workbook in this collection is a working spreadsheet, not a screenshot: budgets, invoice trackers, cash-flow forecasts, inventory sheets, timesheets and project planners that open in Microsoft Excel, Google Sheets, LibreOffice Calc and Numbers. Each file is downloadable on its own, keeps its original formulas and formatting, and uses sample rows you replace with your own figures. The collection is organised by the task the sheet performs, so you can start from accounting, finance, human resources, inventory or project management instead of scrolling through a mixed list.",
    tips: [
      "Pick the sheet that matches the output you need (a monthly budget, an invoice register, a stock count) rather than the one with the most features.",
      "Check the file format before downloading: .xlsx keeps formulas, while .csv is plain data that any tool can import.",
      "Duplicate the sheet before editing so the original formulas stay intact as a reference.",
    ],
    related: [
      ["/tools/csv-to-excel", "Convert a CSV export into Excel"],
      ["/tools/vat-calculator", "Calculate VAT before entering figures"],
      ["/templates", "Browse every template collection"],
    ],
  },
  word: {
    title: "About the Word template collection",
    intro:
      "These documents are editable Microsoft Word files for the paperwork that repeats in every business: project plans, change requests, financial plans and management reports. Each one ships with a clean heading structure, tables and placeholder fields, so you can drop in your own text without rebuilding the layout. The files open in Word, Google Docs and LibreOffice Writer, and the sample content is written to be replaced rather than kept. If you need a matching spreadsheet, the Excel collection covers most of the same planning and finance tasks.",
    tips: [
      "Keep the built-in heading styles when you edit, so the navigation pane and any table of contents keep working.",
      "Replace the sample names and dates first, then adjust the wording — that order avoids missing fields.",
      "Export to PDF only after the document is final, because PDF editing is far more limited.",
    ],
    related: [
      ["/tools/word-counter", "Check the word count before you send"],
      ["/tools/case-converter", "Fix inconsistent capitalisation in a draft"],
      ["/excel-templates", "Pair the document with a spreadsheet"],
    ],
  },
  design: {
    title: "About the design resources",
    intro:
      "The design collection holds printable and brand-ready assets rather than website themes: business cards, certificates, corporate identity sheets and event invitations. Files are delivered in editable formats so you can change colours, fonts and layout before printing, and each listing states the formats included so you can check compatibility with your design app. Use the preview to judge the layout, then read the technical details for dimensions and licences before you commit to a print run.",
    tips: [
      "Match the file format to your editor: layered source files are easier to change than flat exports.",
      "Check trim size and bleed for anything going to a professional printer.",
      "Replace placeholder logos and fonts with licensed alternatives before publishing.",
    ],
    related: [
      ["/tools/color-palette-generator", "Build a matching colour palette"],
      ["/tools/image-converter", "Convert artwork to the format your printer accepts"],
      ["/templates", "See all template categories"],
    ],
  },
  website: {
    title: "About the website templates",
    intro:
      "This collection contains complete website layouts you can study, adapt or rebuild: landing pages, portfolios, business sites and store fronts. Each entry documents the stack it was built with, the pages it contains and the files bundled in the download, so you can judge the effort involved before starting. These are starting points rather than finished products — you will still need to replace the demonstration content, connect a form handler and host the result. The preview link shows the layout running so you can test it at different screen sizes.",
    tips: [
      "Read the technologies used before downloading: a Laravel template and a static HTML template need very different hosting.",
      "Check which pages and assets are included, not just the home page screenshot.",
      "Treat demonstration text and images as placeholders and replace them before going live.",
    ],
    related: [
      ["/tools/image-compressor", "Shrink hero images before launching"],
      ["/tools/meta-tag-generator", "Generate SEO tags for the new site"],
      ["/tools/utm-builder", "Tag campaign links from day one"],
    ],
  },
  presentation: {
    title: "About the presentation templates",
    intro:
      "Presentation files in this collection are editable slide decks for business reviews, marketing plans and portfolios. Each deck keeps a consistent grid, a small type scale and reusable layouts, so adding slides does not break the design. The listings show the file formats included — usually PowerPoint (.pptx) — and the sample slides are written as prompts you replace with your own numbers and narrative. They work in PowerPoint, Google Slides and Keynote after import.",
    tips: [
      "Keep the master slide layouts instead of copying elements between slides.",
      "Replace the sample charts with your own data rather than editing the numbers inside the placeholder chart.",
      "Export a PDF copy for sharing and keep the editable file for future edits.",
    ],
    related: [
      ["/tools/image-resizer", "Resize screenshots to slide size"],
      ["/tools/percentage-calculator", "Check growth figures before presenting"],
      ["/templates", "Browse other template types"],
    ],
  },
  canva: {
    title: "About the Canva templates",
    intro:
      "Canva designs are edited directly in Canva: open the shared design link, duplicate it to your own account, then change text, colours and images. The listings show the design source and the intended use, so you can confirm it is editable in the free tier before starting. Because the finished artwork lives in your Canva account, there is nothing to install and no file format to convert; export a PNG or PDF when you are ready to publish.",
    tips: [
      "Duplicate the design first so the shared original stays untouched.",
      "Check which elements use paid Canva assets before relying on the layout.",
      "Export at the size the final channel needs: social posts, print or presentation.",
    ],
    related: [
      ["/tools/color-palette-generator", "Match the palette across designs"],
      ["/tools/image-to-pdf", "Combine exported images into one PDF"],
      ["/templates", "Browse all collections"],
    ],
  },
};

export default function CollectionIntro({
  collection,
}: {
  collection: CollectionKey;
}) {
  const copy = COPY[collection];
  if (!copy) return null;

  return (
    <section
      className="container"
      style={{ padding: "8px 0 64px", maxWidth: "1100px" }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>
        {copy.title}
      </h2>
      <p style={{ lineHeight: 1.8, color: "var(--muted)", marginBottom: "20px" }}>
        {copy.intro}
      </p>

      <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "10px" }}>
        How to choose
      </h3>
      <ul style={{ margin: "0 0 24px", paddingInlineStart: "22px", lineHeight: 1.9 }}>
        {copy.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: "16px", fontWeight: 800, marginBottom: "10px" }}>
        Useful next steps
      </h3>
      <ul style={{ margin: 0, paddingInlineStart: "22px", lineHeight: 1.9 }}>
        {copy.related.map(([href, label]) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
