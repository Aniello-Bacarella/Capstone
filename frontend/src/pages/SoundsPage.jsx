import { useState } from "react";
//import { SoundList } from "../components/Sounds/SoundList";
import { SoundUploadForm } from "../components/Sounds/SoundUploadForm";

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
      {showUploadForm && <SoundUploadForm onSuccess={handleSoundCreated} />}
      <SoundList refreshKey={refreshKey} />
    </div>
  );
};
