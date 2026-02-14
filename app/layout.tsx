import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Study Bhai",
    template: "%s | Study Bhai",
  },
  description:
    "Study Bhai is a premium gamified AI learning platform. Earn XP, build streaks, track analytics, and compete globally.",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://study-bhai.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#0b0b12] text-white min-h-screen relative overflow-x-hidden">

        {/* 🔥 Premium Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-600/20 blur-[200px] rounded-full" />
          <div className="absolute bottom-[-300px] right-[-200px] w-[700px] h-[700px] bg-indigo-600/20 blur-[200px] rounded-full" />
        </div>

        {children}

      </body>
    </html>
  );
}
