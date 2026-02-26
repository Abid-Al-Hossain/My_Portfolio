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
