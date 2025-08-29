import HeroSection from "./components/HeroSection";
import NewsSection from "./components/NewsSection";

import ReadSection from "./components/ReadSection";
import FunFact from "./components/FunFact";

import DownloadSection from "./components/DownloadSection";
import Appendix from "./components/FAQ+Ads";
import Footer from "./components/Footer";

export default async function HomePage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <NewsSection />

      <ReadSection query={query} />
      <FunFact />
      <DownloadSection />

      <Appendix />
      <Footer />
    </div>
  );
}
