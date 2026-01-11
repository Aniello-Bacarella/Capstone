import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateform, setShowCreateForm] = useState(true);
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

  return <div>BoardsPage</div>;
};
