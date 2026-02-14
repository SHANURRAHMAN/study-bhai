import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Study Bhai",
    template: "%s | Study Bhai",
  },
  description:
    "Study Bhai is a gamified AI study platform where you earn XP, maintain streaks, track analytics, and compete on leaderboards.",
  icons: {
    icon: "/favicon.ico",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-gradient-to-br 
          from-gray-900 
          via-purple-950 
          to-black
          text-white
          min-h-screen
        `}
      >
        {children}
      </body>
    </html>
  );
}
