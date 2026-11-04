/**
 * The single source of truth for the tool URLs that actually exist under
 * `app/tools/*`. Everything that links to, lists or indexes a tool reads this
 * table so the site can never advertise a /tools/<slug> URL that renders an
 * empty soft-404 page.
 */

export const TOOL_CATEGORIES = [
  "pdf",
  "images",
  "business",
  "calculators",
  "excel",
  "text",
  "developer",
  "seo",
] as const;

export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export type ToolRoute = {
  slug: string;
  name: string;
  category: ToolCategory;
};

export const TOOL_ROUTES: ToolRoute[] = [
  { slug: "pdf-compressor", name: "PDF Compressor", category: "pdf" },
  { slug: "pdf-merge", name: "Merge PDF Files", category: "pdf" },
  { slug: "pdf-split", name: "Split PDF Files", category: "pdf" },
  { slug: "image-to-pdf", name: "Image to PDF Converter", category: "pdf" },
  { slug: "image-compressor", name: "Image Compressor", category: "images" },
  { slug: "image-converter", name: "Image Format Converter", category: "images" },
  { slug: "image-resizer", name: "Image Resizer", category: "images" },
  {
    slug: "color-palette-generator",
    name: "Color Palette Generator",
    category: "images",
  },
  { slug: "invoice-generator", name: "Invoice Generator", category: "business" },
  { slug: "quote-generator", name: "Quote Generator", category: "business" },
  { slug: "qr-code-generator", name: "QR Code Generator", category: "business" },
  {
    slug: "password-generator",
    name: "Secure Password Generator",
    category: "business",
  },
  { slug: "vat-calculator", name: "VAT Calculator", category: "calculators" },
  {
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "calculators",
  },
  {
    slug: "loan-emi-calculator",
    name: "Loan EMI Calculator",
    category: "calculators",
  },
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    category: "calculators",
  },
  {
    slug: "profit-margin-calculator",
    name: "Profit Margin Calculator",
    category: "calculators",
  },
  { slug: "csv-to-excel", name: "CSV to Excel Converter", category: "excel" },
  { slug: "excel-to-csv", name: "Excel to CSV Converter", category: "excel" },
  { slug: "case-converter", name: "Case Converter", category: "text" },
  { slug: "word-counter", name: "Word and Character Counter", category: "text" },
  { slug: "json-formatter", name: "JSON Formatter and Validator", category: "developer" },
  { slug: "uuid-generator", name: "UUID Generator", category: "developer" },
  {
    slug: "css-gradient-generator",
    name: "CSS Gradient Generator",
    category: "developer",
  },
  { slug: "meta-tag-generator", name: "Meta Tag Generator", category: "seo" },
  { slug: "utm-builder", name: "UTM Campaign Builder", category: "seo" },
];

export const TOOL_SLUGS = new Set(TOOL_ROUTES.map((tool) => tool.slug));

export function getToolCategory(slug: string): ToolCategory | null {
  return TOOL_ROUTES.find((tool) => tool.slug === slug)?.category ?? null;
}

export function isToolCategory(value: string): value is ToolCategory {
  return (TOOL_CATEGORIES as readonly string[]).includes(value);
}

export function toolsInCategory(category: ToolCategory): ToolRoute[] {
  return TOOL_ROUTES.filter((tool) => tool.category === category);
}
