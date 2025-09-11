"use client";
import clsx from "clsx";
import { StatesTypes, StatesContext } from "../../state-provider";
import { useContext, useRef, useState } from "react";
import { insertFeedback } from "../../../../lib/feedback";
import { main_font } from "../../../../fonts";

export default function Feedback() {
  const states: StatesTypes = useContext(StatesContext);
  const textarea_ref = useRef<HTMLTextAreaElement>(null);
  const [is_required, setRequired] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        `${main_font.className} "text-[4vw] sm:text-[min(2.5vw,25px)] lg:text-[min(2.2vw,22px)]`,
        "absolute top-0 w-[100vw] h-[100vh] z-20",
        "transition duration-200 flex",
        states.is_feedback_open.state
          ? "bg-black/40"
          : "bg-black/0 pointer-events-none select-none"
      )}
    >
      <main
        className={clsx(
          "relative m-auto bg-gray-200 flex flex-col",
          "w-[80vw] max-w-[520px] lg:max-w-[600px] aspect-[2/1]",
          "rounded-[min(1vw,10px)] px-[min(4vw,40px)] py-[min(2vw,20px)]",
          states.is_feedback_open.state ? "scale-[100%]" : "scale-0",
          "transition duration-200"
        )}
      >
        <button
          onClick={() => {
            states.is_feedback_open.setState(false);
            setRequired(false);
          }}
          className="cursor-pointer absolute top-[5%] right-[2.5%] rounded-[min(0.5vw,5px)] bg-gray-800"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-[min(4vw,40px)] aspect-square"
            src="/icon/close.svg"
            alt="comment_button"
          />
        </button>

        <h3 className="ml-[0.5em] font-semibold">Give us your Feedback!</h3>
        <hr className="border-[1.5px] rounded-[10px] w-[95%]" />
        <textarea
          ref={textarea_ref}
          className={clsx(
            "overflow-y-auto no-scrollbar bg-gray-100 resize-none",
            "px-[0.5em] py-[0.5em] w-full flex-auto mt-[10px]",
            "outline-[1px] focus:outline-[1.5px] rounded-[5px]",
            is_required
              ? "outline-[2px] focus:outline-[2px] outline-red-500"
              : "outline-[1px] focus:outline-[1.5px] outline-black"
          )}
          placeholder="errors, typos, tips, opinions to further promote the webiste."
        />
        <div className="flex-none flex justify-between">
          <span>
            <big className="mr-[0.4em]">&#9755;</big>
            <span className="text-wrap">Your input is anonymous</span>
          </span>
          <button
            className="mt-[10px] px-[min(3vw,30px)] rounded-[100px] cursor-pointer bg-[var(--primary-yellow)]"
            onClick={() => {
              if (textarea_ref.current?.value) {
                insertFeedback(states.chapter, textarea_ref.current.value);
                states.is_feedback_open.setState(false);
                states.messages.setState([
                  ...states.messages.state,
                  "Your Feedback has been Sent! Thank You ❤️",
                ]);
                setRequired(false);
              } else setRequired(true);
            }}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
