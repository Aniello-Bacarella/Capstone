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
      <header className="page-header">
        <div>
          <h2>title {board.title}</h2>
          {board.description && (
            <p className="page-subtitle">{board.description}</p>
          )}
        </div>
        <button onClick={() => navigate("/boards")} className="btn-secondary">
          ← Back to Boards
        </button>
      </header>

      <div className="board-sounds-grid">
        {board.sounds.map((sound) => (
          <div key={sound.id} className="board-sound-card">
            <button className="play-btn" onClick={() => playSound(sound.id)}>
              ▶
            </button>
            <div className="sound-info">
              <h3>{sound.title}</h3>
              <span className="filename">file{sound.filename}</span>
            </div>
            <button
              onClick={() => removeSound(sound.id)}
              className="btn-icon btn-danger"
              title="Remove from board"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {board.sounds.length === 0 && (
        <div className="empty-state">
          <p>No sounds on this board yet. Add some from your sounds library!</p>
        </div>
      )}
    </div>
  );
};
