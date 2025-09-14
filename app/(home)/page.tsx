import HeroSection from "./components/hero-section/hero-section";
import NewsSection from "./components/news-section/news-section";
import ThemeSwitch from "./components/theme-switch";
import ReadSection from "./components/read-section/read-section";
import FunFact from "./components/fun-fact/fun-fact";
import DownloadSection from "./components/download-section/download-section";
import PostScript from "./components/postscript/postscript";
import Footer from "./components/footer-section/footer-section";
import { cookies } from "next/headers";

export default async function HomePage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const cookieStore = await cookies();
  const bookmark_list = JSON.parse(
    cookieStore.get("bookmarked_list")?.value || "[]"
  );

  return (
    <main className="overflow-hidden text-[2vw] sm:text-[1.5vw] lg:text-[min(1.2vw,12px)]">
      <HeroSection />
      <NewsSection />

      <ThemeSwitch />
      <ReadSection query={query} bookmark_list={bookmark_list} />
      <FunFact />

      <DownloadSection />
      <PostScript />
      <Footer />
    </main>
  );
}
