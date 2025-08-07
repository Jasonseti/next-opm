"use client";
import { secondary_font, main_font } from "../../fonts";
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
    <div className={`${main_font.className} text-m`}>
      {Object.entries(faqs).map(([Q, A], i) => (
        <div key={i} className="">
          <div
            onClick={() => handleClick(i)}
            className={clsx(
              "bg-red-200 rounded-t-[4px] font-semibold p-[5px] cursor-pointer",
              is_open[i]
                ? "rounded-b-[0px]"
                : "rounded-b-[4px] transition-all duration-400 ease delay-400"
            )}
          >
            {Q}
          </div>
          <div
            className={clsx(
              `${secondary_font.className}`,
              is_open[i] ? "h-[calc-size(auto,size)]" : "h-0 ",
              "transition-height bg-gray-100 rounded-b-[10px] origin-top duration-500 ease-in-out overflow-hidden px-[8px] mb-[10px]"
            )}
          >
            <p className="p-[4px] pb-[8px]">{A}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
