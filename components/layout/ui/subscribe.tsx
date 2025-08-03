"use client";
export default function SubscribeForm() {
  return (
    <>
      <p>Get updates on the latest chapters straight to your inbox.</p>
      <form className="my-[8px]">
        <input
          className="w-[60%] h-[30px] leading-[100px] outline-white outline-[1.4px] focus:outline-[2px] px-[1em] rounded-[10px]"
          type="text"
          placeholder="Your Email..."
        />
        <button
          className="cursor-pointer h-[25px] leading-[25px] ml-[min(2vw,20px)] bg-red-500 px-[1.2em] rounded-[8px]"
          onClick={(e) => e.preventDefault()}
        >
          Get Updates
        </button>
      </form>
      <p>
        <big className="text-[1.35em] mr-[0.4em]">&#9755;</big>We only use your
        personal data for notice, as outlined in our Privacy Policy.
      </p>
    </>
  );
}
