"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type WheelEvent,
} from "react";
import {
  Box,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PlayCircle,
  ShoppingCart,
  Sparkles,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  type: string;
  subtitle: string;
  summary: string;
  longDescription: string;
  uniqueValue: string;
  price: string;
  stats: { label: string; value: string }[];
  features: string[];
  useCases: string[];
  tags: string[];
  links: {
    liveDemo: string;
    videoDemo: string;
    gumroad: string;
    lemonSqueezy: string;
  };
};

const products: Product[] = [
  {
    id: "chronos",
    name: "Chronos - Multi-Era HTML Template System",
    type: "Premium HTML/Vite static website template system",
    subtitle: "20 layouts, 17 eras, live customization, and single-layout export.",
    summary:
      "A customizable static template product for developers, designers, freelancers, and agencies who want exportable website packages without backend setup.",
    longDescription:
      "Chronos is a premium static website template system built with HTML, CSS, JavaScript, and Vite. It includes 20 distinct layouts, 17 visual eras, 16 curated color palettes, 70+ Google Fonts, a live visual customizer, algorithmic Surprise Me theme generation, font and HEX color range exclusions, and single-layout ZIP export. It is designed for developers, designers, freelancers, and agencies who want customizable static website layouts without WordPress, jQuery, Bootstrap, or backend setup.",
    uniqueValue:
      "Unlike a normal fixed HTML template, Chronos works as a live-customizable template system. Users can choose a layout, change its visual era, switch palettes, customize fonts and colors, generate new styles with Surprise Me, then export a ready-to-run single-layout Vite package.",
    price: "$99",
    stats: [
      { label: "Layouts", value: "20" },
      { label: "Visual eras", value: "17" },
      { label: "Google Fonts", value: "70+" },
      { label: "Price", value: "$99" },
    ],
    features: [
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
    ],
    useCases: [
      "Client landing pages",
      "Portfolio websites",
      "Agency websites",
      "SaaS/product pages",
      "Static business websites",
      "Fast website prototyping",
    ],
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "Vite",
      "Alpine.js",
      "Static Websites",
      "Template System",
      "Digital Product",
    ],
    links: {
      liveDemo: "https://code-ster-theme-1-demo.vercel.app/",
      videoDemo: "https://youtu.be/a60vCcCaN-U",
      gumroad: "https://aabidalhossain.gumroad.com/l/chronos-html-template-system",
      lemonSqueezy:
        "https://theme-studio-007.lemonsqueezy.com/checkout/buy/d6f4693c-feff-4999-b831-a8b182d795b7",
    },
  },
];

function ProductLinks({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded border font-mono text-xs transition-colors";
  const sizeClass = compact ? "px-3 py-2" : "px-4 py-3";

  return (
    <div className={`grid ${compact ? "grid-cols-2" : "sm:grid-cols-2"} gap-3`}>
      <a
        href={product.links.liveDemo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${product.name} live demo`}
        className={`${baseClass} ${sizeClass} border-green text-green hover:bg-green/10`}
      >
        <ExternalLink className="h-4 w-4" />
        Live Demo
      </a>
      <a
        href={product.links.videoDemo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${product.name} video demo`}
        className={`${baseClass} ${sizeClass} border-slate-600 text-slate-300 hover:border-green hover:text-green`}
      >
        <PlayCircle className="h-4 w-4" />
        Video Demo
      </a>
      <a
        href={product.links.gumroad}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Buy ${product.name} on Gumroad`}
        className={`${baseClass} ${sizeClass} border-green bg-green/10 text-green hover:bg-green/20`}
      >
        <ShoppingCart className="h-4 w-4" />
        Gumroad
      </a>
      <a
        href={product.links.lemonSqueezy}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Buy ${product.name} on Lemon Squeezy`}
        className={`${baseClass} ${sizeClass} border-slate-600 text-slate-300 hover:border-green hover:text-green`}
      >
        <ShoppingCart className="h-4 w-4" />
        Lemon Squeezy
      </a>
    </div>
  );
}

