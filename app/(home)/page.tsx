import HeroSection from "./components/HeroSection";
import NewsSection from "./components/NewsSection";

import ReadSection from "./components/ReadSection";
import FunFact from "./components/FunFact";

import DownloadSection from "./components/DownloadSection";
import Appendix from "./components/FAQ+Ads";
import Footer from "./components/Footer";

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
    cookieStore.get("bookmark_list")?.value || "[]"
  );

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <NewsSection />

      <div className="h-[min(6vw,60px)]"></div>
      <ReadSection query={query} bookmark_list={bookmark_list} />
      <FunFact />
      <DownloadSection />

      <Appendix />
      <Footer />
    </div>
  );
}
