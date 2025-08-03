import LandingHead from "../../components/home/landing-head";
import ReadSection from "../../components/home/read-section";
import DownloadSection from "../../components/home/download-section";
import Appendix from "../../components/home/faq + ads";

export default function Page() {
  return (
    <>
      <LandingHead></LandingHead>
      <ReadSection></ReadSection>
      <DownloadSection></DownloadSection>
      <Appendix></Appendix>
    </>
  );
}
