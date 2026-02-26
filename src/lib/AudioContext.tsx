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
});

export const useAudioSettings = () => useContext(AudioContext);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [bgSoundEnabled, setBgSoundEnabled] = useState(false);
  const [typingSoundEnabled, setTypingSoundEnabled] = useState(true);
  const [bgVolume, setBgVolume] = useState(0.35);
  const [typingVolume, setTypingVolume] = useState(0.3);

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
    } catch (e) {
      console.error("Could not save audio settings:", e);
    }
  }, [bgSoundEnabled, typingSoundEnabled, bgVolume, typingVolume]);

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
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
