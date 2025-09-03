"use client";
import { insertSubsribe } from "../../../lib/data";

export default function SubscribeForm() {
  return (
    <>
      <p>Get updates on the latest chapters straight to your inbox.</p>
      <form action={insertSubsribe} className="my-[8px] flex">
        <div className="md:w-[70%] w-[100%]">
          <input
            className="w-[100%] h-[30px] leading-[100px] outline-white outline-[1.4px] focus:outline-[2px] px-[1em] rounded-[10px]"
            type="email"
            name="email"
            autoComplete="true"
            placeholder="Your Email..."
          />
        </div>
        <button className="cursor-pointer h-[30px] ml-[min(2vw,20px)] bg-red-500 md:px-[1.2em] md:w-auto w-[150px] rounded-[100px]">
          Get Updates
        </button>
      </form>
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
