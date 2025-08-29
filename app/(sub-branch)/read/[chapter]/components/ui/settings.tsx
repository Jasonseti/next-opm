"use client";
import clsx from "clsx";
import { useContext, Dispatch, SetStateAction } from "react";
import { ContextType, SettingsContext } from "../../state_provider";

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
      onClick={onClick}
      className={clsx(
        picked && "bg-gray-500 hover:bg-gray-500",
        "cursor-pointer hover:bg-gray-400 bg-transition w-[50%] border-r-[1.5px] last-of-type:border-0 text-center text-m leading-[1.25em]"
      )}
    >
      {text}
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
          onClick={() => states.setState(text.toLowerCase())}
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
      <menu className="my-[5px] select-none border-[1.5px] overflow-hidden w-[90%] h-[40%] sm:h-[10%] mx-auto rounded-[100px] flex">
        <OptionSettings
          options={["One-Page", "Two-Page"]}
          states={settings.page_mode}
        />
      </menu>
      <menu className="my-[5px] select-none border-[1.5px] overflow-hidden w-[90%] h-[40%] sm:h-[10%] mx-auto rounded-[100px] flex">
        <OptionSettings
          options={["Slide", "Scroll", "Instant"]}
          states={settings.read_mode}
        />
      </menu>
    </>
  );
}
