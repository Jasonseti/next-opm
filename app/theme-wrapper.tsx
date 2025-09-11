"use client";
import { useContext } from "react";
import { ThemeContext } from "./theme-provider";

export default function ThemeWrapper({
  children,
  light = "",
  dark = "",
}: {
  children: React.ReactNode;
  light?: string;
  dark?: string;
}) {
  const theme_context = useContext(ThemeContext);

  return (
    <div className={theme_context.theme === "light" ? light : dark}>
      {children}
    </div>
  );
}
