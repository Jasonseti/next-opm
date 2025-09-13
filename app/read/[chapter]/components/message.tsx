"use client";
import clsx from "clsx";
import { useState, useContext, useEffect, useRef } from "react";
import { StatesTypes, StatesContext } from "../state-provider";

export default function Messages() {
  const states: StatesTypes = useContext(StatesContext);

  return (
    <main
      className={clsx(
        "absolute top-0 z-20 h-[100vh] w-[100vw] pt-[5vh]",
        "overflow-hidden flex flex-col pointer-events-none",
        "[&_div]:mb-[10px]"
      )}
    >
      {states.messages.state.map((message, i) => (
        <ExpirableMessage key={i} message={message} />
      ))}
    </main>
  );
}

function ExpirableMessage({ message }: { message: string }) {
  const [expire, setExpire] = useState<boolean>(true);
  const this_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpire(false);
    const timer = setTimeout(() => {
      setExpire(true);
      setTimeout(() => {
        if (this_ref.current) this_ref.current.style.display = "none";
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
