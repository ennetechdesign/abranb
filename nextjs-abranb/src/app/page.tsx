import { type SanityDocument } from "next-sanity";

import { PostsList } from "@/components/posts-list";
import { client } from "@/sanity/client";
import { LocaleSwitcher } from "@/components/locale-switcher";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <div className="mb-6 flex flex-wrap items-center justify-end gap-4">
        <LocaleSwitcher/>
      </div>

      <PostsList posts={posts}/>
    </main>
  );
}
