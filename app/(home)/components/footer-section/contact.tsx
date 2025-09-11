"use client";
import clsx from "clsx";
import { insertFeedback } from "../../../lib/feedback";
import { useRef } from "react";

export default function ContactForm() {
  const textarea_ref = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <textarea
        ref={textarea_ref}
        className={clsx(
          "w-full flex-auto min-h-[75px] resize-none px-[min(1.5vw,15px)] py-[min(1vw,10px)]",
          "outline-[1px] focus:outline-[2px] outline-white rounded-[min(1vw,10px)]",
          "no-scrollbar"
        )}
        placeholder="Give us yout inputs to further promote the website."
      />
      <div className="ml-[0.5em] flex mb-[0.5em]">
        <big className="text-[1.35em] mr-[0.5em]">&#9755;</big>
        <p className="leading-[1.35em] content-center">
          Your input is anonymous
        </p>
      </div>
      <button
        className={clsx(
          "cursor-pointer w-[7em] mx-auto bg-[var(--primary-red)]",
          "rounded-[100px] py-[0.2em]"
        )}
        onClick={() => {
          if (textarea_ref.current?.value) {
            insertFeedback("home", textarea_ref.current.value);
            textarea_ref.current.value = "";
          }
        }}
      >
        Submit
      </button>
    </>
  );
}
