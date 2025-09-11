"use client";
import clsx from "clsx";
import { useRef } from "react";
import { insertSubsribe } from "../../../lib/feedback";

export default function SubscribeForm() {
  const input_ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <p>Get updates on the latest chapters straight to your inbox.</p>
      <div className="my-[8px] flex">
        <input
          ref={input_ref}
          className={clsx(
            "w-[80%] h-[30px] px-[1em] rounded-[10px]",
            "outline-white outline-[1px] focus:outline-[2px]"
          )}
          name="email"
          autoComplete="true"
          placeholder="Your Email..."
        />
        <button
          onClick={() => {
            if (input_ref.current?.value) {
              insertSubsribe(input_ref.current.value);
              input_ref.current.value = "";
            }
          }}
          className={clsx(
            "cursor-pointer w-[8em] mx-auto bg-[var(--primary-red)]",
            "rounded-[100px] ml-[1em]"
          )}
        >
          Get Updates
        </button>
      </div>
      <p className="px-[5px]">
        <big className="text-[1.35em] mr-[0.4em]">&#9755;</big>Your personal
        data will only be used for notify purposes, as stated in our{" "}
        <a href="" className="underline">
          Privacy Policy
        </a>
      </p>
    </>
  );
}