export default function ProductsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(products.length <= 1);
  const hasMultipleProducts = products.length > 1;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateCarouselState = () => {
      setIsAtStart(el.scrollLeft <= 5);
      setIsAtEnd(
        el.scrollWidth <= el.clientWidth ||
          el.scrollLeft >= el.scrollWidth - el.clientWidth - 5,
      );

      if (!el.children.length) return;

      const containerRect = el.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(el.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateCarouselState();
    el.addEventListener("scroll", updateCarouselState, { passive: true });
    window.addEventListener("resize", updateCarouselState);

    return () => {
      el.removeEventListener("scroll", updateCarouselState);
      window.removeEventListener("resize", updateCarouselState);
    };
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;

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
  }, [selectedProduct]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    const safeIndex = Math.max(0, Math.min(index, products.length - 1));

    if (!el || !el.children[safeIndex]) return;

    const target = el.children[safeIndex] as HTMLElement;
    const targetScroll =
      target.offsetLeft - el.clientWidth / 2 + target.clientWidth / 2;

    el.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  const handleDragStart = (event: MouseEvent<HTMLDivElement>) => {
    const interactiveTarget = (event.target as HTMLElement).closest(
      "a, button",
    );

    if (interactiveTarget) return;

    const el = scrollRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;

    isDraggingRef.current = true;
    dragStartXRef.current = event.pageX - el.offsetLeft;
    dragStartScrollLeftRef.current = el.scrollLeft;
    el.style.scrollBehavior = "auto";
  };

  const handleDragMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el || !isDraggingRef.current) return;

    event.preventDefault();

    const x = event.pageX - el.offsetLeft;
    const walk = x - dragStartXRef.current;
    el.scrollLeft = dragStartScrollLeftRef.current - walk;
  };

  const handleDragEnd = () => {
    const el = scrollRef.current;
    if (!el || !isDraggingRef.current) return;

    isDraggingRef.current = false;
    el.style.scrollBehavior = "smooth";
  };

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

      <div className="relative">
        {hasMultipleProducts && !isAtStart && (
          <button
            type="button"
            onClick={() => scrollTo(activeIndex - 1)}
            aria-label="Previous product"
            className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-700/80 text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-green/40 hover:text-green"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        {hasMultipleProducts && !isAtEnd && (
          <button
            type="button"
            onClick={() => scrollTo(activeIndex + 1)}
            aria-label="Next product"
            className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-navy-700/80 text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-green/40 hover:text-green"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          className={`flex gap-6 overflow-x-auto snap-x snap-proximity py-4 ${
            hasMultipleProducts
              ? "cursor-grab active:cursor-grabbing px-12"
              : "px-0"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollBehavior: "smooth",
          }}
        >
          {products.map((product) => (
            <article
              key={product.id}
              className="grid w-full flex-shrink-0 snap-center gap-6 lg:grid-cols-[1.35fr_0.9fr]"
            >
              <div className="rounded-lg border border-white/10 bg-navy-700/60 p-6 backdrop-blur-xl transition-all duration-700 hover:border-green/40 hover:shadow-[0_0_30px_rgba(100,255,218,0.16)] md:p-7">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-green/30 bg-green/10 px-3 py-1 text-xs font-mono text-green">
                    <Box className="h-3.5 w-3.5" />
                    {product.type}
                  </span>
                  <span className="rounded-full border border-white/10 bg-navy-800/70 px-3 py-1 text-xs font-mono text-slate-300">
                    {product.price}
                  </span>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-slate-100 md:text-4xl">
                  {product.name}
                </h3>
                <p className="mb-4 text-sm font-mono text-green md:text-base">
                  {product.subtitle}
                </p>
                <p className="mb-6 text-base leading-relaxed text-slate-300 md:text-lg">
                  {product.summary}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-white/10 bg-navy-800/60 px-2.5 py-1 text-xs font-mono text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProduct(product)}
                  className="inline-flex items-center justify-center gap-2 rounded border border-green px-5 py-3 text-sm font-mono text-green transition-colors hover:bg-green/10"
                >
                  <Sparkles className="h-4 w-4" />
                  Product Details
                </button>
              </div>

              <aside className="flex flex-col gap-5 rounded-lg border border-white/10 bg-navy-800/55 p-6 backdrop-blur-xl">
                <div>
                  <h3 className="mb-3 text-lg font-bold text-slate-100">
                    Quick Facts
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded border border-white/10 bg-navy-900/45 p-3"
                      >
                        <p className="text-2xl font-bold text-green">
                          {stat.value}
                        </p>
                        <p className="text-xs font-mono text-slate-400">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <ProductLinks product={product} compact />
              </aside>
            </article>
          ))}
        </div>
      </div>

      {hasMultipleProducts && (
        <>
          <div className="mt-4 flex justify-center gap-2">
            {products.map((product, i) => (
              <button
                key={product.id}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to ${product.name}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-green"
                    : "w-2 bg-slate-500/50 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
          <p className="mt-2 text-center text-xs uppercase tracking-widest text-slate-500">
            Swipe or drag
          </p>
        </>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-900/80 px-4 py-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${selectedProduct.id}-product-title`}
          onWheel={(event) => event.stopPropagation()}
        >
          <div
            ref={modalScrollRef}
            onWheel={stopModalScrollChaining}
            className="max-h-[85vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-lg border border-white/10 bg-navy-800 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-navy-800/95 px-5 py-4 backdrop-blur">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-green">
                  Digital Product
                </p>
                <h3
                  id={`${selectedProduct.id}-product-title`}
                  className="text-xl font-bold text-slate-100"
                >
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                aria-label={`Close ${selectedProduct.name} product details`}
                className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-green"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 p-5 md:p-6">
              <p className="leading-relaxed text-slate-300">
                {selectedProduct.longDescription}
              </p>

              <div>
                <h4 className="mb-3 font-bold text-slate-100">Key Features</h4>
                <div className="grid gap-2 sm:grid-cols-2">
                  {selectedProduct.features.map((feature) => (
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
                <h4 className="mb-3 font-bold text-slate-100">Use Cases</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.useCases.map((useCase) => (
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
                <h4 className="mb-2 font-bold text-slate-100">Unique Value</h4>
                <p className="text-sm leading-relaxed text-slate-300">
                  {selectedProduct.uniqueValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
