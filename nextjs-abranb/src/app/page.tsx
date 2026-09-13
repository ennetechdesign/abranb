import { HomeScrollToHash, HomePageSections } from "./home-sections";
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
