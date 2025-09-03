import Accordion from "./ui/accordion";
import { main_font } from "../../fonts";
import Image from "next/image";

function FAQ() {
  return (
    <div className="md:w-[60%] sm:w-[90%] w-[100%] md:m-0 m-auto flex text-[var(--color)]">
      <div className="rounded-[4px] px-[4vw] py-[2vw] w-[100%] bg-[var(--red-bg)]">
        <h2
          className={`${main_font.className} italic b-[8px] mb-[min(2vw,20px)] text-l font-semibold text-center`}
        >
          Frequently Asked Questions
        </h2>
        <Accordion />
      </div>
    </div>
  );
}

function Ads() {
  return (
    <aside className="md:w-[30%] w-full md:mt-0 mt-[min(4.5vw,35px)] flex">
      <div className="w-[100%] overflow-hidden md:w-[100%] md:h-full h-[20vw] m-auto relative">
        <Image
          fill
          src="/common_image/google_ads.webp"
          alt="google ads"
          style={{ objectFit: "cover" }}
        ></Image>
      </div>
    </aside>
  );
}

function Appendix() {
  return (
    <section className="m-auto w-[min(90%,1200px)] my-[min(5vw,50px)] flex md:flex-row flex-col justify-between">
      <FAQ />
      <Ads />
    </section>
  );
}

export default Appendix;
