import { STIX_Two_Text, Source_Sans_3, DM_Sans } from "next/font/google";

export const title_font = DM_Sans({ subsets: ["latin"] });
export const header_font = Source_Sans_3({
  style: ["normal", "italic"],
  subsets: ["latin"],
});
export const main_font = DM_Sans({ subsets: ["latin"] });
export const secondary_font = STIX_Two_Text({ subsets: ["latin"] });
export const quote_font = STIX_Two_Text({ subsets: ["latin"] });
