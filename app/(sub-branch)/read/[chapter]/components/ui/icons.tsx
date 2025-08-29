"use client";
import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";
import { ContextType, SettingsContext } from "../../state_provider";
import { useState } from "react";

function Icon({
  name,
  fill = "#000000",
  onClick,
}: {
  name: string;
  fill?: string;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className="icons">
      <Image
        fill
        src={`/icon/${name}.svg`}
        alt={`${name}_icon`}
        style={{ fill: fill }}
        className="!fill-black p-[5px]"
      ></Image>
    </div>
  );
}

export default function Utility_Icons() {
  const settings: ContextType = useContext(SettingsContext);

  const [is_favorite, setFavorite] = useState<boolean>(false);
  return (
    <div className="h-[37px] flex [&_div]:mx-[2.5px] -ml-[5px] select-none">
      <Icon name={"bookmark"} />
      <Icon
        onClick={() => settings.is_comment_open.setState(true)}
        name={"comment"}
      />
      <div onClick={() => setFavorite(!is_favorite)} className="icons">
        <Image
          fill
          src={`/icon/heart_${is_favorite ? "full.png" : "hollow.svg"}`}
          alt="favorite icon"
          className={clsx(is_favorite ? "p-[6px]" : "p-[4px]")}
        ></Image>
      </div>
      <Icon name={"feedback"} />
    </div>
  );
}
