import clsx from "clsx";
import Image from "next/image";
import { quote_font } from "../../../fonts";

export default function NewsSection() {
  return (
    <section
      className={clsx(
        "w-[90vw] max-w-[1000px] mx-auto p-[min(4vw,40px)]",
        "bg-[var(--primary-red)] text-white rounded-b-[6px]",
        "flex justify-between"
      )}
    >
      <Headline />
      <div className="relative md:block hidden w-[30%]">
        <Image
          fill
          style={{ objectFit: "cover" }}
          src="/common_image/google_ads.webp"
          alt="google_ads"
        />
      </div>
    </section>
  );
}

function Headline() {
  return (
    <div className="md:w-[65%]">
      <h2
        className={`${quote_font.className} text-center text-[2.2em] relative bottom-[10px] font-bold`}
      >
        One Punch Man Season 3 is Finally Coming on October 2025!
      </h2>
      <div className="md:w-full mx-auto cursor-pointer rounded-[4px] overflow-hidden">
        <iframe
          className="w-full aspect-video"
          src="https://www.youtube.com/embed/oh7bd-CDY6U?si=lGo3WGLWO6q5mMTA/cc_load_policy=1"
          title="One Punch Man Season 3 Trailer"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
