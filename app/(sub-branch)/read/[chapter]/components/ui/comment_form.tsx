"use client";
import clsx from "clsx";
import { insertComment } from "../../../../../lib/data";
import { setIDCookies } from "../../../../../lib/set_cookie";

export default function CommentForm({ chapter }: { chapter: string }) {
  return (
    <form
      action={insertComment.bind(null, chapter)}
      className="w-[95%] mx-auto mt-[10px] flex flex-auto"
    >
      <div className="w-[max(20%,150px)] text-m flex-none mr-[2vw] flex flex-col justify-around">
        <div className="flex-none">
          <label className="ml-[0.5em] text-gray-200" htmlFor="username">
            Username
          </label>
          <input
            name="username"
            type="text"
            className="text-gray-200 bg-gray-800 w-full px-[0.5em] py-[2px] rounded-[5px] outline-[1px] focus:outline-[1.5px] outline-gray-400"
            placeholder="(Anonymous)"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        {/* <div className="g-recaptcha" data-sitekey="your_site_key"></div> */}
        <div className="w-full mx-auto aspect-[4/1]"></div>
      </div>
      <div className="relative w-[100%] text-m lg:w-[min(100%,700px)] h-full">
        <textarea
          className="text-gray-200 py-[10px] px-[16px] bg-gray-800 w-[100%] h-[100%] rounded-[8px] resize-none outline-[1px] focus:outline-[1.5px] outline-gray-400"
          name="comment"
        />
        <input
          type="submit"
          value="Post"
          // onClick={async () => {
          //   if (!textarea_ref.current?.value) return;
          //   if (username_ref.current && textarea_ref.current) {
          //     await insertComments(chapter, {
          //       username: username_ref.current.value || "(Anonymous)",
          //       text: textarea_ref.current.value,
          //     });
          //     username_ref.current.value = "";
          //     textarea_ref.current.value = "";
          //   }
          // }}
          className={clsx(
            "absolute bottom-[5px] right-[5px] bg-amber-500 hover:bg-amber-500/80 rounded-[5px] cursor-pointer select-none",
            "text-[min(1em,25px)] font-semibold px-[2em] py-[0.2em]"
            // "hover:outline-black outline-[1.5px] outline-black/0 transition-all duration-200"
          )}
        />
      </div>
    </form>
  );
}
