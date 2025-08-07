import Accordion from "./ui/accordion";
import { header_font } from "../fonts";
import Image from "next/image";

function Appendix() {
  return (
    <section className="m-auto w-[min(100vw,1200px)] pt-[min(3vw,30px)] pb-[min(5vw,50px)] flex sm:flex-row flex-col justify-around">
      <div className="sm:w-[50%] w-[100%] flex">
        <div className="rounded-[5px] py-[20px] px-[40px] m-auto sm:w-[100%] w-[80%] bg-red-400">
          <h2
            className={`${header_font.className} mb-[8px] hidden sm:block text-l font-semibold text-center`}
          >
            FAQs
          </h2>
          <h2
            className={`${header_font.className} mb-[8px] sm:hidden text-l font-semibold text-center`}
          >
            Frequently Asked Questions
          </h2>
          <Accordion />
        </div>
      </div>
      <aside className="sm:w-[40%] w-full sm:m-0 mt-[20px] flex">
        <div className="w-[90%] rounded-[4px] overflow-hidden sm:w-[100%] sm:h-full h-[120px] m-auto relative">
          <Image
            fill
            src="/images/google_ads.avif"
            alt="google ads"
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
      </aside>
    </section>
  );
}

export default Appendix;
