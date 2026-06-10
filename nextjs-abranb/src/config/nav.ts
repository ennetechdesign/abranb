/** i18n keys must exist in common.json for each `labelKey`. */

export type NavPageEntry = {
  href: string;
  labelKey: string;
};

export type NavSectionEntry = {
  /** DOM id on the home page (hash without #). */
  sectionId: string;
  labelKey: string;
};

/** “Páginas” — routes (placeholders until pages exist). */
export const navDrawerPages: NavPageEntry[] = [
  { href: "/", labelKey: "nav_page_home" },
  { href: "/sobre/glossario", labelKey: "nav_sobre_glossary" },
  { href: "/sobre/historia", labelKey: "nav_sobre_history" },
  { href: "/sobre/coletivos", labelKey: "nav_sobre_partners" },
  { href: "/sobre/pautas", labelKey: "nav_sobre_topics" },
  { href: "/documentos", labelKey: "nav_page_documents" },
  { href: "/arquivos", labelKey: "nav_page_archives" },
  { href: "/blog", labelKey: "nav_page_blog" },
];

/** “Seções da página” — in-page anchors on `/`. */
export const navDrawerSections: NavSectionEntry[] = [
  { sectionId: "o-que-e-nao-binario", labelKey: "nav_section_nonbinary" },
  { sectionId: "noticias-abranb", labelKey: "nav_section_news" },
  { sectionId: "nossa-historia", labelKey: "nav_section_our_history" },
  { sectionId: "nossas-conexoes", labelKey: "nav_section_connections" },
  { sectionId: "sintese-pautas", labelKey: "nav_section_topics" },
  { sectionId: "documentos-produzidos", labelKey: "nav_section_documents" },
  { sectionId: "arquivos-historicos", labelKey: "nav_section_archives" },
  { sectionId: "areas-tematicas", labelKey: "nav_section_thematic_areas" },
  { sectionId: "contato", labelKey: "nav_section_contact" },
  { sectionId: "faca-parte", labelKey: "nav_section_join" },
  { sectionId: "doacao", labelKey: "nav_section_donate" },
];

export const navAboutDropdownItems: { href: string; labelKey: string }[] = [
  { href: "/sobre/glossario", labelKey: "nav_sobre_glossary" },
  { href: "/sobre/historia", labelKey: "nav_sobre_history" },
  { href: "/sobre/coletivos", labelKey: "nav_sobre_partners" },
  { href: "/sobre/pautas", labelKey: "nav_sobre_topics" },
];

export const navLibraryDropdownItems: { href: string; labelKey: string }[] = [
  { href: "/biblioteca", labelKey: "nav_lib_all" },
  { href: "/biblioteca/destaques", labelKey: "nav_lib_highlights" },
];
