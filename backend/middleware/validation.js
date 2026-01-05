export const validateRegistration = (req, res, next) => {
  const { email, password, display_name } = req.body;

  if (!email || !password || !display_name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
};
