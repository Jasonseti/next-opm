"use client";
import clsx from "clsx";
import { main_font } from "../../fonts";

export default function CTAButton({
  children,
  href,
  color,
}: {
  children: React.ReactNode;
  href: string;
  color: string;
}) {
  return (
    <button
      className={clsx(
        color,
        "w-[max(min(20vw,200px),100px)] h-[max(min(5.5vw,55px),35px)]",
        "rounded-br-[8px] rounded-tl-[8px] rounded-bl-[4px] rounded-tr-[4px]",
        `${main_font.className} text-[max(min(2.5vw,1.55em),1.1em)] cursor-pointer`
      )}
    >
      <a href={href}>{children}</a>
    </button>
  );
}
