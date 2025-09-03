/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { header_font, main_font } from "../../fonts";
import { text_description, brief_description } from "../../variables";
import SearchInput from "./ui/search_input";
import ScrollWrapper from "./ui/scroll_wrapper";
import { Chapter, fetchChapters } from "../../lib/data";
import { Suspense } from "react";
import ThemeSwitch from "./ui/theme_switch";
import Image from "next/image";
import Link from "next/link";

function Introduction() {
  return (
    <div
      className={clsx(
        "m-auto w-[min(90%,900px)] font-medium",
        "[&_pre]:text-wrap [&_pre]:py-[4px]",
        `${header_font.className}`
      )}
    >
      <h2 className="text-xl text-center mb-[5px] font-semibold">
        Read Chapters Online
      </h2>
      {text_description.map((text, i) => (
        <pre
          key={i}
          className={`${main_font.className} text-m leading-[1.55em] hidden sm:block`}
        >
          {text}
        </pre>
      ))}
      {brief_description.map((text, i) => (
        <pre
          key={i}
          className={`${main_font.className} leading-[1.45em] sm:leading-[1.55em] text-m sm:hidden`}
        >
          {text}
        </pre>
      ))}
      <pre className={`${main_font.className} text-m text-center`}>
        <span className="md:hidden">
          {"Note:  All chapters are originally sourced from "}
        </span>
        <span className="md:inline hidden">
          {
            "Note:  All chapters are sourced from and available to read for free "
          }
        </span>
        <a
          className="text-blue-900 underline"
          target="_blank"
          href="https://cubari.moe/read/gist/OPM/"
        >
          here
        </a>
        .
      </pre>
    </div>
  );
}

function SearchBar() {
  return (
    <form
      className={clsx(
        "w-[min(80%,800px)] m-auto flex flex-col",
        "focus-within:w-[min(80%,1000px)] transition-all duration-500 ease"
      )}
    >
      <SearchInput />
      <svg
        className="w-[1.2em] sm:w-[1.3em] md:w-[1.4em] lg:w-[1.5em] xl:w-[1.6em] aspect-square text-gray-500 dark:text-gray-400 absolute ml-[1em] mt-[8px]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </form>
  );
}

async function ChapterList({
  query,
  bookmark_list,
}: {
  query: string;
  bookmark_list: boolean[];
}) {
  const chapters = await fetchChapters(query);
  const calcSize = (str: string) =>
    str.length > 15 ? 1.0 - str.length * 0.004 : 1.0;
  return (
    <>
      {chapters.map((chapter_data: Chapter, i: number) => (
        <div
          key={chapter_data["title"]}
          className="group relative w-[max(min(30vw,300px),30px)] sm:w-[max(min(22.8vw,228px),28.8px)] lg:w-[max(min(20vw,200px),20px)] aspect-[860/1263] flex-none border-[1.5px] border-gray-500 rounded-[5px] overflow-hidden mx-[4px] cursor-pointer"
        >
          <Link href={`/read/chapter-${chapter_data["chapter"]}`}>
            <div
              className={clsx(
                "absolute z-10 w-full h-full bg-black",
                "opacity-0 group-hover:opacity-25 transition-all duration-300 ease"
              )}
            ></div>
            <div
              className={clsx(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/1 z-20",
                `${header_font.className} m-auto text-center text-[var(--color)] text-[max(min(2.6vw,1.4em),1.1em)] font-semibold`,
                "px-[max(min(3vw,30px),18px)] bg-orange-300 rounded-[100px] border-[2px] border-[var(--color)]",
                "opacity-0 group-hover:opacity-100 transition-all duration-300 ease"
              )}
            >
              <p>Read</p>
            </div>
            <div className="w-full h-full relative group-hover:scale-[108%] transition-all duration-300 ease">
              <Image
                fill
                src={chapter_data["images"][0]}
                alt="chapter thumbnail"
                style={{ objectFit: "cover" }}
              ></Image>
            </div>

            <img
              className={clsx(
                bookmark_list[i] ? "block" : "hidden",
                "rounded-[0.6vw] px-[0.6vw] bg-white h-[20%] absolute top-[4%] right-[4%] aspect-square scale-x-80"
              )}
              src="/icon/bookmark_filled.svg"
              alt="favorite_icon"
            />

            <div
              className={clsx(
                "z-20 px-[10px] w-full absolute h-[45%] top-[55%] sm:h-[45%] sm:top-[55%] md:h-[40%] md:top-[60%]",
                "bg-gradient-to-b from-0% to-60% from-[rgba(0, 0, 0, 0)] to-white",
                "group-hover:to-[rgb(245,245,245)] transition duration-300 ease text-[var(--color)]"
              )}
            >
              <div className="absolute top-[55%] right-[10%] -mt-[1.5em] flex">
                <img
                  className="h-[calc-size(auto,size)] aspect-square"
                  src="/icon/heart_filled.svg"
                  alt="favorite_icon"
                />
                <p className="ml-[5%] text-m font-semibold">
                  {chapter_data.favorite}
                </p>
              </div>
              <div
                className={`${main_font.className} mt-[30%] text-m font-semibold`}
              >
                <p className="text-[0.8em]">{`Chapter ${chapter_data["chapter"]}`}</p>{" "}
                <p
                  style={{ fontSize: `${calcSize(chapter_data["title"])}em` }}
                  className="leading-[1em]"
                >
                  {chapter_data["title"]}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}

function ChapterListSkeleton() {
  return (
    <div className="mt-[20px] w-[90%] h-[max(min(35vw,350px),35px)] rounded-[8px] relative overflow-hidden bg-gray-400 animate-pulse m-auto"></div>
  );
}

function ReadSection({
  query,
  bookmark_list,
}: {
  query: string;
  bookmark_list: boolean[];
}) {
  return (
    <section id="read" className="w-[min(100vw,1400px)] m-auto">
      <div className="relative w-full pb-[min(6vw,50px)] m-auto">
        <ThemeSwitch />

        <Introduction />

        <div className="mt-[20px] flex flex-col">
          <SearchBar />
          <Suspense fallback={<ChapterListSkeleton />}>
            <ScrollWrapper>
              <ChapterList query={query} bookmark_list={bookmark_list} />
            </ScrollWrapper>
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default ReadSection;
