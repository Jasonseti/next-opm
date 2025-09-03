"use client";
import { insertFeedback } from "../../../lib/data";
import { useRef } from "react";

export default function ContactForm() {
  const textarea_ref = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <textarea
        ref={textarea_ref}
        className="w-[min(100%,500px)] md:w-[min(30vw,350px)] h-[100px] resize-none py-[10px] px-[13px] outline-[1.2px] focus:outline-[2.5px] outline-white rounded-[16px]"
        placeholder="Give us your opinion/critique to further promote the webiste."
      />
      <div className="w-[min(100%,500px)] flex justify-between lg:flex-row md:flex-col md:justify-between pl-[5px] lg:mt-0 md:-mt-[6px]">
        <p className="my-auto md:pb-[5px] lg:pb-0 mr-[20px]">
          <big className="text-[1.35em] mr-[0.4em]">&#9755;</big>
          <span className="sm:inline-block hidden">
            Your input will be anonymous
          </span>
          <span className="sm:hidden">Your input is anonymous</span>
        </p>
        <button
          className="md:m-auto lg:float-none cursor-pointer bg-red-500 md:w-auto lg:m-0 md:h-auto h-[30px] w-[120px] md:px-[2.5em] lg:px-[2em] lg:py-[0.15em] md:py-[0.3em] rounded-[100px]"
          onClick={() => {
            if (textarea_ref.current) {
              insertFeedback("home", textarea_ref.current.value);
              textarea_ref.current.value = "";
            }
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
}
