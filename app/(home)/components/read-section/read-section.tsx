/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import SearchInput from "./search-input";
import ScrollWrapper from "./scroll-wrapper";
import { ChaptersList, fetchChaptersList } from "../../../lib/chapters";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { header_font, main_font } from "../../../fonts";

export default function ReadSection({
  query,
  bookmark_list,
}: {
  query: string;
  bookmark_list: string[];
}) {
  return (
    <section
      id="read"
      className={clsx(
        "w-[min(90vw,1400px)] m-auto py-[min(4vw,40px)]",
        "text-[1.5em]"
      )}
    >
      <Introduction />
      <SearchBar />
      <div className="h-[1vw]"></div>

      <ScrollWrapper>
        <Suspense fallback={<ChapterListSkeleton />}>
          <ChapterList query={query} bookmark_list={bookmark_list} />
        </Suspense>
      </ScrollWrapper>
    </section>
  );
}

function Introduction() {
  const long_description = [
    "\t\tOne-Punch Man (ワンパンマン Wanpanman) is a Japanese webcomic, manga, and anime series created by ONE. After garnering more than 7.9 million total and 20,000 daily views by June 2012, Sheuisha picked up the series and commissioned Yusuke Murata (known for Eyeshield 21) to illustrate the series.",
    "\t\t It follows Saitama, an extremely overpowered character that end most fights with only one punch. He faces a self-imposed existential crisis, as he is now too powerful to gain any thrill from battle. He sets out to find more powerful opponents, while making allies with other heroes.",
  ];
  const brief_description = [
    "\t\tOne-Punch Man (ワンパンマン Wanpanman) is a Japanese webcomic, manga, and anime series created by ONE, and illustrated by Yusuke Murata. It follows Saitama, an overpowered character that end most fights with only one punch.",
  ];

  return (
    <div className="m-auto max-w-[900px] font-medium">
      <h2
        className={`${header_font.className} text-[6vw] md:text-[min(5vw,50px)] text-center font-semibold`}
      >
        Read Chapters Online
      </h2>
      {long_description.map((text, i) => (
        <pre
          key={i}
          className={clsx(
            `${main_font.className} text-wrap py-[0.5vw]`,
            "hidden sm:block"
          )}
        >
          {text}
        </pre>
      ))}
      {brief_description.map((text, i) => (
        <pre
          key={i}
          className={clsx(
            `${main_font.className} text-wrap py-[0.5vw]`,
            "sm:hidden"
          )}
        >
          {text}
        </pre>
      ))}
      <pre className={`${main_font.className} text-center`}>
        {"Note:  All chapters are originally sourced from "}
        <Link
          className="text-blue-800 underline"
          target="_blank"
          href="https://cubari.moe/read/gist/OPM/"
        >
          here
        </Link>
        .
      </pre>
    </div>
  );
}

function SearchBar() {
  return (
    <div
      className={clsx(
        "w-[90%] max-w-[800px] h-[2.2em] m-auto my-[min(2vw,20px)] relative",
        "xl:focus-within:max-w-[1000px] transition-all duration-500"
      )}
    >
      <svg
        className="h-full aspect-square absolute left-[0.75em] scale-[60%]"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="#888888"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <SearchInput />
    </div>
  );
}

async function ChapterList({
  query,
  bookmark_list,
}: {
  query: string;
  bookmark_list: string[];
}) {
  const chapters = await fetchChaptersList(query);
  if (chapters.length === 0) return <NoChapterList />;
  if (!query) chapters.reverse();
  const calcSize = (str: string) =>
    str.length > 15 ? 1.0 - str.length * 0.004 : 1.0;

  return (
    <>
      {chapters.map((chapter: ChaptersList, i: number) => (
        <div
          key={i}
          className={clsx(
            "w-[25vw] md:w-[min(20vw,200px)]",
            "aspect-[2/3] group flex-none cursor-pointer relative",
            "mx-[min(0.5vw,5px)] first-of-type:ml-0 last-of-type:mr-0",
            "border-[1.5px] border-gray-600 rounded-[5px] overflow-hidden",
            "text-[3vw] md:text-[min(2.2vw,22px)]"
          )}
        >
          <Link href={`/read/chapter-${chapter["chapter"]}`}>
            <div
              className={clsx(
                "w-full h-full absolute z-10 bg-black/25 flex",
                "opacity-0 group-hover:opacity-100 transition-all duration-300"
              )}
            >
              <div
                className={clsx(
                  "m-auto bg-[var(--primary-yellow)] px-[1.25em] border-2 rounded-[100px]",
                  `${main_font.className} text-center text-black font-semibold`
                )}
              >
                <p>Read</p>
              </div>
            </div>
          </Link>

          <div className="w-full h-full relative group-hover:scale-[108%] transition duration-300">
            <Image
              fill
              src={chapter["thumbnail"]}
              alt="chapter_thumbnail"
              style={{ objectFit: "cover" }}
            ></Image>
          </div>

          <div
            className={clsx(
              bookmark_list.includes(chapter.chapter) ? "block" : "hidden",
              "h-[20%] w-[20%] absolute inset-[4%]",
              "bg-white rounded-[10%]"
            )}
          >
            <Image
              fill
              src="/icon/bookmark_filled.svg"
              alt="bookmark_icon"
              className="scale-x-80 scale-y-110"
            ></Image>
          </div>

          <div
            className={clsx(
              "w-full px-[1vw] absolute h-[50%] top-[50%]",
              "flex flex-col-reverse pb-[1vw]",
              `${main_font.className} font-semibold text-black`,
              "bg-gradient-to-b from-0% to-60% from-[rgba(0, 0, 0, 0)] to-white"
            )}
          >
            <div>
              <p className="text-[0.8em] text-nowrap">{`Chapter ${chapter["chapter"]}`}</p>{" "}
              <p
                style={{ fontSize: `${calcSize(chapter["title"])}em` }}
                className="leading-[1em]"
              >
                {chapter["title"]}
              </p>
            </div>
            <div className="flex">
              <div className="flex px-[5%] rounded-[5px] bg-white">
                <img
                  className="h-[calc-size(size,auto)] aspect-square"
                  src="/icon/heart_filled.svg"
                  alt="favorite_icon"
                />
                <span className="ml-[0.2em] text-[1em]">
                  {chapter.favorite}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function ChapterListSkeleton() {
  return Array.from(Array(10)).map((_, i: number) => (
    <div
      key={i}
      className={clsx(
        "w-[30vw] sm:w-[25vw] md:w-[min(20vw,200px)] aspect-[2/3]",
        "mx-[min(0.5vw,5px)] first-of-type:ml-0 last-of-type:mr-0",
        "border-[1.5px] border-gray-600 rounded-[5px] overflow-hidden",
        "bg-gray-400 animate-pulse"
      )}
    ></div>
  ));
}

function NoChapterList() {
  return (
    <div className="flex w-[min(90vw,1400px)] h-[calc(min(20vw,200px)*1.5)] border-[1.5px] rounded-[min(2vw,20px)]">
      <p className="m-auto font-semibold text-[1.5em] italic">
        No Results Found . . .
      </p>
    </div>
  );
}
