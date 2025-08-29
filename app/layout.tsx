import { ThemeProvider } from "./theme_provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "One Punch Man PDF",
  description:
    "Read One Punch Man Online. Download One Punch Man in PDF Format. Get One Punch Man Source Files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image:alt" content="One Punch Man PDF" />
      </head>
      <ThemeProvider>{children}</ThemeProvider>
    </html>
  );
}
