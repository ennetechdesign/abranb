import { HomeScrollToHash } from "@/components/home-scroll-to-hash";
import { HomeSectionPlaceholders } from "@/components/home-section-placeholders";
import Hero from "@/components/componentsHome/sections/hero";

export default async function IndexPage() {

  return (
    <>
      < HomeScrollToHash />
      <main className="container min-h-screen max-w-full">
        <Hero />
        <HomeSectionPlaceholders />
      </main>
    </>
  );
}
