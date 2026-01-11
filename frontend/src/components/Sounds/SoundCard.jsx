import { useState } from "react";
import { api } from "../../services/api";

export const SoundCard = ({ sound, onDelete, onUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => {
    const audioElement = new Audio();
    audioElement.crossOrigin = "use-credentials";
    return audioElement;
  });

  const handlePlay = async () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.src = api.getAudioURL(sound.id);
        await audio.play();
        setIsPlaying(true);
        audio.onended = () => setIsPlaying(false);
      } catch (err) {
        console.error("play error", err);
        alert("Failed to play sound");
      }
    }
  };

  return (
    <div className="sound-card">
      <button
        className={`play-btn ${isPlaying ? "playing" : ""}`}
        onClick={handlePlay}
        aria-label={`Play ${sound.title}`}
      >
        {isPlaying ? "⏸️" : "▶️"}
      </button>
    </div>
  );
};
