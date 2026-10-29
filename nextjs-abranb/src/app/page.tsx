import { HomeScrollToHash, HomePageSections } from "./home-sections";
import Hero from "./home-sections/sections/hero";
import { fetchCategoryBySlug, fetchPublicationsByCategory } from "@/sanity/blog";
import { getImageUrl } from "@/sanity/image";
import type { SlideShowNotice } from "./home-sections/components/slide-show";

const HOME_NEWS_CATEGORY_SLUG = "noticias-da-nossa-articulacao";

export default async function IndexPage() {
  const category = await fetchCategoryBySlug(HOME_NEWS_CATEGORY_SLUG, "noticia");
  const posts = category
    ? await fetchPublicationsByCategory({ type: "noticia", categoryId: category._id, offset: 0, limit: 3 })
    : [];
  const homeNotices: SlideShowNotice[] = posts.map((post, index) => {
    const imageUrl = getImageUrl(post.coverImage, 900, 600);
    return {
      id: index + 1,
      foto: imageUrl ?? "/images/imagem-indisponivel.png",
      titulo: post.title,
      descricao: post.subtitle ?? "",
      href: `/${post.slug}`,
      imageAlt: imageUrl ? (post.coverImage?.alt ?? post.title) : "Imagem indisponível",
      imageFit: imageUrl ? "cover" : "contain",
    };
  });

  return (
    <>
      <HomeScrollToHash />
      <main className="container min-h-screen max-w-full">
        <Hero />
        <HomePageSections homeNotices={homeNotices} />
      </main>
    </>
  );
}
