import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const BoardDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
};
