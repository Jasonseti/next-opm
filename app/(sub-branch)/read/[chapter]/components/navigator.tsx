import clsx from "clsx";
import Image from "next/image";
import GoTo from "./ui/go_to_page";
import NavDrawer from "./ui/navigator_drawer";

export default function PageNavigator({
  image_urls,
  image_dimensions,
}: {
  image_urls: string[];
  image_dimensions: number[][];
}) {
  return (
    <NavDrawer>
      {image_urls.map((url, i) => (
        <div
          key={i}
          id={"navigator_page_" + i}
          style={{
            aspectRatio: image_dimensions[i][0] / image_dimensions[i][1],
          }}
          className={clsx(
            "h-full relative mx-[0.8vw] lg:mx-[0.6vw] first-of-type:ml-0 last-of-type:mr-0 select-none",
            "rounded-[4px] border-1 border-black overflow-hidden flex-none"
          )}
        >
          <Image fill src={url} alt="navigator_image" />
          <div
            className={clsx(
              "absolute bottom-0 w-full h-[30%] text-center text-m font-semibold",
              "bg-gradient-to-t from-0% to-100% from-black to-black/0 text-gray-200"
            )}
          >
            <p className="relative top-[25%]">{"" + (i + 1)}</p>
          </div>

          <GoTo page_number={i} />
        </div>
      ))}
    </NavDrawer>
  );
}
