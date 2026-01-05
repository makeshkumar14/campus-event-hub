import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CampusVibe - Discover Campus Events Like Never Before",
  description: "One platform. Every club. All events. Never miss what matters on your campus. Join 250+ clubs and 50,000+ students on CampusVibe.",
  keywords: "campus events, college events, club events, student events, event discovery, campus life",
  authors: [{ name: "CampusVibe" }],
  openGraph: {
    title: "CampusVibe - Discover Campus Events",
    description: "One platform. Every club. All events. Never miss what matters on your campus.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}>
        <BackgroundAnimation />
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
