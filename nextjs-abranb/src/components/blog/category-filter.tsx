"use client";

import { DropdownMenu } from "@/components/dropdown-menu";
import type { PublicationCategory } from "@/sanity/blog";

type CategoryFilterProps = {
  categories: PublicationCategory[];
  typeLabel: string;
  type: "artigo" | "noticia";
  selectedCategorySlug?: string;
  "aria-label"?: string;
};

const ALL_OPTION_LABEL = "Categoria";

export function CategoryFilter({
  categories,
  typeLabel,
  type,
  selectedCategorySlug,
  "aria-label": ariaLabel,
}: CategoryFilterProps) {
  const items = [
    { href: `/blog/${type}`, label: `Ver todas as ${typeLabel.toLowerCase()}` },
    ...categories.map((category) => ({
      href: `/blog/categoria/${category.slug}?type=${type}`,
      label: category.title,
      current: category.slug === selectedCategorySlug,
    })),
  ];
  const selectedCategory = categories.find((category) => category.slug === selectedCategorySlug);

  return (
    <DropdownMenu
      triggerVariant="textOnPurple"
      triggerLabel={selectedCategory ? <span className="max-w-[55vw] truncate sm:max-w-64" title={selectedCategory.title}>{selectedCategory.title}</span> : ALL_OPTION_LABEL}
      align="end"
      panelClassName="max-w-[calc(100vw-1rem)]"
      items={items}
      active={Boolean(selectedCategory)}
      ariaHasPopup="menu"
      panelRole="menu"
      panelAriaLabel={ariaLabel ?? `Filtrar ${typeLabel.toLowerCase()} por categoria`}
      triggerClassName="px-4 py-2.5 rounded-[50px] border border-border-subtle bg-surface-elevated"
    />
  );
}

