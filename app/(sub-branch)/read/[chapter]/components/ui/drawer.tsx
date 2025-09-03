"use client";
import clsx from "clsx";
import React from "react";
import { useContext } from "react";
import { ContextType, SettingsContext } from "../../state_provider";

export function TopDrawer({ children }: { children: React.ReactNode }) {
  const settings: ContextType = useContext(SettingsContext);

  return (
    <>
      <div
        className={clsx(
          "absolute h-[max(min(30vw,300px),90px)] w-[min(90%,1200px)] left-[calc((100vw-min(90%,1200px))/2)] z-20",
          !settings.is_header_open.state && "-translate-y-1/1",
          "transition duration-400 ease-in-out"
        )}
      >
        {children}
      </div>
    </>
  );
}

export function MobileDrawer({ children }: { children: React.ReactNode }) {
  const settings: ContextType = useContext(SettingsContext);

  return (
    <div
      className={clsx(
        "absolute z-20 top-[5%]",
        !settings.is_header_open.state && "-translate-x-1/1",
        "transition duration-500 ease-in-out"
      )}
    >
      {children}
    </div>
  );
}
