import { ThemeProvider } from "./theme-provider";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "One Punch Man PDF",
  description:
    "Read One Punch Man Online. Download One Punch Man in PDF Format. Get One Punch Man Source Files.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme_mode = cookieStore.get("theme_mode")?.value || "light";

  return (
    <html lang="en">
      <head>
        <meta property="og:image:alt" content="One Punch Man PDF" />
      </head>
      <ThemeProvider theme_mode={theme_mode}>{children}</ThemeProvider>
    </html>
  );
}
