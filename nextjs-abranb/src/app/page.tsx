import { type SanityDocument } from "next-sanity";

import { HomeScrollToHash } from "@/components/home-scroll-to-hash";
import { HomeSectionPlaceholders } from "@/components/home-section-placeholders";
import { PostsList } from "@/components/posts-list";
import { client } from "@/sanity/client";
import Hero from "@/components/componentsHome/hero";

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
      <main className="container min-h-screen max-w-full">
        <Hero />
        <HomeSectionPlaceholders />
        <PostsList posts={posts} />
      </main>
    </>
  );
}
