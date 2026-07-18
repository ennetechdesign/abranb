import { HomeScrollToHash } from "@/components/home-scroll-to-hash";
import { HomePageSections } from "@/components/home-page-sections";
import Hero from "@/components/componentsHome/sections/hero";

export default async function IndexPage() {

  return (
    <>
      < HomeScrollToHash />
      <main className="container min-h-screen max-w-full">
        <Hero />
        <HomePageSections />
      </main>
    </>
  );
}
