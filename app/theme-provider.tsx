"use client";
import { useState } from "react";
import { createContext, Dispatch, SetStateAction } from "react";

export const ThemeContext = createContext<{
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}>({
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

  return (
    <body className={theme}>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        {children}
      </ThemeContext.Provider>
    </body>
  );
}
