import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CallLawya — Get Legal Help Anywhere in Africa",
    template: "%s | CallLawya",
  },
  description:
    "Connect with verified, affordable lawyers across Africa by call, video or chat. Justice should not be a privilege.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
