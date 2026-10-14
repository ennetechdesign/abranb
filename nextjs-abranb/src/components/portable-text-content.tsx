import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";

import { urlFor } from "@/sanity/image";
import type { PublicationImage } from "@/sanity/publication";

function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href);
}

type BodyImageValue = PublicationImage & {
  _key?: string;
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-heading mt-8 mb-3 font-bold text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lead mt-6 mb-2 font-bold text-foreground">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-body mt-6 mb-2 font-bold text-foreground">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-title-decoration text-lead my-6 border-l-4 pl-4 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="text-body my-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-body my-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="text-body my-4 list-decimal space-y-2 pl-6">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = (value as { href?: unknown } | undefined)?.href;
      if (typeof href !== "string" || href.length === 0) {
        return <span>{children}</span>;
      }
      const external = isExternalHref(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="text-link underline underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const image = value as BodyImageValue;
      const src = urlFor(image)?.width(1200).url();
      if (!src) {
        return null;
      }
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={image.alt || ""}
            width={1200}
            height={630}
            sizes="(max-width: 768px) 100vw, 768px"
            className="h-auto w-full rounded-2xl"
          />
          {image.caption ? (
            <figcaption className="text-caption text-muted-foreground mt-2 text-center">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[] | null | undefined;
}) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }
  return (
    <div className="text-foreground max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
