"use client";
import { main_font } from "../../fonts";
import { faqs } from "../../variables";
import clsx from "clsx";
import { useState } from "react";

export default function Accordion() {
  const initial_state = Array(Object.keys(faqs).length).fill(false);
  const [is_open, setOpen] = useState<boolean[]>(
    initial_state.toSpliced(Object.keys(faqs).length - 1, 1, true)
  );
  const handleClick = (i: number) =>
    setOpen(initial_state.toSpliced(i, 1, !is_open[i]));

  return (
    <div className={`${main_font.className} text-[min(2.7vw,0.95em)]`}>
      {Object.entries(faqs).map(([Q, A], i) => (
        <div key={i}>
          <div
            onClick={() => handleClick(i)}
            className="font-semibold p-[5px] pb-0 border-1 cursor-pointer"
          >
            {Q}
          </div>
          <div
            className={clsx(
              is_open[i] ? "h-[calc-size(auto,size)]" : "h-0 ",
              "transition-height origin-top duration-500 ease-in-out overflow-hidden mb-[10px]"
            )}
          >
            {A}
          </div>
        </div>
      ))}
    </div>
  );
}
