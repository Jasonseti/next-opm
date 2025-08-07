import type { Metadata } from "next";
import ThemeProvider from "./theme_context";
import "./globals.css";

export const metadata: Metadata = {
  title: "OPM-PDF",
  description: "one punch man manga in pdf format",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>{children}</ThemeProvider>
    </html>
  );
}
