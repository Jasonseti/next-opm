import clsx from "clsx";
import { title_font } from "../../fonts";
import Image from "next/image";
import Link from "next/link";
import ResponsiveBackground from "./ui/responsive_bg";

function BookmarkButton({
  text,
  href,
  color,
}: {
  text: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href} className="text-l">
      <button
        className={clsx(
          color,
          "shadow-[3px_6px_6px_0px_rgba(0,_0,_0,_0.5)]",
          "w-[max(min(20vw,200px),120px)] h-[max(min(5.2vw,50px),35px)]",
          "border-[max(min(0.35vw,4px),2px)] border-gray-900 rounded-br-[8px] rounded-tl-[8px] rounded-bl-[4px] rounded-tr-[4px]",
          `${title_font.className} font-semibold text-[0.95em] text-black cursor-pointer`
        )}
      >
        {text}
      </button>
    </Link>
  );
}

function KingSticker() {
  return (
    <div
      className={clsx(
        "hidden 2xl:block",
        "absolute h-[100%] aspect-square left-[0%]"
      )}
    >
      <Image
        fill
        src="/sticker/king_sticker.png"
        alt="background sticker"
        style={{ objectFit: "cover" }}
        className=" border-black"
      ></Image>
    </div>
  );
}

function MainTitle() {
  return (
    <div
      className={clsx(
        "shadow-[5px_10px_8px_0px_rgba(0,_0,_0,_0.5)]",
        "flex flex-col mx-auto bg-white/85 text-black rounded-[min(2vw,20px)] border-[min(0.8vw,10px)] border-[#292929] px-[max(min(2.5vw,30px),10px)] sm:py-[max(min(1vw,10px),5px)]",
        `${title_font.className} font-semibold`
      )}
    >
      <h1 className="m-auto text-xxl font-bold text-nowrap">
        One Punch Man [PDF]
      </h1>
      <div
        className={clsx(
          " -mt-[min(1.2vw,8px)]",
          "[&_p]:text-[max(min(2.6vw,1.8em),1.1em)] [&_p]:px-[0.2em]"
        )}
      >
        <p className="text-center">Read Chapters Online.</p>
        <p className="text-center">Download in PDF Format.</p>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className={clsx(
        "shadow-[0px_12px_12px_8px_rgba(0,_0,_0,_0.4)]",
        "w-full h-[max(min(40vw,380px),200px)] lg:h-[95vh] 2xl:h-[80vh] flex",
        "box-content border-b-[max(min(0.4vw,5px),3px)] border-gray-700 relative"
      )}
    >
      <ResponsiveBackground />

      <div className="w-[min(100vw,1200px)] h-full m-auto relative">
        <KingSticker />

        <div className="h-full w-[60%] relative lg:left-[15%] right-[15%] m-auto flex">
          <div className="mx-auto flex flex-col justify-center">
            <MainTitle />

            <div className="w-[80%] mx-auto pt-[min(2vw,20px)] flex flex-row justify-center [&_button]:mx-[max(2vw,18px)] px-[8px] lg:px-0">
              <BookmarkButton
                text={"Read"}
                color={"bg-gray-200"}
                href={"#read"}
              />
              <BookmarkButton
                text={"Download"}
                color={"bg-red-400"}
                href={"#download"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
