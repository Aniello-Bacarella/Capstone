import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { SoundCard } from "./SoundCard";

export const SoundList = ({ refreshKey }) => {
  const [sounds, setSounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  return <div></div>;
};
