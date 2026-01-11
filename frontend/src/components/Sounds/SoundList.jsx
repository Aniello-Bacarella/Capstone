import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { SoundCard } from "./SoundCard";

export const SoundList = ({ refreshKey }) => {
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSounds();
  }, [searchTerm, refreshKey]);

  // fetch sounds from the API

  const fetchSounds = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;

      const data = await api.getSounds(params);
      setSounds(data.sounds);
    } catch (error) {
      console.error("Error fetching sounds:".error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setSounds(sounds.filter((s) => s.id !== id));
  };

  const handleUpdate = (sound) => {
    const newTitle = prompt("Enter new title:".sound.title);
    if (newTitle && newTitle !== sound.title) {
      api
        .updateSound(sound.id, { title: newTitle })
        .then(() => fetchSounds())
        .catch((err) => alert("failed to update sound"));
    }
  };

  return (
    <div className="sounds-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="search sounds"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="sounds-grid">
        {sounds.map((sound) => (
          <SoundCard
            key={sound.id}
            sound={sound}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
      {sounds.length === 0 && (
        <div className="empty-state">
          <p>No sounds found, upload your first sound!</p>
        </div>
      )}
    </div>
  );
};
