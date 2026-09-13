import { HomeScrollToHash } from "./home-scroll-to-hash";
import { HomePageSections } from "./home-page-sections";
import Hero from "./home-sections/sections/hero";

export default async function IndexPage() {
  return (
    <>
      <HomeScrollToHash />
      <main className="container min-h-screen max-w-full">
        <Hero />
        <HomePageSections />
      </main>
    </>
  );
}
