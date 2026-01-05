-- users table 

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password_hash VARCHAR(255) NOT NULL, 
    display_name VARCHAR(100) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
); 

-- sounds table 

CREATE TABLE sounds (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL, 
    filename VARCHAR(255) NOT NULL, 
    audio_data BYTEA NOT NULL,
    mimetype VARCHAR(100) NOT NULL, 
    filesize INTEGER NOT NULL, 
    duration_ms INTEGER, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- boards table 

CREATE TABLE boards (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    is_public BOOLEAN DEFAULT false, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

