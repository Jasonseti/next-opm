"use client";
import clsx from "clsx";
import { useRef } from "react";
import { useContext } from "react";
import { ContextType, SettingsContext } from "../../state_provider";
import { main_font, secondary_font } from "../../../../../fonts";
import { setSettingsCookies } from "../../../../../lib/set_cookie";

export default function Summary({
  brief_summary,
  long_summary,
}: {
  brief_summary: string;
  long_summary: string;
}) {
  const settings: ContextType = useContext(SettingsContext);
  const select_ref = useRef<HTMLSelectElement>(null);

  return (
    <div
      className={clsx(
        main_font.className,
        "w-[90%] h-[95%] sm:h-[60%] lg:h-[62%] mx-auto mt-[5px] flex flex-col"
      )}
    >
      <div className="mb-[5px] border-1 rounded-[3px] text-[1.1em] font-semibold block">
        <select
          ref={select_ref}
          defaultValue={settings.summary_mode.state}
          onChange={() => {
            if (select_ref.current) {
              settings.summary_mode.setState(select_ref.current?.value);
              setSettingsCookies("summary_mode", select_ref.current?.value);
            }
          }}
          name="summary_type"
          className="w-full h-full border-0 select-none"
        >
          <option value="brief">Brief Summary</option>
          <option value="long">Long Summary</option>
        </select>
      </div>
      <pre
        className={clsx(
          `${secondary_font.className}`,
          "border-1 h-[100%] rounded-[2px] bg-gray-300 pl-[5px] pr-[2px] py-[2px] overflow-auto custom-scrollbar text-wrap lg:text-[1.15em] text-[1em] leading-[1.25em]"
        )}
      >
        {"\t" +
          (settings.summary_mode.state === "brief"
            ? brief_summary
            : long_summary
          ).replace("\n", "\n\t")}
      </pre>
    </div>
  );
}
