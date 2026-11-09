/**
 * Editorial guides.
 *
 * These are long-form articles written for EzyTemplate. They exist because a
 * catalogue of downloadable files is not, on its own, enough content for an
 * advertising review: reviewers look for original pages that help a reader
 * decide and act. Each guide is self-contained HTML and is linked from
 * /guides, the footer, and the relevant collection pages.
 */

export type Guide = {
  slug: string;
  title: string;
  description: string;
  published: string;
  updated: string;
  readingMinutes: number;
  topic: string;
  html: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "excel-vs-csv-which-format",
    title: "Excel vs CSV: which format should you download?",
    description:
      "The difference between .xlsx and .csv decides whether your formulas, formatting and multiple sheets survive. Here is how to pick the right one.",
    published: "2026-10-02",
    updated: "2026-10-02",
    readingMinutes: 6,
    topic: "Spreadsheets",
    html: `
<p>A spreadsheet file can be saved in dozens of formats, but almost every download on a template site is offered as either <strong>.xlsx</strong> or <strong>.csv</strong>. They look similar in a file browser and behave very differently once you open them. Choosing the wrong one is the most common reason people lose formulas, dates or leading zeros after downloading a template.</p>

<h2>What .xlsx keeps that .csv cannot</h2>
<p>An XLSX workbook is a container. It stores several worksheets, cell formatting, number formats, named ranges, charts, conditional formatting, data validation lists, comments and — most importantly — formulas. When you open it, the spreadsheet application recalculates those formulas and shows the result.</p>
<p>A CSV file is plain text. Each line is a row and each comma separates a field. There is no concept of a sheet, a formula, a font or a currency. If a workbook contains <code>=SUM(B2:B13)</code>, the CSV export contains either the calculated number or nothing at all, depending on how the export was performed.</p>

<h2>What .csv is actually good for</h2>
<ul>
  <li><strong>Moving data between systems.</strong> Almost every accounting package, CRM, e-commerce platform and database tool can import CSV. Very few import XLSX cleanly.</li>
  <li><strong>Large exports.</strong> A million-row CSV opens in a text editor; the same data as XLSX can be slow to load.</li>
  <li><strong>Version control and diffing.</strong> Plain text can be compared line by line, which is useful for data pipelines.</li>
  <li><strong>Long-term readability.</strong> A CSV will still be readable decades from now without a specific application.</li>
</ul>

<h2>The traps that catch people out</h2>
<p><strong>Leading zeros disappear.</strong> A product code like <code>00123</code> becomes <code>123</code> when the recipient treats the column as a number. If you must use CSV, ask the receiving system to treat that column as text, or prefix values with an apostrophe in the source sheet.</p>
<p><strong>Dates change meaning.</strong> <code>03/04/2026</code> is 3 April in the UK and 4 March in the US. CSV has no date type, so the importer guesses. XLSX stores dates as serial numbers with an explicit format, which avoids the ambiguity.</p>
<p><strong>Commas inside values break columns.</strong> A company name like "Smith, Jones &amp; Co" needs to be quoted. Most exporters handle this, but hand-edited CSVs often do not.</p>
<p><strong>Encoding corrupts accents.</strong> Arabic, French and German text can arrive as gibberish if the CSV is saved in the wrong character set. UTF-8 with a byte-order mark is the safest choice when the recipient is Excel on Windows.</p>
<p><strong>Formulas become values.</strong> Once exported, a formula is gone. Keep the XLSX as your working copy and treat the CSV as a delivery format.</p>

<h2>A simple decision rule</h2>
<ol>
  <li>If you will edit, calculate or present the data: download <strong>.xlsx</strong>.</li>
  <li>If another system will ingest the data: download or export <strong>.csv</strong>.</li>
  <li>If you need both, keep the workbook as the source of truth and generate the CSV from it each time, rather than editing the CSV and re-importing.</li>
</ol>

<h2>Converting between them</h2>
<p>Converting is a one-way operation in practice. Going from XLSX to CSV is safe but lossy; going from CSV to XLSX does not restore formulas, because there never were any. Our <a href="/tools/csv-to-excel">CSV to Excel converter</a> builds a workbook from a CSV file in the browser, and the <a href="/tools/excel-to-csv">Excel to CSV converter</a> flattens a single sheet into text. Both run locally, so the file never leaves your device.</p>
<p>If you are choosing a template, look at the formats listed on its detail page before downloading. A budget workbook is only useful as XLSX; an import file is only useful as CSV.</p>
`,
  },
  {
    slug: "edit-word-template-without-breaking-layout",
    title: "How to edit a Word template without breaking the layout",
    description:
      "Replacing sample text is easy; keeping the structure intact is the hard part. A practical workflow for editing a .docx template safely.",
    published: "2026-10-02",
    updated: "2026-10-02",
    readingMinutes: 7,
    topic: "Documents",
    html: `
<p>Most people open a Word template, select the sample text and start typing. The document survives the first paragraph, then the heading changes size, the table jumps to the next page and the footer disappears. None of that is a bug in the template: it is the result of editing content without using the structure the template was built on.</p>

<h2>Work on a copy, always</h2>
<p>Before you change anything, save a copy with a new name. Templates are usually built with a specific page size, margin set and style definitions; an accidental change to the normal style will propagate through the whole document. A copy costs nothing and gives you a clean reference to compare against.</p>

<h2>Use the styles, not the toolbar</h2>
<p>A well-built template defines Heading 1, Heading 2, Body Text and a table style. Those definitions are what keeps spacing and numbering consistent. If you select a paragraph and manually set it to 18pt bold instead of applying Heading 1, the paragraph looks right once but breaks the navigation pane, the table of contents and any automatic numbering.</p>
<p>To see what a paragraph is really using, place the cursor in it and look at the style box in the Home tab. If it says "Normal" but looks like a heading, the template used direct formatting — keep that paragraph intact and edit the text only.</p>

<h2>Replace text with Find, not by selecting visually</h2>
<p>Use <strong>Ctrl+H</strong> (Cmd+H on macOS) to replace bracketed placeholders such as <code>[Client Name]</code> or <code>[Date]</code>. This guarantees you catch every occurrence, including those inside tables, headers and footers, which are easy to miss when scrolling.</p>
<ul>
  <li>Replace one placeholder at a time, so you can undo a specific change.</li>
  <li>Turn off "Match case" unless the case matters, so you do not leave duplicates behind.</li>
  <li>Check the header and footer separately: Find covers them, visual selection often does not.</li>
</ul>

<h2>Tables: add rows without losing formatting</h2>
<p>Click in the last cell of the last row and press <strong>Tab</strong>. Word adds a row that inherits the existing table style, borders and column widths. Copying an existing row and pasting it below also works, but the pasted row may carry manual formatting; use <strong>Paste &rarr; Keep Text Only</strong> and then re-apply the table style if the row looks different.</p>
<p>If a table breaks across pages badly, check the row properties: "Allow row to break across pages" should usually be off for header rows, and the header row should be marked to repeat on each page.</p>

<h2>Page breaks and the table of contents</h2>
<p>Do not press Enter repeatedly to push content onto a new page — the moment you edit the text above, everything shifts. Use <strong>Insert &rarr; Page Break</strong> instead. If the document has a table of contents, right-click it and choose <strong>Update Field &rarr; Update entire table</strong> after your edits.</p>

<h2>Images and logos</h2>
<p>Right-click the placeholder logo and choose <strong>Change Picture</strong> rather than deleting it and inserting a new one. This keeps the size, crop and position that the designer set. If you must insert a fresh image, check its resolution: 150&nbsp;dpi is enough for screen, 300&nbsp;dpi is the usual minimum for print.</p>

<h2>Export to PDF at the end</h2>
<p>Export only when the content is final. Word's PDF export keeps fonts embedded and preserves the layout, but it also freezes the document — editing a PDF is far more limited than editing the .docx. Keep both files: the editable one for future changes, the PDF for sending.</p>

<h2>A quick checklist before sending</h2>
<ol>
  <li>Every placeholder replaced (search for "[" and "]" to find leftovers).</li>
  <li>Headings still show as headings in the navigation pane.</li>
  <li>Table of contents updated.</li>
  <li>Header, footer, page numbers and document title corrected.</li>
  <li>Spell-check run with the right language set.</li>
  <li>Exported to PDF and the PDF opened once to confirm the layout.</li>
</ol>
<p>If you work with Word documents regularly, the <a href="/word-templates">Word template collection</a> includes project plans, change requests and financial documents built with these styles already in place.</p>
`,
  },
  {
    slug: "before-using-a-free-business-template",
    title: "What to check before using a free business template",
    description:
      "Licence, sample data, formulas and print settings: the five checks that separate a template you can ship from one that causes problems later.",
    published: "2026-10-02",
    updated: "2026-10-02",
    readingMinutes: 6,
    topic: "Buying guides",
    html: `
<p>A free template can save hours, but it can also hand you a document with someone else's data, a broken formula or a licence that forbids commercial use. Five checks take about ten minutes and prevent most of the problems that appear weeks later.</p>

<h2>1. Read the licence before you rely on the file</h2>
<p>"Free" describes the price, not the permissions. A template can be free to download and still forbid resale, redistribution or use in client work. Look for an explicit statement covering personal and commercial use, and whether you may modify and redistribute the result. If the listing does not state a licence, ask before you build a business process on top of it.</p>

<h2>2. Hunt down the sample data</h2>
<p>Templates ship with example names, amounts and dates because an empty table is hard to design against. Those examples have a habit of surviving into the finished document: a stray "John Smith" in a footer, a placeholder email in a signature block, a test figure in a summary cell that is not part of the range you replaced.</p>
<ul>
  <li>Search for common placeholder words: "sample", "example", "your company", "lorem".</li>
  <li>Check headers, footers, comments and hidden sheets, not just the visible cells.</li>
  <li>In spreadsheets, use Find across the whole workbook, not the active sheet.</li>
</ul>

<h2>3. Test the formulas with your own numbers</h2>
<p>Open the workbook, enter a deliberately awkward set of values and check that totals still make sense: a zero, a negative number, a very large number. Then look at the formula itself — is the range fixed, or does it stop one row short of the data? Common failures are totals that ignore newly inserted rows, percentages divided by zero, and lookups that break when a name is spelled differently.</p>

<h2>4. Check page setup and print output</h2>
<p>A spreadsheet that looks perfect on screen can print across six pages with the total on its own sheet. Before you send anything, open the print preview and check orientation, scaling, margins, repeating header rows and the print area. In Word, confirm the page size matches your region (A4 is not the same as US Letter) and that fonts are available on the recipient's machine or embedded in the PDF.</p>

<h2>5. Confirm the file format fits your workflow</h2>
<p>The same template may be offered as .xlsx and .csv, or as .docx and .pdf. An editable format is what you want if you will change the content; a PDF is better for a final, fixed document. If you need to import data into another system, check whether that system accepts the format before you invest time in the template.</p>

<h2>Red flags worth walking away from</h2>
<ul>
  <li>No licence information anywhere on the page.</li>
  <li>Download links that require an account for a file described as free.</li>
  <li>Screenshots that do not match the actual file.</li>
  <li>Macros you cannot inspect, especially in files from unknown sources.</li>
  <li>Bundled fonts or images with no stated rights.</li>
</ul>

<h2>A ten-minute workflow</h2>
<ol>
  <li>Download, keep the original untouched, and save a working copy.</li>
  <li>Replace sample data, then re-check totals.</li>
  <li>Set page size, margins and print area.</li>
  <li>Save your own version with a clear name and a date.</li>
  <li>Keep a note of where the template came from and under which licence.</li>
</ol>
<p>Doing this once per template is far cheaper than discovering the problem after the document has been sent to a client.</p>
`,
  },
  {
    slug: "build-a-realistic-monthly-budget",
    title: "How to build a realistic monthly budget from a template",
    description:
      "A budget fails when the categories do not match how you actually spend. A step-by-step method for turning a spreadsheet template into a plan you will keep using.",
    published: "2026-10-02",
    updated: "2026-10-02",
    readingMinutes: 7,
    topic: "Spreadsheets",
    html: `
<p>Most budgets are abandoned in the second month. The usual reason is not discipline: it is that the categories were invented from memory instead of measured, so the plan never matched reality and every month started with a correction. A template gives you the structure; the numbers still have to come from your own records.</p>

<h2>Start from last month, not from an ideal</h2>
<p>Open your bank statement and card statement for the previous month and list every outgoing transaction. Group them as you go, but do not aim for a perfect taxonomy on the first pass. The goal is a list that reflects what actually happened, not what you think should happen.</p>
<p>If you do not have statements to hand, use two weeks of receipts and multiply by roughly two. It is less accurate, but far better than a guess.</p>

<h2>Separate fixed, variable and irregular costs</h2>
<ul>
  <li><strong>Fixed:</strong> rent or mortgage, subscriptions, insurance, loan instalments. These repeat at the same amount and are easy to plan.</li>
  <li><strong>Variable:</strong> food, transport, utilities, entertainment. These repeat but change amount, so plan them with a realistic average rather than the best-case month.</li>
  <li><strong>Irregular:</strong> annual insurance, car maintenance, school fees, holidays. Divide the yearly total by twelve and put that amount aside every month, even though the bill arrives once.</li>
</ul>
<p>The irregular category is the one most budgets leave out, and it is the one that breaks them. A €600 annual payment is €50 a month; if it is not in the plan, it becomes an emergency.</p>

<h2>Build the budget in three blocks</h2>
<ol>
  <li><strong>Income:</strong> use the amount you reliably receive, not the best month. If income varies, use the average of the last three months and treat anything above it as a bonus.</li>
  <li><strong>Commitments:</strong> fixed and irregular costs first, because they are not negotiable this month.</li>
  <li><strong>Everything else:</strong> what remains is your real spending money. Split it across variable categories and keep a small buffer — five to ten percent — for the things you did not predict.</li>
</ol>

<h2>Use the template's structure, not its sample numbers</h2>
<p>A budget workbook usually has a summary sheet fed by category rows. Replace the category names before replacing the numbers: the summary formulas reference rows, so renaming a category keeps the structure while deleting a row can break the totals. After editing, enter one test figure in each section and confirm the totals update.</p>

<h2>Review weekly, not monthly</h2>
<p>A monthly review arrives too late to change anything. Ten minutes a week is enough to enter transactions and notice a category drifting. The point is not to restrict spending but to see the trend while there is still time to adjust.</p>

<h2>What to do when you overspend</h2>
<p>Do not rewrite the budget to match the overspend — that hides the signal. Note which category went over, by how much, and whether the cause was one-off or recurring. If the same category is over three months running, the plan is wrong, not the spending: raise that category and reduce another deliberately.</p>

<h2>A short checklist</h2>
<ol>
  <li>Categories come from real transactions.</li>
  <li>Irregular annual costs are divided by twelve.</li>
  <li>Income is the reliable figure, not the best month.</li>
  <li>A buffer exists for the unpredictable.</li>
  <li>The file is backed up and named with the month and year.</li>
</ol>
<p>Ready-made workbooks for this method are in the <a href="/excel-templates">Excel template collection</a>, including monthly budgets, cash-flow forecasts and personal financial planners.</p>
`,
  },
  {
    slug: "what-a-professional-invoice-must-include",
    title: "What a professional invoice must include",
    description:
      "The fields that make an invoice usable for accounting, tax and payment — plus the details that cause late payment when they are missing.",
    published: "2026-10-02",
    updated: "2026-10-02",
    readingMinutes: 6,
    topic: "Business",
    html: `
<p>An invoice is not a letter asking for money. It is a record that both sides will use for accounting, tax and, if things go wrong, evidence. A missing field can delay payment or make the document impossible to reconcile. The exact legal requirements vary by country, so treat this as the practical baseline and check your local rules.</p>

<h2>Identify both parties clearly</h2>
<p>The invoice should carry the legal name, address and contact details of the seller, and the registered name and address of the buyer. Trading names are fine for display, but the legal entity is what accountants and tax authorities recognise. If you trade under a VAT or tax number, include it — buyers in many jurisdictions cannot reclaim tax without it.</p>

<h2>Give the invoice a unique, sequential number</h2>
<p>Numbers must be unique and traceable. A simple scheme such as <code>2026-001</code>, incremented for each invoice, is enough for most small businesses. Avoid reusing a number after a cancelled invoice: most systems expect a gap rather than a duplicate.</p>

<h2>State the dates</h2>
<ul>
  <li><strong>Issue date:</strong> when the invoice was raised.</li>
  <li><strong>Supply date:</strong> when the goods or services were delivered, if different. Tax treatment often depends on this date.</li>
  <li><strong>Due date:</strong> the date payment is expected. "Net 30" is clearer than "due on receipt".</li>
</ul>

<h2>Describe what was supplied</h2>
<p>Each line should describe the item or service specifically enough that the buyer recognises it, with quantity, unit price and line total. "Consulting services — 12 hours at €80" is usable; "services — €960" is not. Vague lines are a common cause of invoices being queried and payment delayed.</p>

<h2>Show the tax calculation</h2>
<p>If tax applies, show the rate, the taxable amount and the tax amount, then the grand total. If you are not charging tax because of an exemption or because you are below a threshold, say so on the invoice — a missing tax line is otherwise read as an error. For a mixed-rate invoice, show the breakdown rather than a single blended rate.</p>

<h2>Add payment instructions</h2>
<p>Bank name, account name, IBAN or account number, and the reference to quote. The reference matters: without it, payments arrive and cannot be matched. If you accept card payments, state the fee arrangement rather than letting the customer discover it later.</p>

<h2>Late payment terms</h2>
<p>State what happens if the invoice is paid late — interest, a fixed fee, suspension of work. Many jurisdictions require a specific wording; a generic "late payments may incur charges" is better than nothing but may not be enforceable. Keep the terms in your contract as well as the invoice.</p>

<h2>Keep a copy, and keep it for the required period</h2>
<p>Store a PDF of every invoice you issue, together with the record of payment. Retention periods vary, but four to ten years is typical. If you send an invoice and later correct it, issue a credit note rather than editing the original: accountants need the paper trail.</p>

<h2>Quick checklist</h2>
<ol>
  <li>Legal names, addresses and tax numbers for both parties.</li>
  <li>Unique invoice number.</li>
  <li>Issue date, supply date and due date.</li>
  <li>Itemised lines with quantities and prices.</li>
  <li>Tax rate, amount and total.</li>
  <li>Payment details and a reference.</li>
  <li>Late-payment terms.</li>
</ol>
<p>You can produce a compliant invoice in the browser with the <a href="/tools/invoice-generator">invoice generator</a>, or start from a workbook in the <a href="/excel-templates">Excel accounting templates</a>.</p>
`,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
