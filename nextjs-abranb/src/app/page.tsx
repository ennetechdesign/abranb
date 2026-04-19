import { type SanityDocument } from "next-sanity";

import { HomeScrollToHash } from "@/components/home-scroll-to-hash";
import { HomeSectionPlaceholders } from "@/components/home-section-placeholders";
import { PostsList } from "@/components/posts-list";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <>
      < HomeScrollToHash />
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <PostsList posts={posts} />
        <HomeSectionPlaceholders />
      </main>
    </>
  );
}
