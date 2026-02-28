"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AudioContextType {
  bgSoundEnabled: boolean;
  setBgSoundEnabled: (val: boolean) => void;
  typingSoundEnabled: boolean;
  setTypingSoundEnabled: (val: boolean) => void;
  bgVolume: number;
  setBgVolume: (val: number) => void;
  typingVolume: number;
  setTypingVolume: (val: number) => void;
  travelSoundEnabled: boolean;
  setTravelSoundEnabled: (val: boolean) => void;
  travelVolume: number;
  setTravelVolume: (val: number) => void;
}

const AudioContext = createContext<AudioContextType>({
  bgSoundEnabled: false,
  setBgSoundEnabled: () => {},
  typingSoundEnabled: true,
  setTypingSoundEnabled: () => {},
  bgVolume: 0.35,
  setBgVolume: () => {},
  typingVolume: 0.3,
  setTypingVolume: () => {},
  travelSoundEnabled: true,
  setTravelSoundEnabled: () => {},
  travelVolume: 0.4,
  setTravelVolume: () => {},
});

export const useAudioSettings = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [bgSoundEnabled, setBgSoundEnabled] = useState(false);
  const [typingSoundEnabled, setTypingSoundEnabled] = useState(true);
  const [bgVolume, setBgVolume] = useState(0.35);
  const [typingVolume, setTypingVolume] = useState(0.3);
  const [travelSoundEnabled, setTravelSoundEnabled] = useState(true);
  const [travelVolume, setTravelVolume] = useState(0.4);

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const savedBg = localStorage.getItem("bgSoundEnabled");
      if (savedBg !== null) setBgSoundEnabled(savedBg === "true");

      const savedTyping = localStorage.getItem("typingSoundEnabled");
      if (savedTyping !== null) setTypingSoundEnabled(savedTyping === "true");

      const savedBgVol = localStorage.getItem("bgVolume");
      if (savedBgVol !== null) setBgVolume(parseFloat(savedBgVol));

      const savedTypingVol = localStorage.getItem("typingVolume");
      if (savedTypingVol !== null) setTypingVolume(parseFloat(savedTypingVol));

      const savedTravel = localStorage.getItem("travelSoundEnabled");
      if (savedTravel !== null) setTravelSoundEnabled(savedTravel === "true");

      const savedTravelVol = localStorage.getItem("travelVolume");
      if (savedTravelVol !== null) setTravelVolume(parseFloat(savedTravelVol));
    } catch (e) {
      console.error("Could not load audio settings:", e);
    }
  }, []);

  // Save preferences when they change
  useEffect(() => {
    try {
      localStorage.setItem("bgSoundEnabled", bgSoundEnabled.toString());
      localStorage.setItem("typingSoundEnabled", typingSoundEnabled.toString());
      localStorage.setItem("bgVolume", bgVolume.toString());
      localStorage.setItem("typingVolume", typingVolume.toString());
      localStorage.setItem("travelSoundEnabled", travelSoundEnabled.toString());
      localStorage.setItem("travelVolume", travelVolume.toString());
    } catch (e) {
      console.error("Could not save audio settings:", e);
    }
  }, [
    bgSoundEnabled,
    typingSoundEnabled,
    bgVolume,
    typingVolume,
    travelSoundEnabled,
    travelVolume,
  ]);

  return (
    <AudioContext.Provider
      value={{
        bgSoundEnabled,
        setBgSoundEnabled,
        typingSoundEnabled,
        setTypingSoundEnabled,
        bgVolume,
        setBgVolume,
        typingVolume,
        setTypingVolume,
        travelSoundEnabled,
        setTravelSoundEnabled,
        travelVolume,
        setTravelVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
