//email validation

export const validateRegistration = (req, res, next) => {
  const { email, password, display_name } = req.body;

  if (!email || !password || !display_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
};

// sound validation

export const validateSoundUpload = (req, res, next) => {
  const { title, filename, audio_data, mimetype, filesize } = req.body;

  if (!title || !filename || !audio_data || !mimetype || !filesize) {
    return res
      .status(400)
      .json({ error: "Missing required fields for sound upload" });
  }

  if (title.length > 255) {
    return res
      .status(400)
      .json({ error: "Title exceeds 255 characters limit" });
  }

  // validate media type
};
