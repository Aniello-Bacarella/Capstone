import { useState } from "react";
import { api } from "../../services/api";

export const SoundUploadForm = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "audio/mpeg",
        "audio/mp3",
        "audio/wav",
        "audio/ogg",
        "audio/webm",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(
          "Unsupported file type. Please upload MP3, WAV, OGG, or WEBM audio files.)"
        );
        setAudioFile(null);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB limit. Please upload smaller file.");
        setAudioFile(null);
        return;
      }

      setError("");
      setAudioFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!audioFile) {
      setError("Please select an audio file.");
      return;
    }

    setLoading(true);

    try {
      await api.createSound(title, audioFile);

      setTitle("");
      setAudioFile(null);
      const fileInput = document.getElementById("audioFile");
      if (fileInput) fileInput.value = "";

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="sound-upload-form" onSubmit={handleSubmit}>
      <h3>Upload New Sound</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="audioFile">Audio File *</label>
        <input
          id="audioFile"
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          required
        />
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

      <button
        type="submit"
        disabled={loading || !audioFile}
        className="btn-primary"
      >
        {loading ? "Uploading..." : "Upload Sound"}
      </button>
    </form>
  );
};
