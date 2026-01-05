INSERT INTO users (email, password_hash, display_name) VALUES
  ('demo@example.com', '$2b$10$3w2KMEM3lU/BPY1DLn3GNeeXnY65GypnVANULvs0VHARFlihiTEae', 'Demo User');

INSERT INTO boards (user_id, title, description, is_public) VALUES
  (1, 'Main Stream', 'Primary streaming soundboard', true);