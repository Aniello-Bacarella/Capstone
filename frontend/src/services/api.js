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
    const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
        reader.onerror = (error) => reject(error);
      });
    };

    const audio_data = await fileToBase64(audioFile);

    const payload = {
      title,
      filename: audioFile.name,
      audio_data,
      mimetype: audioFile.type,
      filesize: audioFile.size,
      duration_ms: null,
    };

    return fetchWithCredentials(`${API_URL}/sounds`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  deleteSound: async (id) => {
    return fetchWithCredentials(`${API_URL}/sounds/${id}`, {
      method: "DELETE",
    });
  },

  getAudioURL: (soundId) => {
    return `${API_URL}/sounds/${soundId}/audio`;
  },

  //boards

  getBoards: async () => {
    return fetrchWithCredentials(`${API_URL}/boards`);
  },
};
