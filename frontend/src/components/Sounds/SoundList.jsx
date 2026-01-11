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

  return <div></div>;
};
