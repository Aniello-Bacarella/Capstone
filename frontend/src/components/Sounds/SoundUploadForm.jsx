import { useState } from "react";
import { api } from "../../services/api";

export const SoundUploadForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files(0);
    if (file) {
      setAudioFile(file);
    }
  };

  return (
    <form className="sound-upload-form">
      <h3>Upload New Sound</h3>

      <div className="form-group">
        <label htmlFor="audioFile">Audio File *</label>
        <input id="audioFile" type="file" accept="audio/*" required />
      </div>

      <div className="form-group">
        <label htmlFor="title">Sound Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <button type="submit" classname="btn-primary">
        Upload Sound
      </button>
    </form>
  );
};
