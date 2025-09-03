/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext, ContextType } from "../../../theme_provider";
import { setSettingsCookies } from "../../../lib/set_cookie";

export default function ThemeSwitch() {
  const theme_context: ContextType = useContext(ThemeContext);

  return (
    <div
      onClick={() => {
        const new_theme = theme_context.theme === "dark" ? "light" : "dark";
        theme_context.setTheme(new_theme);
        setSettingsCookies("theme_mode", new_theme);
      }}
      className={clsx(
        "select-none absolute -top-[0.5em] right-[10%] lg:right-[20%] h-[min(6vw,60px)] aspect-square border-1 rounded-[1vw]",
        theme_context.theme === "light" ? "bg-gray-300" : "bg-gray-200"
      )}
    >
      <img
        src="/icon/light_mode.svg"
        alt="light mode icon"
        className={clsx(
          "absolute top-0 w-full h-full cursor-pointer scale-[80%]",
          theme_context.theme === "light" ? "opacity-100" : "opacity-0",
          "transition-all duration-500"
        )}
      />
      <img
        src="/icon/dark_mode.svg"
        alt="dark mode icon"
        className={clsx(
          "absolute top-0 w-full h-full cursor-pointer scale-[80%]",
          theme_context.theme === "dark" ? "opacity-100" : "opacity-0",
          "transition-all duration-500"
        )}
      />
    </div>
  );
}
