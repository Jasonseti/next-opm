"use client";

export default function ContactForm() {
  return (
    <form>
      <textarea
        className="w-[min(30vw,300px)] h-[100px] resize-none py-[10px] px-[13px] outline-[1.2px] focus:outline-[2.5px] outline-white rounded-[16px]"
        name=""
        id="text"
        placeholder="Give us your opinion/critique to further promote the webiste."
      ></textarea>
      <div className="flex justify-between px-[5px] mt-[3px]">
        <p className="my-auto">
          <big className="text-[1.35em] mr-[0.4em]">&#9755;</big>Your input will
          be anonymous
        </p>
        <button
          className="cursor-pointer bg-red-500 px-[1.2em] py-[0.2em] rounded-[100px]"
          onClick={(e) => e.preventDefault()}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
