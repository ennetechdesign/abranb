import { groq } from "next-sanity";
import { client } from "./client";
import {
  PUBLISHED_CONDITION,
  PUBLICATION_FIELDS,
  PUBLICATIONS_BY_TYPE_QUERY,
  PUBLICATIONS_BY_TYPE_COUNT_QUERY,
  type Publication,
} from "./publication";

export type PublicationCategory = {
  _id: string;
  title: string;
  slug: string;
  publicationType: "artigo" | "noticia";
  description?: string | null;
};

const CATEGORY_FIELDS = groq`
  _id,
  title,
  "slug": slug.current,
  publicationType,
  description
`;

/** Todas as categorias de um tipo de publicação, ordenadas por nome (A-Z). */
export const CATEGORIES_QUERY = groq`*[_type == "publicationCategory" && publicationType == $type] | order(title asc) {
  ${CATEGORY_FIELDS}
}`;

/** Uma categoria pelo seu slug. */
export const CATEGORY_BY_SLUG_QUERY = groq`*[_type == "publicationCategory" && slug.current == $slug && ($type == null || publicationType == $type)][0] {
  ${CATEGORY_FIELDS}
}`;

/** Publicações de uma categoria, da mais recente para a mais antiga, com limite. */
export const PUBLICATIONS_BY_CATEGORY_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && publicationType == $type && category._ref == $categoryId] | order(coalesce(originalPublishedAt, scheduledAt, _createdAt) desc) [$offset...$limit] {
  ${PUBLICATION_FIELDS}
}`;

/** Contagem total de publicações de uma categoria (para paginação). */
export const PUBLICATIONS_BY_CATEGORY_COUNT_QUERY = groq`count(*[_type == "post" && ${PUBLISHED_CONDITION} && publicationType == $type && category._ref == $categoryId])`;

const options = { next: { revalidate: 30 } } as const;

export async function fetchCategories(
  type: "artigo" | "noticia",
): Promise<PublicationCategory[]> {
  return client.fetch<PublicationCategory[]>(CATEGORIES_QUERY, { type }, options);
}

export async function fetchCategoryBySlug(
  slug: string,
  type?: "artigo" | "noticia",
): Promise<PublicationCategory | null> {
  return client.fetch<PublicationCategory | null>(CATEGORY_BY_SLUG_QUERY, { slug, type: type ?? null }, options);
}

export async function fetchPublicationsByType({ type, offset, limit }: {
  type: "artigo" | "noticia";
  offset: number;
  limit: number;
}): Promise<Publication[]> {
  return client.fetch<Publication[]>(PUBLICATIONS_BY_TYPE_QUERY, { type, offset, limit }, options);
}

export async function countPublicationsByType(type: "artigo" | "noticia"): Promise<number> {
  return client.fetch<number>(PUBLICATIONS_BY_TYPE_COUNT_QUERY, { type }, options);
}

export async function fetchPublicationsByCategory({
  type,
  categoryId,
  offset,
  limit,
}: {
  type: "artigo" | "noticia";
  categoryId: string;
  offset: number;
  limit: number;
}): Promise<Publication[]> {
  return client.fetch<Publication[]>(
    PUBLICATIONS_BY_CATEGORY_QUERY,
    { type, categoryId, offset, limit },
    options,
  );
}

export async function countPublicationsByCategory({
  type,
  categoryId,
}: {
  type: "artigo" | "noticia";
  categoryId: string;
}): Promise<number> {
  return client.fetch<number>(
    PUBLICATIONS_BY_CATEGORY_COUNT_QUERY,
    { type, categoryId },
    options,
  );
}

/** Quantidade centralizada de publicações por página nas listagens paginadas. */
export const POSTS_PER_PAGE = 10;
