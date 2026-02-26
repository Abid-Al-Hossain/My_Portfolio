"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="text-slate-100 py-6 md:py-0">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              About Me
            </h2>
            <div className="h-[1px] bg-navy-600 flex-grow max-w-xs" />
          </div>

          <div className="text-lg font-light space-y-4 leading-relaxed">
            <p>
              Hello! My name is Swakkhar and I enjoy creating things that live
              on the internet. My interest in web development started back when
              I decided to try editing custom Tumblr themes — turns out hacking
              together HTML &amp; CSS is pretty cool!
            </p>
            <p>
              Fast-forward to today, and I&apos;ve had the privilege of building
              software for a{" "}
              <span className="text-green">student management system</span>, a{" "}
              <span className="text-green">large UI library</span>, and various
              machine learning projects. My main focus these days is building
              accessible, inclusive products and digital experiences for a
              variety of clients.
            </p>
            <p>
              I also have a strong background in competitive programming and
              Machine Learning, which helps me write efficient, optimized code.
            </p>
          </div>
        </div>

        <div className="relative group mx-auto md:mx-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded z-10 overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]">
            <Image
              src="/avatar.jpeg"
              alt="Swakkhar (Abid Al Hossain) - Full Stack Developer and Creative Engineer Portfolio"
              fill
              className="object-cover transition-all duration-700 pointer-events-none group-hover:scale-110"
            />
          </div>
          <div className="absolute top-4 left-4 w-64 h-64 md:w-80 md:h-80 border-2 border-green/50 rounded z-0 transition-all duration-700 group-hover:top-2 group-hover:left-2 group-hover:border-green group-hover:shadow-[0_0_30px_rgba(100,255,218,0.3)]" />
        </div>
      </div>
    </div>
  );
}
