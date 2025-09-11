/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { useContext } from "react";
import { ThemeContext } from "../../theme-provider";
import { setSettingsCookies } from "../../lib/cookies";

export default function ThemeSwitch() {
  const theme_context = useContext(ThemeContext);

  return (
    <aside className="max-w-[1000px] mx-auto h-0 relative z-20">
      <div
        onClick={() => {
          const new_theme = theme_context.theme === "dark" ? "light" : "dark";
          theme_context.setTheme(new_theme);
          setSettingsCookies("theme_mode", new_theme);
        }}
        className={clsx(
          "select-none cursor-pointer absolute top-[min(4vw,40px)] right-[10%]",
          "h-[8vw] sm:h-[min(6vw,60px)] aspect-square border-[1.5px] rounded-[20%]",
          theme_context.theme === "light"
            ? "bg-gray-300"
            : "bg-gray-200 border-gray-100"
        )}
      >
        <img
          src="/icon/light_mode.svg"
          alt="light_mode_icon"
          className={clsx(
            "absolute top-0 w-full h-full scale-[80%]",
            theme_context.theme === "light" ? "opacity-100" : "opacity-0",
            "transition-all duration-500"
          )}
        />
        <img
          src="/icon/dark_mode.svg"
          alt="dark_mode_icon"
          className={clsx(
            "absolute top-0 w-full h-full scale-[80%]",
            theme_context.theme === "dark" ? "opacity-100" : "opacity-0",
            "transition-all duration-500"
          )}
        />
      </div>
    </aside>
  );
}
