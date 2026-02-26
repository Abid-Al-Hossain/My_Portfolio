"use client";

import { useState, useEffect, useRef } from "react";
import { useAudioSettings } from "@/lib/AudioContext";
import {
  useScrollState,
  getSectionVisibility,
  SECTION_STOPS,
} from "@/lib/useScrollCamera";

export default function Hero() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);

  const name = "Swakkhar.";
  const title = "I build things for the web.";

  const { typingSoundEnabled, typingVolume } = useAudioSettings();
  const typingSoundEnabledRef = useRef(typingSoundEnabled);
  const typingVolumeRef = useRef(typingVolume);

  // Need a ref to the AudioContext and GainNode to update volume outside of initAudio
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);

  // Track visibility perfectly synchronized with the 3D scroll system
  const { cameraZ } = useScrollState();
  const { visible, opacity: visibilityOpacity } = getSectionVisibility(
    cameraZ,
    SECTION_STOPS[0],
  );
  const isVisibleRef = useRef(visible);

  useEffect(() => {
    isVisibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    typingSoundEnabledRef.current = typingSoundEnabled;
  }, [typingSoundEnabled]);

  useEffect(() => {
    // Use the 3D camera opacity to naturally fade the volume as we scroll away
    const safeOpacity = Math.max(0, visibilityOpacity);
    const newVolume = typingVolume * safeOpacity;

    typingVolumeRef.current = newVolume;
    if (gainNodeRef.current && audioCtxRef.current) {
      // Smoothly transition volume to prevent clicking
      gainNodeRef.current.gain.setTargetAtTime(
        newVolume,
        audioCtxRef.current.currentTime || 0,
        0.05,
      );
    }
  }, [typingVolume, visibilityOpacity]);

  useEffect(() => {
    let isCancelled = false;

    // --- High-Performance Web Audio API Setup ---
    let typingBuffer: AudioBuffer | null = null;
    let deleteBuffer: AudioBuffer | null = null;

    const initAudio = async () => {
      try {
        const AudioContextClass =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        const masterGain = ctx.createGain();
        masterGain.gain.value = typingVolumeRef.current;
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Load primary typing sound
        const response2 = await fetch("/audio/keystroke1.mp3");
        const arrayBuffer2 = await response2.arrayBuffer();
        typingBuffer = await ctx.decodeAudioData(arrayBuffer2);

        // Load deletion sound
        const response1 = await fetch("/audio/keystroke2.mp3");
        const arrayBuffer1 = await response1.arrayBuffer();
        deleteBuffer = await ctx.decodeAudioData(arrayBuffer1);

        // Required to unlock AudioContext on some browsers
        const unlockAudio = () => {
          if (audioCtxRef.current?.state === "suspended")
            audioCtxRef.current.resume();
          window.removeEventListener("click", unlockAudio);
          window.removeEventListener("touchstart", unlockAudio);
          window.removeEventListener("keydown", unlockAudio);
        };

        window.addEventListener("click", unlockAudio, { once: true });
        window.addEventListener("touchstart", unlockAudio, { once: true });
        window.addEventListener("keydown", unlockAudio, { once: true });
      } catch (error) {
        console.error("Web Audio API error:", error);
      }
    };

    initAudio();

    const playSound = (buffer: AudioBuffer | null) => {
      if (!typingSoundEnabledRef.current || !isVisibleRef.current) return;
      if (!audioCtxRef.current || !buffer || !gainNodeRef.current) return;
      if (audioCtxRef.current.state === "suspended") return;

      const source = audioCtxRef.current.createBufferSource();
      source.buffer = buffer;
      // Slight pitch variation for organic feel
      source.playbackRate.value = 0.95 + Math.random() * 0.1;
      source.connect(gainNodeRef.current);
      source.start(0);
    };

    const playTypingSound = () => playSound(typingBuffer);
    const playDeleteSound = () => playSound(deleteBuffer);

    const loop = async () => {
      while (!isCancelled) {
        setShowCursor1(true);
        for (let i = 0; i <= name.length; i++) {
          if (isCancelled) break;
          setText1(name.slice(0, i));
          if (i > 0) playTypingSound();
          await new Promise((r) => setTimeout(r, 100));
        }
        setShowCursor1(false);

        setShowCursor2(true);
        for (let i = 0; i <= title.length; i++) {
          if (isCancelled) break;
          setText2(title.slice(0, i));
          if (i > 0) playTypingSound();
          await new Promise((r) => setTimeout(r, 50)); // Extremely fast typing (20 CPS)
        }

        await new Promise((r) => setTimeout(r, 3000));

        // Deletion Phase - Title
        if (!isCancelled && title.length > 0) playDeleteSound();
        for (let i = title.length; i >= 0; i--) {
          if (isCancelled) break;
          setText2(title.slice(0, i));
          await new Promise((r) => setTimeout(r, 10)); // Ultra-fast deletion
        }
        setShowCursor2(false);

        setShowCursor1(true);
        // Deletion Phase - Name
        if (!isCancelled && name.length > 0) playDeleteSound();
        for (let i = name.length; i >= 0; i--) {
          if (isCancelled) break;
          setText1(name.slice(0, i));
          await new Promise((r) => setTimeout(r, 20)); // Extremely fast deletion
        }

        await new Promise((r) => setTimeout(r, 1000));
      }
    };

    loop();
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="min-h-[70vh] flex flex-col justify-center text-slate-100 pt-8 md:pt-32"
    >
      <p className="text-green font-mono text-lg md:text-xl mb-6 tracking-wider">
        Hi, my name is
      </p>

      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight min-h-[1.2em]">
        {text1}
        {showCursor1 && <span className="animate-pulse text-green">_</span>}
      </h1>

      <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-6 tracking-tight min-h-[1.2em]">
        {text2}
        {showCursor2 && <span className="animate-pulse text-green">_</span>}
      </h2>

      <p className="text-slate-400 max-w-xl text-lg mb-10 leading-relaxed">
        I&apos;m a software engineer specializing in building (and occasionally
        designing) exceptional digital experiences. Currently, I&apos;m focused
        on building accessible, human-centered products.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => {
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-4 rounded bg-transparent border border-green text-green font-mono text-sm hover:bg-green/10 transition-colors flex items-center gap-2 group"
        >
          Check out my work
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
        <button className="px-6 py-4 rounded bg-green/10 text-green font-mono text-sm hover:bg-green/20 transition-colors flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Resume
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="mt-16 text-slate-400 text-center animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-slate-400 to-transparent mx-auto mb-2 opacity-50" />
        <p className="text-xs font-mono tracking-widest opacity-70">SCROLL</p>
      </div>
    </div>
  );
}
