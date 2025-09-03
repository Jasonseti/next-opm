import SubscribeForm from "./ui/subscribe";
import ContactForm from "./ui/contact";
import { main_font } from "../../fonts";
import Image from "next/image";
import { SocialIcon } from "react-social-icons";

function H3({ title }: { title: string }) {
  return (
    <>
      <h3 className={`${main_font.className} text-[1.35em]`}>{title}</h3>
      <hr className="w-[calc(min(100%,9400px)+max(0.1vw,0.8em))] -ml-[0.4em] mt-[4px] mb-[15px]" />
    </>
  );
}

function Profile() {
  return (
    <div className="w-[100%]">
      <H3 title={"About Us"}></H3>
      <div className="w-full flex justify-around md:block lg:flex">
        <div className="w-[min(50%,150px)] hidden sm:block m-auto sm:m-0 md:m-auto md:w-[80%] lg:w-[40%] outline-[1.5px] aspect-square relative rounded-[100%] overflow-hidden">
          <Image
            fill
            src={"/common_image/profile_pic.jpeg"}
            alt="Profile Picture"
            style={{ objectFit: "cover" }}
          ></Image>
        </div>
        <div className="text-center lg:text-start lg:w-[50%] md:m-auto flex flex-col lg:pt-0 md:pt-[15px]">
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
              <div key={i}>
                <div className="mx-[5px] hidden lg:block">
                  <SocialIcon
                    style={{ height: 42, width: 42 }}
                    key={i}
                    url={url}
                  ></SocialIcon>
                </div>
                <div className="mx-[5px] hidden md:block lg:hidden">
                  <SocialIcon
                    style={{ height: 37, width: 37 }}
                    key={i}
                    url={url}
                  ></SocialIcon>
                </div>
                <div className="mx-[5px] block md:hidden">
                  <SocialIcon
                    style={{ height: 32, width: 32 }}
                    key={i}
                    url={url}
                  ></SocialIcon>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Legal() {
  return (
    <>
      <H3 title={"Legal"}></H3>
      {["DMCA", "Terms & Conditions", "Privacy Policy"].map((text, i) => (
        <p className="my-[5px] text-wrap" key={i}>
          <a href="">{text}</a>
        </p>
      ))}
    </>
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
    <div className="">
      <H3 title={"Subscribe to our Newsletter!"}></H3>
      <SubscribeForm />
    </div>
  );
}

function MyImage() {
  return (
    <Image
      fill
      src={"/sticker/saitama_sticker.png"}
      alt="logo"
      style={{ objectFit: "cover" }}
    ></Image>
  );
}
export function Footer() {
  return (
    <footer className="w-full font-semibold bg-[#131b36] text-[max(min(1.6vw,0.9em),0.75em)] text-white">
      <div className="hidden md:flex md:px-[min(4vw,40px)] w-[min(100vw,1200px)] h-full m-auto pt-[min(5vw,50px)] pb-[min(4vw,40px)]">
        <div className="md:w-[25%] lg:w-[35%] mx-auto">
          <Profile />
          <div className="hidden lg:block w-[80%] mx-auto mt-[30px] h-[100px] border-[1.5px] overflow-hidden rounded-[30px] relative">
            <MyImage />
          </div>
        </div>
        <div className="md:w-[60%] lg:w-[55%] m-auto flex flex-col">
          <div className="w-full flex justify-between">
            <div className="w-[25%] md:w-[30%] md:mr-[5vw] text-nowrap">
              <Legal />
              <div className="lg:hidden md:block hidden w-[120%] mx-auto mt-[15px] h-[80px] border-[1.5px] overflow-hidden rounded-[25px] relative">
                <MyImage />
              </div>
            </div>
            <Contact />
          </div>
          <div className="w-full mx-auto mt-[22px]">
            <Subscribe></Subscribe>
          </div>
        </div>
      </div>

      <div className="md:hidden w-[min(100vw,1200px)] m-auto pt-[min(5vw,50px)] pb-[min(4vw,40px)]">
        <div className="pb-[10px] w-[85%] flex justify-between mx-auto">
          <div className="w-[70%]">
            <Profile />
          </div>
          <div className="w-[25%] md:w-[30%] md:mr-[5vw] text-nowrap">
            <Legal />
          </div>
        </div>
        <div className="pb-[10px] w-[85%] m-auto">
          <div className="w-full flex justify-between">
            <div className="w-[70%] ">
              <Contact />
            </div>
            <div className="w-[20%] h-[200px] border-[1.5px] overflow-hidden rounded-[30px] -mt-[40px] relative">
              <MyImage />
            </div>
          </div>
        </div>
        <div className="pb-[10px] w-[85%] m-auto">
          <Subscribe />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
