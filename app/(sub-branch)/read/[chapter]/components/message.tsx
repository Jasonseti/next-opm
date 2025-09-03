"use client";
import clsx from "clsx";
import { useState, useContext, useEffect, useRef } from "react";
import { ContextType, SettingsContext } from "../state_provider";

function ExpirableMessage({
  message,
  delay,
}: {
  message: string;
  delay: number;
}) {
  const [expire, setExpire] = useState<boolean>(true);
  const this_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpire(false);
    const timer = setTimeout(() => {
      setExpire(true);
      setTimeout(() => {
        if (this_ref.current) this_ref.current.style.display = "none";
      }, 300);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      ref={this_ref}
      className={clsx(
        "mx-auto pointer-events-none rounded-[100px] px-[4vw] py-[0.4em] text-white",
        expire
          ? "relative -top-[40px] opacity-0"
          : "relative top-0 opacity-100",
        "transition-all duration-300",
        "bg-black",
        message.toLowerCase().includes("bookmark") && "!bg-blue-800",
        message.toLowerCase().includes("favorite") && "!bg-red-400",
        message.toLowerCase().includes("vote") && "!bg-amber-400 !text-black"
      )}
    >
      {message}
    </div>
  );
}

export function Messages() {
  const settings: ContextType = useContext(SettingsContext);

  return (
    <main
      className={clsx(
        "absolute z-50 top-0 pt-[5vh] h-[100vh] overflow-hidden flex flex-col w-[100vw] pointer-events-none",
        "[&_div]:mb-[10px]"
      )}
    >
      {settings.messages.state.map((message, i) => (
        <ExpirableMessage key={i} message={message} delay={2000} />
      ))}
    </main>
  );
}
