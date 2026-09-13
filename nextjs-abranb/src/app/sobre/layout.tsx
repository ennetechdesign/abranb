/**
 * Shared layout for /sobre/* pages (historia, pautas, documentos).
 *
 * For a new page in this directory:
 * 1. If content has many related sections (5+), follow the historia pattern:
 *    - Create sections/ subdirectory with component files for each section
 *    - Create a types.ts exporting sectionIds array and section component props
 *    - Create an XSections wrapper component with sectionComponents registry map
 *    - Call buildLocaleMetadata() in generateMetadata()
 *
 * 2. If content is simpler (1-3 sections), follow the pautas/documentos pattern:
 *    - Create an XContent wrapper component with all sections inline
 *    - Call buildLocaleMetadata() in generateMetadata()
 *    - Use LocaleResource<"namespace"> type from @/i18n/resources for type safety
 *
 * See historia-sections.tsx and pautas/page.tsx for examples.
 */
export default function SobreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen w-full">{children}</main>;
}
