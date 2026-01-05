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

  const allowedMimes = [
    "audio/mpeg",
    "audio/mp3",
    "audio/ogg",
    "audio/webm",
    "audio/mp4",
  ];
  if (!allowedMimes.includes(mimetype)) {
    return res.status(400).json({ error: "Unsupported audio format" });
  }

  //file size limit (10MB)

  if (filesize > 10 * 1024 * 1024) {
    return res.status(400).json({ error: "File size exceeds 10MB limit" });
  }
  next();
};

//board validation

export const validateBoardInpit = (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required." });
  }

  if (title.length > 255) {
    return res
      .status(400)
      .json({ error: "Title exceeds 255 characters limit." });
  }
  next();
};
