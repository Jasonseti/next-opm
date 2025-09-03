"use client";
import { useContext } from "react";
import { ThemeContext, ContextType } from "./theme_provider";

export default function ThemeWrapper({
  children,
  light = "",
  dark = "",
}: {
  children: React.ReactNode;
  light?: string;
  dark?: string;
}) {
  const theme_context: ContextType = useContext(ThemeContext);

  return (
    <div className={theme_context.theme === "dark" ? dark : light}>
      {children}
    </div>
  );
}
