"use client";
import clsx from "clsx";
import { useRef } from "react";
import { useContext } from "react";
import { StatesTypes, StatesContext } from "../../state-provider";
import { main_font, secondary_font } from "../../../../fonts";
import { setSettingsCookies } from "../../../../lib/cookies";

export default function Summary({
  brief_summary,
  long_summary,
}: {
  brief_summary: string;
  long_summary: string;
}) {
  const states: StatesTypes = useContext(StatesContext);
  const select_ref = useRef<HTMLSelectElement>(null);

  return (
    <div
      className={clsx(
        main_font.className,
        "w-[90%] mx-auto h-[50%] lg:h-[56%]"
      )}
    >
      <select
        ref={select_ref}
        defaultValue={states.summary_mode.state}
        onChange={() => {
          if (select_ref.current) {
            states.summary_mode.setState(select_ref.current?.value);
            setSettingsCookies("summary_mode", select_ref.current?.value);
          }
        }}
        name="summary_type"
        className="w-full select-none border-1 rounded-[3px]"
      >
        <option value="brief">Brief Summary</option>
        <option value="long">Long Summary</option>
      </select>
      <div className="h-[4%]" />
      <pre
        className={clsx(
          `${secondary_font.className} font-medium text-[0.9em] leading-[1.2em] text-wrap`,
          "border-1 h-[100%] rounded-[2px] bg-gray-300 pl-[5px] pr-[2px] py-[2px] overflow-auto custom-scrollbar"
        )}
      >
        {"\t" +
          (states.summary_mode.state === "brief"
            ? brief_summary
            : long_summary
          ).replace("\n", "\n\t")}
      </pre>
    </div>
  );
}
