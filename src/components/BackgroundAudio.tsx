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

  // Watch for Context toggle changes and handle browser unpausing
  useEffect(() => {
    if (!audioRef.current) return;

    if (bgSoundEnabled) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log(
            "Audio play blocked. Waiting for user interaction...",
            err,
          );

          // Browser blocked autoplay. Wait for the user to interact with the page.
          const unlockAudio = () => {
            if (bgSoundEnabled && audioRef.current) {
              audioRef.current
                .play()
                .catch((e) => console.error("Still blocked:", e));
            }
            window.removeEventListener("click", unlockAudio);
            window.removeEventListener("keydown", unlockAudio);
            window.removeEventListener("touchstart", unlockAudio);
          };

          window.addEventListener("click", unlockAudio, { once: true });
          window.addEventListener("keydown", unlockAudio, { once: true });
          window.addEventListener("touchstart", unlockAudio, { once: true });
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [bgSoundEnabled]);

  return null; // UI controls are now dynamically handled in Header.tsx
}
