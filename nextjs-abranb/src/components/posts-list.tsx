"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import type { SanityDocument } from "next-sanity";

type PostsListProps = {
  posts: SanityDocument[];
};

export function PostsList({ posts }: PostsListProps) {
  const { t, i18n } = useTranslation("common");

  return <>
  <h1 className="text-display mb-8 font-bold">{t("posts_title")}</h1>
  <ul className="flex flex-col gap-y-4">
    {posts.map((post) => (
      <li className="hover:underline" key={post._id}>
        <Link href={`/${post.slug.current}`}>
          <h2 className="text-lead font-semibold">{post.title}</h2>
          <p className="text-body text-muted-foreground">
            {post.publishedAt
              ? new Date(post.publishedAt as string).toLocaleDateString(i18n.language)
              : null}
          </p>
        </Link>
      </li>
    ))}
  </ul>
</>;
}
