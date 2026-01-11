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

  const handleDelete = async () => {
    if (window.confirm(`Delete "${sound.title}"?`)) {
      try {
        await api.deleteSound(sound.id);
      } catch (err) {
        alert("Failed to delete sound");
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(2)}MB`;
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
