import clsx from "clsx";
import Image from "next/image";
import PageLink from "./page-link";
import NavDrawer from "./nav-drawer";

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
          id={`navigator_page_${i}`}
          style={{
            aspectRatio: image_dimensions[i][0] / image_dimensions[i][1],
          }}
          className={clsx(
            "h-full flex-none relative select-none",
            "mx-[min(0.5vw,5px)] first-of-type:ml-0 last-of-type:mr-0",
            "rounded-[4px] border-1 border-black overflow-hidden"
          )}
        >
          <Image
            width={image_dimensions[i][0]}
            height={image_dimensions[i][1]}
            src={url}
            alt={"page-" + i}
          />
          <div
            className={clsx(
              "absolute bottom-0 w-full h-[30%] text-[1.2em] text-center font-semibold",
              "bg-gradient-to-t from-0% to-100% from-black to-black/0 text-gray-200",
              "flex flex-col-reverse py-[min(3vw,30px)]"
            )}
          >
            {i + 1}
          </div>

          <PageLink page_number={i + 1} />
        </div>
      ))}
    </NavDrawer>
  );
}
