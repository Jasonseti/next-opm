import clsx from "clsx";
import { header_font, main_font } from "../fonts";
import { text_description, brief_description } from "../variables";
import ScrollWrapper from "./ui/scroll_wrapper";

function Introduction() {
  return (
    <div
      className={clsx(
        "m-auto w-[min(75%,700px)] font-medium",
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
          className={`${main_font.className} text-m leading-[1.55em] hidden md:block`}
        >
          {text}
        </pre>
      ))}
      {brief_description.map((text, i) => (
        <pre
          key={i}
          className={`${main_font.className} leading-[1.55em] text-m md:hidden`}
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
    <form className="w-[75%] m-auto flex flex-col">
      <input
        className={clsx(
          "m-auto lg:ml-0 border-[1.5px] focus:border-[1.8px] rounded-[10px] w-full lg:w-[min(60%,450px)] h-[40px] pl-[3.5em] pr-[1em]",
          "lg:focus:w-[min(60%,800px)] transition-all duration-500 ease",
          `${main_font.className} text-m font-medium relative leading-[100px]`
        )}
        spellCheck="false"
        type="text"
        placeholder="Search by number, title, or description . . ."
      />
      <svg
        className="w-[1.4em] h-[1.4em] text-gray-500 dark:text-gray-400 absolute ml-[1em] mt-[8px]"
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

function ChapterRoll() {
  return (
    <>
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="w-[min(22.5vw,225px)] h-[min(36vw,360px)] flex-none border-1 mx-[4px] cursor-pointer"
          ></div>
        ))}
    </>
  );
}

function ReadSection() {
  return (
    <section id="read" className="w-[min(100vw,1400px)] m-auto">
      <div className="w-full pt-[min(4vw,40px)] pb-[min(6vw,50px)] m-auto">
        <Introduction />
        <div className="mt-[20px] flex flex-col">
          <SearchBar />
          <ScrollWrapper>
            <ChapterRoll />
          </ScrollWrapper>
        </div>
      </div>
    </section>
  );
}

export default ReadSection;
