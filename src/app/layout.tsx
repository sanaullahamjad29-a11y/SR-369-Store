import type { Metadata } from "next";
import { Public_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "SR369 Store",
  description: "A hand-kept inventory ledger for small shops.",
};

export default function RootLayout({
  children,
  }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${publicSans.variable} ${fraunces.variable} ${ibmPlexMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}