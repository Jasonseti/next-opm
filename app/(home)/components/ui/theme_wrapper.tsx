"use client";
import { useContext } from "react";
import { ThemeContext, ContextType } from "../../../theme_provider";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme_context: ContextType = useContext(ThemeContext);

  return (
    <div
      className={
        theme_context.theme === "dark" ? "bg-gray-700" : "bg-orange-300"
      }
    >
      {children}
    </div>
  );
}
