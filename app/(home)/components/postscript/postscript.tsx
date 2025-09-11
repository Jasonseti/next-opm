import clsx from "clsx";
import Accordion from "./accordion";
import Image from "next/image";
import { header_font } from "../../../fonts";

export default function PostScript() {
  return (
    <section
      className={clsx(
        "w-[min(90vw,1000px)] mx-auto my-[min(5vw,50px)]",
        "flex flex-col md:flex-row justify-between"
      )}
    >
      <FAQ />
      <Ads />
    </section>
  );
}

function FAQ() {
  return (
    <div
      className={clsx(
        "md:w-[60%] sm:w-[90%] mx-auto md:m-0 px-[min(4vw,40px)] py-[min(3vw,30px)]",
        "rounded-[min(2vw,10px)] text-black bg-[var(--primary-red)]",
        "text-[1.4em]"
      )}
    >
      <h2
        className={`mb-[min(1vw,10px)] ${header_font.className} text-[1.4em] font-semibold text-center text-white`}
      >
        Frequently Asked Questions
      </h2>

      <Accordion />
    </div>
  );
}

function Ads() {
  return (
    <aside className="h-[20vw] md:w-[35%] md:h-[calc-size(auto,size)] mt-[4vw] md:mt-0 relative">
      <Image
        fill
        src="/common_image/google_ads.webp"
        alt="google_ads"
        style={{ objectFit: "cover" }}
      ></Image>
    </aside>
  );
}
