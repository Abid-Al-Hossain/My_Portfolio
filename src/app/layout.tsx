import type { Metadata } from "next";
import { Inter, Fira_Code, Outfit } from "next/font/google";
import "./globals.css";
import BackgroundAudio from "@/components/BackgroundAudio";
import TravelAudio from "@/components/TravelAudio";
import { AudioProvider } from "@/lib/AudioContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: "Swakkhar | Abid Al Hossain | Full Stack Developer Portfolio",
    template: "%s | Swakkhar Abid Al Hossain",
  },
  description:
    "Official portfolio of Swakkhar (Abid Al Hossain). A high-performance Full Stack Developer specializing in Next.js, React, Node.js, and Creative 3D Web Experiences. Explore my projects and career journey.",
  keywords: [
    "Portfolio",
    "Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Web Developer",
    "Creative Developer",
    "Next.js Portfolio",
    "React Three Fiber",
    "Three.js",
    "Master SEO",
    "Swakkhar",
    "Swakhar",
    "Swakkher",
    "Abid",
    "Abd",
    "Al",
    "Hossain",
    "Hosain",
    "Hasan",
    "Hassan",
    "Ahmed",
    "Abid Al Hossain Portfolio",
    "Swakkhar Portfolio",
    "Abid Al Hasan",
    "Abid Al Hosain",
    "Swakhar Abid",
  ],
  authors: [{ name: "Swakkhar (Abid Al Hossain)" }],
  creator: "Swakkhar",
  publisher: "Swakkhar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://my-portfolio-woad-alpha-94.vercel.app", // Updated from placeholder
    title: "Swakkhar | Full Stack Developer | Modern Portfolio",
    description:
      "Explore the creative and technical portfolio of Swakkhar. Leading-edge web development and 3D experiences.",
    siteName: "Swakkhar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Swakkhar Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swakkhar | Full Stack Developer",
    description:
      "Modern web portfolio and showcase of technical excellence by Swakkhar.",
    images: ["/og-image.png"],
    creator: "@swakkhar",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Swakkhar",
    alternateName: [
      "Abid Al Hossain",
      "Abid Al Hosain",
      "Abid Al Hasan",
      "Swakhar",
    ],
    jobTitle: "Full Stack Developer",
    url: "https://my-portfolio-woad-alpha-94.vercel.app",
    sameAs: [
      "https://github.com/Abid-Al-Hossain",
      "https://www.linkedin.com/in/abid-ahmed-5a1385234/",
      "https://www.facebook.com/swakkhar.abid",
      "https://www.instagram.com/procchod123/",
    ],
    description:
      "Full Stack Developer specializing in Next.js, React, and Creative Web Solutions.",
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "Node.js",
      "Three.js",
      "Machine Learning",
      "Software Engineering",
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} ${outfit.variable} font-sans antialiased bg-navy-900 text-slate-100 selection:bg-green selection:text-navy-900 overflow-x-hidden`}
      >
        <AudioProvider>
          {children}
          <BackgroundAudio />
          <TravelAudio />
        </AudioProvider>
      </body>
    </html>
  );
}
