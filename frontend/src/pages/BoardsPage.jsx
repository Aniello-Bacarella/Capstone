import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const data = await api.getBoards();
      setBoards(data.boards);
    } catch (err) {
      console.error("Failed to fetch boards:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.createBoard(title, description, isPublic);
      setTitle("");
      setDescription("");
      setIsPublic(false);
      setShowCreateForm(false);
      fetchBoards();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this board?")) {
      try {
        await api.deleteBoard(id);
        setBoards(boards.filter((b) => b.id !== id));
      } catch (err) {
        alert("Failed to delete board");
      }
    }
  };

  return (
    <div className="boards-page">
      <header className="page-header">
        <div>
          <h2>My Boards</h2>
          <p className="page-subtitle">Organize your sounds</p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create Board"}
        </button>
      </header>
      {showCreateForm && (
        <form className="create-board-form" onSubmit={handleCreateBoard}>
          <h3>Create New Board</h3>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Board Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Make this board public
            </label>
          </div>

          <button type="submit" className="btn-primary">
            Create Board
          </button>
        </form>
      )}
    </div>
  );
};
