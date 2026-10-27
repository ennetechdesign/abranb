import { groq } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

export type PublicationType = "noticia" | "artigo";

export interface PublicationImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  crop?: {
    _type?: string;
    left: number;
    bottom: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type?: string;
    width: number;
    height: number;
    x: number;
    y: number;
  };
  alt?: string;
  caption?: string;
}

export interface Publication {
  _id: string;
  title: string;
  subtitle?: string | null;
  publicationType?: PublicationType | null;
  slug: string;
  originalPublishedAt?: string | null;
  scheduledAt?: string | null;
  authorName?: string | null;
  authorPhoto?: PublicationImage | null;
  authorLink?: string | null;
  coverImage?: PublicationImage | null;
  body?: PortableTextBlock[];
  category?: {
    _id: string;
    title: string;
    slug: string;
    publicationType: string;
  } | null;
}

/** Opções de fetch padrão: estático com revalidação periódica. */
export const SANITY_REVALIDATE_OPTIONS = { next: { revalidate: 30 } } as const;

/** Publicações agendadas só aparecem quando o horário de publicação chega. */
export const PUBLISHED_CONDITION = groq`
  defined(slug.current)
  && (!coalesce(schedulePublication, false) || (defined(scheduledAt) && scheduledAt <= now()))
`;

/** Campos públicos de uma publicação, incluindo a categoria referência. */
export const PUBLICATION_FIELDS = groq`
  _id,
  title,
  subtitle,
  publicationType,
  "slug": slug.current,
  originalPublishedAt,
  scheduledAt,
  authorName,
  authorPhoto,
  authorLink,
  "coverImage": image,
  body,
  "category": category->{
    _id,
    title,
    "slug": slug.current,
    publicationType
  }
`;

export const PUBLICATIONS_BY_TYPE_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && publicationType == $type] | order(coalesce(originalPublishedAt, scheduledAt, _createdAt) desc) [$offset...$end] {
  ${PUBLICATION_FIELDS}
}`;

export const PUBLICATIONS_BY_TYPE_COUNT_QUERY = groq`count(*[_type == "post" && ${PUBLISHED_CONDITION} && publicationType == $type])`;

/**
 * Listagem pública, da mais recente para a mais antiga. O parâmetro
 * `$filter` aceita "todas", "noticia" ou "artigo".
 */
export const PUBLICATIONS_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && ($filter == "todas" || publicationType == $filter)] | order(coalesce(originalPublishedAt, scheduledAt, _createdAt) desc) {
  ${PUBLICATION_FIELDS}
}`;

/** Detalhe público por slug; retorna null para slug inexistente ou não publicado. */
export const PUBLICATION_DETAIL_QUERY = groq`*[_type == "post" && slug.current == $slug && ${PUBLISHED_CONDITION}][0] {
  ${PUBLICATION_FIELDS}
}`;

/** Publicações recentes do mesmo tipo, excluindo a atual. */
export const RELATED_PUBLICATIONS_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && slug.current != $slug && publicationType == $publicationType] | order(coalesce(originalPublishedAt, scheduledAt, _createdAt) desc)[0...3] {
  ${PUBLICATION_FIELDS}
}`;

/** Publicações recentes excluindo os slugs informados (complemento). */
export const RECENT_PUBLICATIONS_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && !(slug.current in $exclude)] | order(coalesce(originalPublishedAt, scheduledAt, _createdAt) desc)[0...3] {
  ${PUBLICATION_FIELDS}
}`;
