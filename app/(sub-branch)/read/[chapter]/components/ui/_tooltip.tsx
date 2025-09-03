"use client";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

export default function SummaryTooltip({
  children,
  summary,
  long = false,
}: {
  children: React.ReactNode;
  summary: string;
  long?: boolean;
}) {
  const [is_open, setOpen] = useState<boolean>(false);
  const wrapper_ref = useRef<HTMLDivElement>(null);
  const tooltip_ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const wrapper = wrapper_ref.current;
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapper && !wrapper.contains(event.target as HTMLElement)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div ref={wrapper_ref} className="relative first:mr-[5px]">
      <button
        onClick={() => setOpen(!is_open)}
        className="bg-white hover:bg-gray-300 cursor-pointer border-1 px-[5px] rounded-[4px] text-s font-[500]"
      >
        {children}
      </button>
      <div
        ref={tooltip_ref}
        className={clsx(
          !long ? "w-[50vw] -translate-x-1/5" : "w-[80vw] -translate-x-1/3",
          "border-1 absolute top-[30px] px-[10px] py-[7px] rounded-[8px]",
          "bg-[whitesmoke] transition duration-100 ease",
          is_open ? "opacity-100" : "opacity-0 pointer-events-none select-none"
        )}
      >
        <pre
          className={clsx(
            "text-wrap",
            "max-h-[65vh] overflow-y-auto custom-scrollbar"
          )}
        >
          {"\t" + summary.replace("\n", "\n\t")}
        </pre>
      </div>
    </div>
  );
}
