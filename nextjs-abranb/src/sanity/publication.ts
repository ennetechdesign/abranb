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
  publishedAt: string;
  authorName?: string | null;
  authorPhoto?: PublicationImage | null;
  authorLink?: string | null;
  coverImage?: PublicationImage | null;
  body?: PortableTextBlock[];
}

/** Opções de fetch padrão: estático com revalidação periódica. */
export const SANITY_REVALIDATE_OPTIONS = { next: { revalidate: 30 } } as const;

const PUBLICATION_FIELDS = groq`
  _id,
  title,
  subtitle,
  publicationType,
  "slug": slug.current,
  publishedAt,
  authorName,
  authorPhoto,
  authorLink,
  "coverImage": image,
  body
`;

/** Condição de visibilidade pública: com slug e data válida, nunca futura. */
const PUBLISHED_CONDITION = groq`
  defined(slug.current)
  && defined(publishedAt)
  && publishedAt <= now()
`;

/**
 * Listagem pública, da mais recente para a mais antiga. O parâmetro
 * `$filter` aceita "todas", "noticia" ou "artigo".
 */
export const PUBLICATIONS_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && ($filter == "todas" || publicationType == $filter)] | order(publishedAt desc) {
  ${PUBLICATION_FIELDS}
}`;

/** Detalhe público por slug; retorna null para slug inexistente ou não publicado. */
export const PUBLICATION_DETAIL_QUERY = groq`*[_type == "post" && slug.current == $slug && ${PUBLISHED_CONDITION}][0] {
  ${PUBLICATION_FIELDS}
}`;

/** Publicações recentes do mesmo tipo, excluindo a atual. */
export const RELATED_PUBLICATIONS_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && slug.current != $slug && publicationType == $publicationType] | order(publishedAt desc)[0...3] {
  ${PUBLICATION_FIELDS}
}`;

/** Publicações recentes excluindo os slugs informados (complemento). */
export const RECENT_PUBLICATIONS_QUERY = groq`*[_type == "post" && ${PUBLISHED_CONDITION} && !(slug.current in $exclude)] | order(publishedAt desc)[0...3] {
  ${PUBLICATION_FIELDS}
}`;
