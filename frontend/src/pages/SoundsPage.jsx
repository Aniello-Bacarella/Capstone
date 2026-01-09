import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const SoundsPage = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="sounds-page">
      <header className="page-header">
        <div>
          <h2>My Sounds</h2>
          <p className="page-subtitle">Manage your audio collection!</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowUploadForm(!setShowUploadForm)}
        >
          {showUploadForm ? "Cancel" : "Upload Sound"}
        </button>
      </header>
    </div>
  );
};
