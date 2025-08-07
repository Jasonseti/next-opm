import LandingHead from "../../../components/home/landing-head";
import ReadSection from "../../../components/home/read-section";
import DownloadSection from "../../../components/home/download-section";
import Appendix from "../../../components/home/faq + ads";
import FunFacts from "../../../components/home/fun-facts";
import NewsSection from "../../../components/home/news-section";

export default function Page() {
  return (
    <>
      <LandingHead></LandingHead>
      <NewsSection></NewsSection>
      <ReadSection></ReadSection>
      <FunFacts></FunFacts>
      <DownloadSection></DownloadSection>
      <Appendix></Appendix>
    </>
  );
}
