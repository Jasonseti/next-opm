"use client";
import { useRef, useEffect, useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

export interface ContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}
export const ThemeContext = createContext<ContextType>({
  theme: "",
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  theme_mode,
}: {
  children: React.ReactNode;
  theme_mode: string;
}) {
  const theme_provider = useRef<HTMLBodyElement>(null);
  const [theme, setTheme] = useState<string>(theme_mode);

  // useEffect(() => {
  //   if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  //     setTheme("dark");
  //   } else {
  //     setTheme("light");
  //   }

  //   window
  //     .matchMedia("(prefers-color-scheme: dark)")
  //     .addEventListener("change", (event) => {
  //       if (event.matches) {
  //         setTheme("dark");
  //       } else {
  //         setTheme("light");
  //       }
  //     });
  // }, []);

  useEffect(() => {
    theme_provider.current?.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <body ref={theme_provider} className={theme}>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        {children}
      </ThemeContext.Provider>
    </body>
  );
}
