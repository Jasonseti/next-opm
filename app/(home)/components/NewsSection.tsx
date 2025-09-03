import { quote_font } from "../../fonts";
import Image from "next/image";

function Headline() {
  return (
    <div className="w-[100%] md:w-[65%] md:pb-0 pb-[2vw] m-auto md:m-0">
      <h2
        className={`${quote_font.className} px-[2.5%] md:px-0 text-center text-l -mt-[10px] mb-[10px] font-bold`}
      >
        One Punch Man Season 3 is Finally Coming on October 2025!
      </h2>
      <div className="md:w-full w-[90%] mx-auto cursor-pointer relative rounded-[7px] overflow-hidden">
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

function NewsSection() {
  return (
    <section className="w-full">
      <div className="w-[min(90%,1000px)] bg-[var(--red-bg)] text-white py-[min(4vw,40px)] md:px-[min(6vw,60px)] px-[min(2vw,20px)] rounded-b-[10px] m-auto md:flex justify-between">
        <Headline />
        <div className="relative md:block hidden w-[30%] rounded-[0.25vw] overflow-hidden">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src="/common_image/google_ads.webp"
            alt="google_ads"
          />
        </div>
      </div>
    </section>
  );
}

export default NewsSection;
