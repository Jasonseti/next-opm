import SubscribeForm from "./ui/subscribe";
import ContactForm from "./ui/contact";
import { main_font } from "../fonts";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

function H3({ title }: { title: string }) {
  return (
    <>
      <h3 className={`${main_font.className} text-[1.35em]`}>{title}</h3>
      <hr className="w-[calc(max(min(100%,400px),150px)+0.8em)] -ml-[0.4em] border-1 mt-[4px] mb-[15px]" />
    </>
  );
}

function Profile() {
  return (
    <div className="w-[100%] m-auto">
      <H3 title={"About Us"}></H3>
      <div className="w-full flex">
        <div className="w-[40%] outline-[1.5px] my-[10px] m-auto aspect-square relative rounded-[100%] overflow-hidden">
          <Image
            fill
            src={"/ocean.png"}
            alt="Profile Picture"
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
        <div className="w-[50%] m-auto flex flex-col">
          <div className="m-auto">
            <p className="text-[1.45em]">@ricebowlKenj1</p>
            <p>(+62) 812 9000 2230</p>
            <p>_ricebowlkenj1@gmail.com</p>
          </div>
          <div className="my-[20px] m-auto flex flex-row">
            {[
              "https://discord.com",
              "https://instagram.com",
              "https://reddit.com",
              "https://github.com/Jasonseti",
            ].map((url, i) => (
              <SocialIcon
                style={{ height: 42, width: 42 }}
                className="mx-[5px]"
                key={i}
                url={url}
              ></SocialIcon>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Legal() {
  return (
    <div className="text-nowrap">
      <H3 title={"Legal"}></H3>
      {["DMCA", "Terms & Conditions", "Privacy Policy"].map((text, i) => (
        <p className="my-[5px]" key={i}>
          <a href="">{text}</a>
        </p>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <div className="">
      <H3 title="Contact Us!"></H3>
      <ContactForm />
    </div>
  );
}

function Subscribe() {
  return (
    <div className="m-auto">
      <H3 title={"Subscribe to our Newsletter!"}></H3>
      <SubscribeForm />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-[0.85em] text-white">
      <div className="w-[min(100vw,1200px)] h-full flex m-auto pt-[min(5vw,50px)] pb-[min(4vw,40px)]">
        <div className="w-[35%] h-full mx-auto">
          <Profile />
        </div>
        <div className="w-[min(55%,500px)] h-full m-auto flex flex-col">
          <div className="w-full flex justify-between">
            <Legal></Legal>
            <Contact></Contact>
          </div>
          <div className="w-full mx-auto mt-[22px]">
            <Subscribe></Subscribe>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
