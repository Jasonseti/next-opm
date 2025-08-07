"use client";
import {
  useRef,
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}
const ThemeContext = createContext<ContextType>({
  theme: "light",
  setTheme: () => {},
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme_provider = useRef<HTMLBodyElement>(null);
  const [theme, setTheme] = useState<string>("light");
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
    <body ref={theme_provider}>
      <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
        {children}
      </ThemeContext.Provider>
    </body>
  );
}
