import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import ResponsiveBackground from "./bg-image";
import { title_font } from "../../../fonts";

export default function HeroSection() {
  return (
    <section
      className={clsx(
        "text-black shadow-[0px_12px_12px_8px_rgba(0,_0,_0,_0.4)]",
        "w-[100vw] h-[45vw] md:h-[40vw] lg:h-[65vw] xl:h-[65vh] flex relative",
        "border-b-[0.5vw] lg:border-b-[0.25vw] border-gray-700"
      )}
    >
      <ResponsiveBackground />

      <figure className="h-[95%] aspect-square absolute left-[12%] bottom-0 hidden xl:block">
        <Image
          fill
          src="/background/characters-sticker.png"
          alt="background sticker"
        ></Image>
      </figure>

      <div
        className={clsx(
          "m-auto relative right-[10%] lg:bottom-[20%] xl:-right-[20%] xl:bottom-0",
          "text-[2em]"
        )}
      >
        <div
          className={clsx(
            "mx-auto bg-white/85 rounded-[min(2vw,20px)] border-[min(0.8vw,8px)] border-gray-800",
            `px-[4vw] ${title_font.className} font-semibold`
          )}
        >
          <h1 className="text-center text-[1.5em] font-bold">
            One Punch Man [PDF]
          </h1>
          <p className="text-center">Read Chapters Online.</p>
          <p className="text-center">Download in PDF Format.</p>
        </div>

        <div className="w-[80%] mx-auto flex mt-[5%]">
          <BookmarkButton href={"#read"} bg_color="bg-white" />
          <BookmarkButton href={"#download"} bg_color="bg-white" />
        </div>
      </div>
    </section>
  );
}

function BookmarkButton({
  href,
  bg_color,
}: {
  href: string;
  bg_color: string;
}) {
  return (
    <Link href={href} className="w-[50%] flex">
      <button
        className={clsx(
          `w-[80%] mx-auto cursor-pointer ${bg_color}`,
          "border-[min(0.4vw,4px)] rounded-[1vw]",
          `${title_font.className} font-semibold`
        )}
      >
        {href[1].toUpperCase() + href.slice(2)}
      </button>
    </Link>
  );
}
