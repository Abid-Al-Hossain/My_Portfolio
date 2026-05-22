"use client";

import { useEffect, useRef, useState, type WheelEvent } from "react";
import {
  Box,
  ExternalLink,
  PlayCircle,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";

const product = {
  name: "Chronos - Multi-Era HTML Template System",
  type: "Premium HTML/Vite static website template system",
  subtitle: "20 layouts, 17 eras, live customization, and single-layout export.",
  shortDescription:
    "Chronos is a 20-layout HTML/Vite template system with live era switching, custom colors, 70+ fonts, Surprise Me styling, and single-layout ZIP export.",
  longDescription:
    "Chronos is a premium static website template system built with HTML, CSS, JavaScript, and Vite. It includes 20 distinct layouts, 17 visual eras, 16 curated color palettes, 70+ Google Fonts, a live visual customizer, algorithmic Surprise Me theme generation, font and HEX color range exclusions, and single-layout ZIP export. It is designed for developers, designers, freelancers, and agencies who want customizable static website layouts without WordPress, jQuery, Bootstrap, or backend setup.",
  price: "$99",
  links: {
    liveDemo: "https://code-ster-theme-1-demo.vercel.app/",
    videoDemo: "https://youtu.be/a60vCcCaN-U",
    gumroad: "https://aabidalhossain.gumroad.com/l/chronos-html-template-system",
    lemonSqueezy:
      "https://theme-studio-007.lemonsqueezy.com/checkout/buy/d6f4693c-feff-4999-b831-a8b182d795b7",
  },
};

const stats = [
  { label: "Layouts", value: "20" },
  { label: "Visual eras", value: "17" },
  { label: "Google Fonts", value: "70+" },
  { label: "Price", value: "$99" },
];

const features = [
  "20 distinct HTML/Vite layouts",
  "17 era-based visual styles",
  "16 curated color palettes",
  "70+ Google Fonts",
  "Live visual customizer",
  "Era, color, and font switching",
  "Custom color controls",
  "Surprise Me theme generator",
  "Font exclusions",
  "HEX color range exclusions",
  "Single-layout ZIP export",
  "Export with or without the customizer",
  "Source files, README, public assets, and preview images",
  "No WordPress, backend, jQuery, or Bootstrap required",
];

const useCases = [
  "Client landing pages",
  "Portfolio websites",
  "Agency websites",
  "SaaS/product pages",
  "Static business websites",
  "Fast website prototyping",
];

const tags = [
  "HTML",
  "CSS",
  "JavaScript",
  "Vite",
  "Alpine.js",
  "Static Websites",
  "Template System",
  "Digital Product",
];

function ProductLinks({ compact = false }: { compact?: boolean }) {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded border font-mono text-xs transition-colors";
  const sizeClass = compact ? "px-3 py-2" : "px-4 py-3";

  return (
    <div className={`grid ${compact ? "grid-cols-2" : "sm:grid-cols-2"} gap-3`}>
      <a
        href={product.links.liveDemo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Chronos live demo"
        className={`${baseClass} ${sizeClass} border-green text-green hover:bg-green/10`}
      >
        <ExternalLink className="h-4 w-4" />
        Live Demo
      </a>
      <a
        href={product.links.videoDemo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Chronos video demo"
        className={`${baseClass} ${sizeClass} border-slate-600 text-slate-300 hover:border-green hover:text-green`}
      >
        <PlayCircle className="h-4 w-4" />
        Video Demo
      </a>
      <a
        href={product.links.gumroad}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy Chronos on Gumroad"
        className={`${baseClass} ${sizeClass} border-green bg-green/10 text-green hover:bg-green/20`}
      >
        <ShoppingCart className="h-4 w-4" />
        Gumroad
      </a>
      <a
        href={product.links.lemonSqueezy}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy Chronos on Lemon Squeezy"
        className={`${baseClass} ${sizeClass} border-slate-600 text-slate-300 hover:border-green hover:text-green`}
      >
        <ShoppingCart className="h-4 w-4" />
        Lemon Squeezy
      </a>
    </div>
  );
}

export default function ProductsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isModalOpen]);

  const stopModalScrollChaining = (event: WheelEvent<HTMLDivElement>) => {
    const el = modalScrollRef.current;
    if (!el) return;

    const scrollingUp = event.deltaY < 0;
    const scrollingDown = event.deltaY > 0;
    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
      event.preventDefault();
    }

    event.stopPropagation();
  };

  return (
    <div className="text-slate-100 pt-24 pb-12 md:py-0">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-white">
          <span className="text-green font-mono text-2xl">04.</span> Products
        </h2>
        <div className="h-[1px] bg-navy-600 flex-grow max-w-xs" />
      </div>

      <div className="grid lg:grid-cols-[1.35fr_0.9fr] gap-6 items-stretch">
        <div className="bg-navy-700/60 backdrop-blur-xl p-6 md:p-7 rounded-lg border border-white/10 hover:border-green/40 hover:shadow-[0_0_30px_rgba(100,255,218,0.16)] transition-all duration-700">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-mono text-green">
              <Box className="h-3.5 w-3.5" />
              {product.type}
            </span>
            <span className="rounded-full border border-white/10 bg-navy-800/70 px-3 py-1 text-xs font-mono text-slate-300">
              {product.price}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-bold text-slate-100 mb-3">
            {product.name}
          </h3>
          <p className="text-green font-mono text-sm md:text-base mb-4">
            {product.subtitle}
          </p>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6">
            A customizable static template product for developers, designers,
            freelancers, and agencies who want exportable website packages
            without backend setup.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-navy-800/60 px-2.5 py-1 text-xs font-mono text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded border border-green px-5 py-3 text-sm font-mono text-green hover:bg-green/10 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Product Details
            </button>
          </div>
        </div>

        <aside className="bg-navy-800/55 backdrop-blur-xl p-6 rounded-lg border border-white/10 flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-3">
              Quick Facts
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded border border-white/10 bg-navy-900/45 p-3"
                >
                  <p className="text-2xl font-bold text-green">{stat.value}</p>
                  <p className="text-xs font-mono text-slate-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <ProductLinks compact />
        </aside>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900/80 backdrop-blur-md px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chronos-product-title"
          onWheel={(event) => event.stopPropagation()}
        >
          <div
            ref={modalScrollRef}
            onWheel={stopModalScrollChaining}
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto overscroll-contain rounded-lg border border-white/10 bg-navy-800 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-navy-800/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-green">
                  Digital Product
                </p>
                <h3
                  id="chronos-product-title"
                  className="text-xl font-bold text-slate-100"
                >
                  {product.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close Chronos product details"
                className="rounded-full p-2 text-slate-400 hover:bg-white/5 hover:text-green transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 md:p-6 space-y-6">
              <p className="text-slate-300 leading-relaxed">
                {product.longDescription}
              </p>

              <div>
                <h4 className="text-slate-100 font-bold mb-3">Key Features</h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="rounded border border-white/10 bg-navy-900/45 px-3 py-2 text-sm text-slate-300"
                    >
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-slate-100 font-bold mb-3">Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {useCases.map((useCase) => (
                    <span
                      key={useCase}
                      className="rounded-full border border-green/20 bg-green/10 px-3 py-1 text-xs font-mono text-green"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-navy-900/45 p-4">
                <h4 className="text-slate-100 font-bold mb-2">Unique Value</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Unlike a normal fixed HTML template, Chronos works as a
                  live-customizable template system. Users can choose a layout,
                  change its visual era, switch palettes, customize fonts and
                  colors, generate new styles with Surprise Me, then export a
                  ready-to-run single-layout Vite package.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
