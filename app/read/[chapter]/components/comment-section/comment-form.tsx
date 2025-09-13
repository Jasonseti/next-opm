"use client";
import clsx from "clsx";
import { insertComment } from "../../../../lib/comments";

export default function CommentForm({ chapter }: { chapter: string }) {
  return (
    <form
      action={insertComment.bind(null, chapter)}
      className="w-full lg:w-[80%] mx-auto mt-[0.5em] flex flex-auto"
    >
      <div className="w-[max(20%,125px)] flex-none mr-[1em] flex flex-col justify-around">
        <div>
          <label className="ml-[0.5em] text-gray-200" htmlFor="username">
            Username
          </label>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            name="username"
            type="text"
            className="text-gray-200 bg-gray-800 w-full px-[0.5em] py-[0.2em] rounded-[5px] outline-[1px] focus:outline-[1.5px] outline-gray-400"
            placeholder="(Anonymous)"
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        {/* <div className="g-recaptcha" data-sitekey="your_site_key"></div> */}
        <div className="w-full mx-auto aspect-[4/1] border-1"></div>
      </div>

      <div className="w-full h-full relative">
        <textarea
          className={clsx(
            "w-full h-full rounded-[8px] resize-none",
            "text-gray-200 py-[0.7em] px-[1em]",
            "bg-gray-800 outline-[1px] focus:outline-[1.5px] outline-gray-400"
          )}
          name="comment"
        />
        <input
          type="submit"
          value="Post"
          className={clsx(
            "absolute bottom-[0.5em] right-[0.5em] cursor-pointer select-none",
            "bg-[var(--primary-yellow)] hover:bg-[var(--primary-yellow)]/80 rounded-[5px]",
            "px-[1em] py-[0.1em] text-[1.1em] text-black font-semibold"
          )}
        />
      </div>
    </form>
  );
}
