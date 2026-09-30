/**
 * Rendered when the catalogue API could not be reached while the page was
 * being built. The URL is real, so the response must stay 200: turning an
 * API hiccup into a 404 would tell search engines the page does not exist.
 */
export default function LoadUnavailable({
  title = "This collection is temporarily unavailable",
  description = "The template catalogue could not be reached while this page was being built. Please try again in a few minutes.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <main
      className="container section"
      style={{ padding: "80px 0", textAlign: "center" }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "12px" }}>
        {title}
      </h1>
      <p style={{ color: "var(--muted)", maxWidth: 560, margin: "0 auto" }}>
        {description}
      </p>
    </main>
  );
}
