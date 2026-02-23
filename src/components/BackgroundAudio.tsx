"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Standard HTML5 Audio implementation for the MP3 file
    audioRef.current = new Audio("/audio/bg_compressed.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            // Remove listeners once audio starts
            window.removeEventListener("click", startAudio);
            window.removeEventListener("scroll", startAudio);
            window.removeEventListener("touchstart", startAudio);
          })
          .catch((err) => console.log("Audio play failed:", err));
      }
    };

    // Listen for the first user interaction to bypass browser autoplay blocks
    window.addEventListener("click", startAudio);
    window.addEventListener("scroll", startAudio);
    window.addEventListener("touchstart", startAudio);

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("scroll", startAudio);
      window.removeEventListener("touchstart", startAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isPlaying]);

  // Update audio element volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleMute = () => {
    setHasInteracted(true);

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasInteracted(true);
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (newVolume > 0 && !isPlaying && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    } else if (newVolume === 0 && isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {!hasInteracted && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="px-3 py-1.5 text-xs font-mono text-green/80 bg-navy-800/80 backdrop-blur-md rounded border border-green/30 tracking-wide"
          >
            Enable Audio
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        className="flex items-center bg-navy-800/50 backdrop-blur-md border border-slate-700/50 rounded-full shadow-lg shadow-black/20 hover:border-green/30 transition-colors p-2"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ width: 0, opacity: 0, marginLeft: 0 }}
              animate={{ width: 100, opacity: 1, marginLeft: 12 }}
              exit={{ width: 0, opacity: 0, marginLeft: 0 }}
              className="overflow-hidden flex items-center"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isPlaying ? volume : 0}
                onChange={handleVolumeChange}
                className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          layout
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className="p-2 rounded-full text-slate-300 hover:text-green focus:outline-none ml-2"
          aria-label={
            isPlaying ? "Mute Background Audio" : "Play Background Audio"
          }
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 opacity-70" />
          )}
        </motion.button>
      </motion.div>
    </div>
  );
}
