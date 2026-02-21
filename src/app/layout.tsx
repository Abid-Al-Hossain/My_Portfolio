import type { Metadata } from "next";
import { Inter, Fira_Code, Outfit } from "next/font/google";
import "./globals.css";
import BackgroundAudio from "@/components/BackgroundAudio";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Swakkhar | Full Stack Developer",
  description:
    "Portfolio of Swakkhar, a Full Stack Developer specializing in Next.js, React, and Node.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${firaCode.variable} ${outfit.variable} font-sans antialiased bg-navy-900 text-slate-100 selection:bg-green selection:text-navy-900 overflow-x-hidden`}
      >
        {children}
        <BackgroundAudio />
      </body>
    </html>
  );
}
