"use client";

import { useState, useEffect, useCallback } from "react";
import { scrollToSection, SECTION_IDS } from "@/lib/useScrollCamera";
import {
  Music,
  VolumeX,
  Keyboard,
  Settings2,
  X,
  Navigation,
} from "lucide-react";
import { useAudioSettings } from "@/lib/AudioContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About", index: 1 },
  { name: "Skills", index: 2 },
  { name: "Projects", index: 3 },
  { name: "Career", index: 4 },
  { name: "Contact", index: 5 },
];

export default function Header() {
  const {
    bgSoundEnabled,
    setBgSoundEnabled,
    bgVolume,
    setBgVolume,
    typingSoundEnabled,
    setTypingSoundEnabled,
    typingVolume,
    setTypingVolume,
    travelSoundEnabled,
    setTravelSoundEnabled,
    travelVolume,
    setTravelVolume,
  } = useAudioSettings();
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAudioMenuOpen, setIsAudioMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMouseNearTop, setIsMouseNearTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    const onMouseMove = (e: MouseEvent) => {
      // Show header if mouse is within 80px of the top
      if (e.clientY < 80) {
        setIsMouseNearTop(true);
      } else {
        setIsMouseNearTop(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [lastScrollY]);

  const handleNavClick = useCallback((index: number) => {
    scrollToSection(index);
    setIsOpen(false);
  }, []);

  return (
    <header
      style={{ backgroundColor: "rgba(17, 34, 64, 0.60)" }}
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-navy-700/50 shadow-sm transition-all duration-700 ${
        !hidden || isMouseNearTop || isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-100 translate-y-0 md:opacity-0 md:-translate-y-5 md:pointer-events-none"
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <button
          onClick={() => handleNavClick(0)}
          className="text-green font-bold text-xl md:text-2xl font-mono"
        >
          &lt;S/&gt;
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleNavClick(link.index)}
                className="text-slate-400 hover:text-green text-sm font-mono transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.name}
              </button>
            </li>
          ))}

          {/* Audio Dropdown (Desktop) */}
          <div className="relative ml-4 pl-6 border-l border-slate-700">
            <button
              onClick={() => setIsAudioMenuOpen(!isAudioMenuOpen)}
              className={`flex items-center justify-center p-2 rounded-full transition-all ${isAudioMenuOpen || bgSoundEnabled ? "text-green bg-green/10" : "text-slate-400 hover:text-green hover:bg-slate-800"}`}
              title="Audio Settings"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {isAudioMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-4 w-64 bg-navy-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl p-4 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-mono text-slate-300">
                      Audio settings
                    </span>
                    <button
                      onClick={() => setIsAudioMenuOpen(false)}
                      className="text-slate-500 hover:text-slate-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bg Music Control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setBgSoundEnabled(!bgSoundEnabled)}
                        className={`flex items-center gap-2 text-xs font-mono transition-colors ${bgSoundEnabled ? "text-green" : "text-slate-500"}`}
                      >
                        {bgSoundEnabled ? (
                          <Music className="w-3.5 h-3.5" />
                        ) : (
                          <VolumeX className="w-3.5 h-3.5" />
                        )}
                        Music
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {Math.round(bgVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={bgSoundEnabled ? bgVolume : 0}
                      onChange={(e) => {
                        setBgVolume(parseFloat(e.target.value));
                        if (!bgSoundEnabled && parseFloat(e.target.value) > 0)
                          setBgSoundEnabled(true);
                      }}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green"
                    />
                  </div>

                  {/* Typing SFX Control */}
                  <div className="space-y-2 pt-2 border-t border-slate-700/50">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          setTypingSoundEnabled(!typingSoundEnabled)
                        }
                        className={`flex items-center gap-2 text-xs font-mono transition-colors ${typingSoundEnabled ? "text-green" : "text-slate-500"}`}
                      >
                        <Keyboard
                          className={`w-3.5 h-3.5 ${!typingSoundEnabled && "opacity-50"}`}
                        />
                        Typing SFX
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {Math.round(typingVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={typingSoundEnabled ? typingVolume : 0}
                      onChange={(e) => {
                        setTypingVolume(parseFloat(e.target.value));
                        if (
                          !typingSoundEnabled &&
                          parseFloat(e.target.value) > 0
                        )
                          setTypingSoundEnabled(true);
                      }}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green"
                    />
                  </div>

                  {/* Travel Sound Control */}
                  <div className="space-y-2 pt-2 border-t border-slate-700/50">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          setTravelSoundEnabled(!travelSoundEnabled)
                        }
                        className={`flex items-center gap-2 text-xs font-mono transition-colors ${travelSoundEnabled ? "text-green" : "text-slate-500"}`}
                      >
                        <Navigation
                          className={`w-3.5 h-3.5 ${!travelSoundEnabled && "opacity-50"}`}
                        />
                        Travel
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {Math.round(travelVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={travelSoundEnabled ? travelVolume : 0}
                      onChange={(e) => {
                        setTravelVolume(parseFloat(e.target.value));
                        if (
                          !travelSoundEnabled &&
                          parseFloat(e.target.value) > 0
                        )
                          setTravelSoundEnabled(true);
                      }}
                      className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="/resume.pdf"
            className="px-4 py-2 border border-green text-green text-xs font-mono rounded hover:bg-green/10 transition-colors"
          >
            Resume
          </a>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-screen h-[100dvh] bg-navy-900/95 backdrop-blur-3xl z-40 flex flex-col items-center pt-28 pb-12 overflow-y-auto md:hidden animate-fade-in shadow-2xl border-t border-white/5">
            <div className="flex flex-col items-center justify-center min-h-min w-full gap-8 px-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.index)}
                  className="text-slate-300 hover:text-green text-xl font-mono tracking-widest uppercase transition-all duration-300 transform hover:scale-105"
                >
                  {link.name}
                </button>
              ))}

              {/* Audio Controls (Mobile) */}
              <div className="w-full max-w-[280px] mt-4 mb-2 p-6 rounded-2xl bg-navy-800/80 backdrop-blur-md border border-slate-700/60 shadow-xl relative overflow-hidden">
                {/* Subtle gradient glow inside the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent pointer-events-none" />

                <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-6 text-center border-b border-slate-700/50 pb-3">
                  Audio Settings
                </h3>

                <div className="flex flex-col gap-6 relative z-10">
                  {/* Bg Music Control */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setBgSoundEnabled(!bgSoundEnabled)}
                        className={`flex items-center gap-3 text-sm font-mono transition-colors ${bgSoundEnabled ? "text-green" : "text-slate-500"}`}
                      >
                        {bgSoundEnabled ? (
                          <Music className="w-4 h-4" />
                        ) : (
                          <VolumeX className="w-4 h-4" />
                        )}
                        Music
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono bg-navy-900/50 px-2 py-1 rounded">
                        {Math.round(bgVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={bgSoundEnabled ? bgVolume : 0}
                      onChange={(e) => {
                        setBgVolume(parseFloat(e.target.value));
                        if (!bgSoundEnabled && parseFloat(e.target.value) > 0)
                          setBgSoundEnabled(true);
                      }}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green"
                    />
                  </div>

                  {/* Typing SFX Control */}
                  <div className="space-y-3 pt-5 border-t border-slate-700/50">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          setTypingSoundEnabled(!typingSoundEnabled)
                        }
                        className={`flex items-center gap-3 text-sm font-mono transition-colors ${typingSoundEnabled ? "text-green" : "text-slate-500"}`}
                      >
                        <Keyboard
                          className={`w-4 h-4 ${!typingSoundEnabled && "opacity-50"}`}
                        />
                        SFX
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono bg-navy-900/50 px-2 py-1 rounded">
                        {Math.round(typingVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={typingSoundEnabled ? typingVolume : 0}
                      onChange={(e) => {
                        setTypingVolume(parseFloat(e.target.value));
                        if (
                          !typingSoundEnabled &&
                          parseFloat(e.target.value) > 0
                        )
                          setTypingSoundEnabled(true);
                      }}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green"
                    />
                  </div>

                  {/* Travel Sound Control (Mobile) */}
                  <div className="space-y-3 pt-5 border-t border-slate-700/50">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() =>
                          setTravelSoundEnabled(!travelSoundEnabled)
                        }
                        className={`flex items-center gap-3 text-sm font-mono transition-colors ${travelSoundEnabled ? "text-green" : "text-slate-500"}`}
                      >
                        <Navigation
                          className={`w-4 h-4 ${!travelSoundEnabled && "opacity-50"}`}
                        />
                        Travel
                      </button>
                      <span className="text-[10px] text-slate-500 font-mono bg-navy-900/50 px-2 py-1 rounded">
                        {Math.round(travelVolume * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={travelSoundEnabled ? travelVolume : 0}
                      onChange={(e) => {
                        setTravelVolume(parseFloat(e.target.value));
                        if (
                          !travelSoundEnabled &&
                          parseFloat(e.target.value) > 0
                        )
                          setTravelSoundEnabled(true);
                      }}
                      className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green"
                    />
                  </div>
                </div>
              </div>

              <a
                href="/resume.pdf"
                className="mt-6 px-10 py-3.5 w-full max-w-[280px] text-center border border-green text-green font-mono uppercase tracking-widest text-sm rounded hover:bg-green hover:text-navy-900 transition-all duration-300"
              >
                Resume
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
