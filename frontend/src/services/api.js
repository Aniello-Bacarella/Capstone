const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const fetchWithCredentials = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};
