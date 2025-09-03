"use client";
import clsx from "clsx";
import { useContext, Dispatch, SetStateAction } from "react";
import { ContextType, SettingsContext } from "../../state_provider";
import { setSettingsCookies } from "../../../../../lib/set_cookie";

function SettingsButton({
  text,
  onClick = () => {},
  picked,
}: {
  text: string;
  onClick?: () => void;
  picked: boolean;
}) {
  return (
    <button
      onClick={text === "Slide" || text === "Instant" ? () => {} : onClick}
      className={clsx(
        picked && "bg-gray-500 hover:bg-gray-500",
        "relative group cursor-pointer hover:bg-gray-400 bg-transition w-[50%] text-center text-m leading-[1.25em]",
        "border-[1.5px] border-r-0 last-of-type:border-r-[1.5px] border-y-[1.5px] border-black first-of-type:rounded-l-[100px] last-of-type:rounded-r-[100px]",
        (text === "Slide" || text === "Instant") && "bg-gray-400 text-gray-500"
      )}
    >
      {text}
      <div
        className={clsx(
          "text-s absolute bottom-[120%] w-[150%] -left-[25%] pointer-events-none rounded-[10px] px-[20px] py-[2px] bg-white border-2 leading-[1em]",
          text === "Slide" || text === "Instant"
            ? "group-hover:opacity-100 group-hover:delay-300 opacity-0"
            : "hidden",
          "transition duration-200"
        )}
      >
        Under Development
      </div>
    </button>
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
    <>
      {options.map((text, i) => (
        <SettingsButton
          key={i}
          picked={text.toLowerCase() === states.state}
          onClick={() => {
            states.setState(text.toLowerCase());
            setSettingsCookies("page_mode", text.toLowerCase());
          }}
          text={text}
        />
      ))}
    </>
  );
}

export default function SettingsTab() {
  const settings: ContextType = useContext(SettingsContext);

  return (
    <>
      <menu className="my-[5px] select-none w-[90%] h-[40%] sm:h-[10%] mx-auto flex">
        <OptionSettings
          options={["One-Page", "Two-Page"]}
          states={settings.page_mode}
        />
      </menu>
      <menu className="my-[5px] select-none w-[90%] h-[40%] sm:h-[10%] mx-auto flex">
        <OptionSettings
          options={["Slide", "Scroll", "Instant"]}
          states={settings.read_mode}
        />
      </menu>
    </>
  );
}
