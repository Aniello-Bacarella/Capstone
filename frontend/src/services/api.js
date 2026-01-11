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

export const api = {
  register: async (email, password, display_name) => {
    return fetchWithCredentials(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, password, display_name }),
    });
  },

  login: async (email, password) => {
    return fetchWithCredentials(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    return fetchWithCredentials(`${API_URL}/auth/logout`, {
      method: "POST",
    });
  },

  getCurrentUser: async () => {
    return fetchWithCredentials(`${API_URL}/auth/me`);
  },

  // sounds api 

  getSounds: async (params = {}) => {
    const query = new URLSearchParams(params);
    return fetchWithCredentials(`${API_URL}/sounds?${query}`);
  },

  createSound: async (title, audioFile) => {
    const base64Audio = await filetoBase64(audioFile);
    return fetchWithCredentials(`${API_URL}/sounds`, {
      method: "POST",
      body: JSON.stringify({ title,
        filename: audioFile.name,
        audio_data: base64Audio
        mimetype: audioFile.type
        filesize: audioFile.size
      })
    });
  },

  deleteSound: async (id) => {
    return fetchWithCredentials(`${API_URL}/sounds/${id}`, {
      method: "DELETE",
    });
    },
  }