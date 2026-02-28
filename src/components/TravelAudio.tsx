"use client";

import { useEffect, useRef } from "react";
import { useAudioSettings } from "@/lib/AudioContext";

export default function TravelAudio() {
  const { travelSoundEnabled, travelVolume } = useAudioSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio object once on mount
    const audio = new Audio("/audio/Travel_Sound_2.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    const startTravel = () => {
      if (!audioRef.current || !travelSoundEnabled) return;

      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const audio = audioRef.current;
      audio.volume = travelVolume;
      audio.currentTime = 0; // Sync to beginning of mp3 on every navigation

      audio
        .play()
        .catch((err) =>
          console.log("Travel sound blocked by browser policy:", err),
        );
    };

    const startFade = () => {
      if (!audioRef.current || !travelSoundEnabled) return;

      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const audio = audioRef.current;
      const fadeDuration = 600; // time in ms - fast fade
      const fadeSteps = 20;
      const stepTime = fadeDuration / fadeSteps;
      const fadeStepVol = audio.volume / fadeSteps;

      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume - fadeStepVol > 0.01) {
          audio.volume -= fadeStepVol;
        } else {
          audio.volume = 0;
          audio.pause();
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        }
      }, stepTime);
    };

    const stopTravel = () => {
      if (!audioRef.current) return;
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const audio = audioRef.current;
      audio.volume = 0;
      audio.pause();
    };

    window.addEventListener("nav-start", startTravel);
    window.addEventListener("nav-arrive", startFade);
    window.addEventListener("nav-stop", stopTravel);

    return () => {
      window.removeEventListener("nav-start", startTravel);
      window.removeEventListener("nav-arrive", startFade);
      window.removeEventListener("nav-stop", stopTravel);
    };
  }, [travelSoundEnabled, travelVolume]);

  return null;
}
