"use client";
import clsx from "clsx";
import { ContextType, SettingsContext } from "../../state_provider";
import { useContext, useRef } from "react";
import { main_font } from "../../../../../fonts";
import { insertFeedback } from "../../../../../lib/data";

export default function Feedback({ chapter }: { chapter: string }) {
  const settings: ContextType = useContext(SettingsContext);
  const textarea_ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      className={clsx(
        `${main_font.className} text-m`,
        "absolute top-0 w-[100vw] h-[100vh] z-50",
        "transition duration-200",
        settings.is_report_open.state
          ? "flex bg-black/40"
          : "flex bg-black/0 pointer-events-none select-none"
      )}
    >
      <div
        className={clsx(
          "relative m-auto w-[80%] max-w-[500px] lg:max-w-[600px] aspect-[3/2] sm:aspect-[2/1] px-[calc(max(min(80%,500px),400px)*0.07)] py-[calc(max(min(80%,500px),400px)*0.05)] bg-gray-200 rounded-[10px] flex flex-col",
          settings.is_report_open.state ? "scale-[100%]" : "scale-0",
          "transition duration-200"
        )}
      >
        <button
          onClick={() => settings.is_report_open.setState(false)}
          className="cursor-pointer absolute top-[5%] right-[2.5%] rounded-[6px] bg-gray-800"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-[max(min(5vw,40px),28px)] aspect-square"
            src="/icon/close.svg"
            alt="comment_button"
          />
        </button>

        <h3 className="text-[1.2em] ml-[0.5em] font-semibold">
          Give us your Feedback!
        </h3>
        <hr className="border-[1.5px] rounded-[10px] w-[90%]" />
        <textarea
          ref={textarea_ref}
          className="overflow-y-auto no-scrollbar px-[0.5em] py-[0.5em] bg-gray-100 w-full flex-auto mt-[10px] outline-[1px] focus:outline-[1.5px] outline-black rounded-[5px] resize-none"
          placeholder="errors, typos, tips, opinions to further promote the webiste."
        ></textarea>
        <div className="flex-none flex justify-between">
          <p className="">
            <big className="text-[1.35em] mr-[0.4em]">&#9755;</big>
            <span className="text-wrap">Your input is anonymous</span>
          </p>
          <div className="flex flex-col-reverse">
            <button
              className={clsx(
                "px-[min(3vw,25px)] rounded-[100px] cursor-pointer bg-amber-500"
              )}
              onClick={(e) => {
                e.preventDefault();
                if (textarea_ref.current)
                  insertFeedback(chapter, textarea_ref.current.value);
                settings.is_report_open.setState(false);
                settings.messages.setState([
                  ...settings.messages.state,
                  "Your Feedback has been Sent! Thank You ❤️",
                ]);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
