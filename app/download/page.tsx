import Folder from "./folder";
import { header_font } from "../fonts";

export const metadata = {
  title: "One Punch Man PDF | Download",
  description: "Download sources of OPM Manga",
};

export default function DownloadPage() {
  return (
    <section className="light p-[min(4vw,40px)] w-[100vw] h-[100vh]">
      <h1
        className={`${header_font.className} font-semibold text-[2em] mb-[0.5em]`}
      >
        Download Folders
      </h1>
      <div className="min-w-[250px] w-[50vw] max-w-[400px]">
        <Folder
          folder_name="Background Image"
          file_names={[
            "/background/opm_bg_sm.jpg",
            "/background/opm_bg_md.jpg",
            "/background/opm_bg_lg.jpg",
            "/background/opm_bg_xl.jpg",
          ]}
        />
        <Folder
          folder_name="Manga Sources"
          file_names={[
            "/sources/chapter_source.json",
            "/sources/volume_source.json",
          ]}
        />
      </div>
    </section>
  );
}
