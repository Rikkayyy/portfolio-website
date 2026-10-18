import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Syne } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components/NavBar";
import { VisitTracker } from "./components/VisitTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const description =
  "Rikki Casupanan is a Software Developer at Piping Technology & Products and an MS CS student at Georgia Tech, building full-stack apps with Java/Spring Boot, React, TypeScript, and PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL("https://rikkicasupanan.com"),
  title: {
    default: "Rikki Casupanan — Software Developer",
    template: "%s — Rikki Casupanan",
  },
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Rikki Casupanan",
    title: "Rikki Casupanan — Software Developer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Rikki Casupanan — Software Developer",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${syne.variable} antialiased`}
      >
        <VisitTracker />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
