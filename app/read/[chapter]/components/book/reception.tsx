/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useContext } from "react";
import { StatesTypes, StatesContext } from "../../state-provider";
import Image from "next/image";
import { main_font } from "../../../../fonts";

export default function Reception() {
  const router = useRouter();
  const states: StatesTypes = useContext(StatesContext);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  return (
    <div
      id="reception_page"
      className={clsx(
        "h-[90%] aspect-[2/3] flex flex-col m-auto border-b-[3px] border-red-400",
        `${main_font.className} font-semibold text-[1.5em]`
      )}
    >
      <div
        onClick={() =>
          router.push(
            "/read/chapter-" + states.chapter_list[states.chapter_index + 1]
          )
        }
        className={clsx(
          "relative w-full h-[50%] mx-auto flex flex-col py-[10%]",
          "cursor-pointer group"
        )}
      >
        <div
          className={clsx(
            "w-full h-full absolute top-0 bg-red-600/40",
            "mask-b-from-50% mask-b-to-100% rounded-[min(2vw,20px)]",
            "group-hover:bg-red-600/50 trasition duration-100"
          )}
        ></div>
        <button
          className={clsx(
            "w-[85%] flex-none mx-auto cursor-pointer z-10 rounded-[min(0.5vw,5px)]",
            "border-[3px] border-amber-400 text-amber-200"
          )}
        >{`Go to Chapter ${
          states.chapter_list[states.chapter_index + 1]
        }`}</button>
        <div className="h-[5%]" />
        <div className="relative flex-auto w-full mx-auto">
          <Image
            fill
            src={states.next_chapter_thumbnail}
            alt="next_chapter_thumbnail"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="text-[0.8em] mt-[10%]">
        <div className="w-[80%] mx-auto bg-gray-100 text-center rounded-[100px] mb-[0.5em]">
          Get notified for new chapters!
        </div>
        <button
          className={clsx(
            "w-[60%] flex-none mx-auto cursor-pointer",
            "bg-amber-400 rounded-[min(0.5vw,5px)]",
            "flex justify-center py-[0.2em]"
          )}
        >
          <img src="/icon/notification.svg" alt="comment_icon" />
          <p className="ml-[0.5em]">SUBSCRIBE</p>
        </button>
      </div>

      <div className="text-[0.8em] mt-[5%]">
        <div className="w-[75%] mx-auto bg-gray-100 text-center rounded-[100px] mb-[0.5em]">
          Share your thoughts?
        </div>
        <button
          onClick={() => {
            states.is_comment_open.setState(true);
            const params = new URLSearchParams(searchParams);
            params.set("comment", "open");
            replace(`${pathname}?${params.toString()}`, { scroll: false });
          }}
          className={clsx(
            "w-[60%] flex-none mx-auto cursor-pointer",
            "bg-amber-400 rounded-[min(0.5vw,5px)]",
            "flex justify-center py-[0.2em]"
          )}
        >
          <img src="/icon/comment.svg" alt="comment_icon" />
          <p className="ml-[0.5em]">COMMENTS</p>
        </button>
      </div>
    </div>
  );
}
