"use client";
import clsx from "clsx";
import { useContext, Dispatch, SetStateAction } from "react";
import { StatesTypes, StatesContext } from "../../state-provider";
import { setSettingsCookies } from "../../../../lib/cookies";

export default function SettingsTab() {
  const states: StatesTypes = useContext(StatesContext);

  return (
    <>
      <OptionSettings
        options={["One-Page", "Two-Page"]}
        states={states.page_mode}
      />
      <div className="h-[3%]" />
      <OptionSettings
        options={["Slide", "Scroll", "Book"]}
        states={states.read_mode}
      />
    </>
  );
}

function OptionSettings({
  options,
  states,
}: {
  options: string[];
  states: {
    state: string;
    setState: Dispatch<SetStateAction<string>>;
  };
}) {
  return (
    <menu className="select-none w-[90%] mx-auto flex">
      {options.map((text, i) => (
        <button
          key={i}
          onClick={() => {
            states.setState(text.toLowerCase());
            setSettingsCookies(
              text.toLowerCase().includes("page") ? "page_mode" : "read_mode",
              text.toLowerCase()
            );
          }}
          className={clsx(
            text === "Book"
              ? "bg-gray-400 text-gray-500 pointer-events-none"
              : text.toLowerCase() === states.state &&
                  "bg-gray-500 hover:bg-gray-500",
            "w-full text-center leading-[1.4em]",
            "relative cursor-pointer hover:bg-gray-400 bg-transition",
            "border-[1.5px] border-r-0 last-of-type:border-r-[1.5px] border-y-[1.5px] border-black first-of-type:rounded-l-[100px] last-of-type:rounded-r-[100px]"
          )}
        >
          {text}
        </button>
      ))}
    </menu>
  );
}
