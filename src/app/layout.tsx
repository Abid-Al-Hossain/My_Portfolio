import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swakkhar | Full Stack Developer",
  description:
    "Portfolio of Abid Al Hossain (Swakkhar), a Full Stack Web Developer specializing in Next.js, React, and modern UI/UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-navy-900 text-slate-300 selection:bg-green-300 selection:text-navy-900`}
      >
        {children}
      </body>
    </html>
  );
}
