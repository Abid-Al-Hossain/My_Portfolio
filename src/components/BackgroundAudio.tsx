"use client";

import { useEffect, useRef } from "react";
import { useAudioSettings } from "@/lib/AudioContext";

export default function BackgroundAudio() {
  const { bgSoundEnabled, bgVolume } = useAudioSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio object once on mount
    const audio = new Audio("/audio/bg_compressed.mp3");
    audio.loop = true;
    audio.volume = bgVolume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  // Watch for volume change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = bgVolume;
    }
  }, [bgVolume]);

  // Watch for Context toggle changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (bgSoundEnabled) {
      audioRef.current
        .play()
        .catch((err) =>
          console.log("Audio play failed due to browser policy:", err),
        );
    } else {
      audioRef.current.pause();
    }
  }, [bgSoundEnabled]);

  return null; // UI controls are now dynamically handled in Header.tsx
}
