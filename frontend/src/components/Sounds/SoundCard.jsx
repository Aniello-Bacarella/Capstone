import { useState } from "react";
import { api } from "../../services/api";

export const SoundCard = ({ sound, onDelete, onUpdate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => {});

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
