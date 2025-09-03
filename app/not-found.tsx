import Image from "next/image";
import { main_font } from "./fonts";

export default function NotFound() {
  return (
    <div className="flex flex-col w-[100vw] h-[100vh] bg-[#131b36] text-gray-300">
      <div className="mx-auto relative top-[40%] -translate-y-1/2">
        <div className="w-[100vw] h-[min(40vw,50vh)] relative">
          <Image
            fill
            style={{ objectFit: "contain" }}
            src="/sticker/moon_sticker.png"
            alt="saitama_on_moon_404"
          />
        </div>
        <h1
          className={`${main_font.className} font-semibold text-[min(6vw,60px)] text-center`}
        >
          <pre>{"404 | Page Not Found"}</pre>
        </h1>
      </div>
    </div>
  );
}
