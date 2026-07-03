/**
 * Injects a schema.org JSON-LD block. Render inside a Server Component so the
 * script is present in the initial HTML for crawlers.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
