import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const BoardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoard();
  }, [id]);

  const fetchBoard = async () => {
    setLoading(true);
    try {
      const data = await api.getBoard(id);
      setBoard(data.board);
    } catch (err) {
      console.error("Failed to fetch board:", err);
      navigate("/boards");
    } finally {
      setLoading(false);
    }
  };

  const playSound = async (soundId) => {
    try {
      const audio = new Audio();
      audio.crossOrigin = "use-credentials";
      audio.src = api.getAudioUrl(soundId);
      await audio.play();
    } catch (err) {
      console.error("Play error:", err);
      alert("Failed to play sound");
    }
  };

  const removeSound = async (soundId) => {
    if (window.confirm("Remove this sound from the board?")) {
      try {
        await api.removeSoundFromBoard(id, soundId);
        fetchBoard();
      } catch (err) {
        alert("Failed to remove sound");
      }
    }
  };

  return (
    <div className="board-detail-page">
      <header className="page-header">{}</header>

      <div className="board-sounds-grid">{}</div>

      {}
    </div>
  );
};
