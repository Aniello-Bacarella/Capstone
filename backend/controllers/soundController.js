 try {
    await client.connect(); 

    const { title, filename, audio_data, mimetype, filesize, duration_ms } = req.body;
    const userId = req.session.userId; 

    const audioBuffer = Buffer.from(audio_data, 'base64');

    const result = await client.query(
        `INSERT INTO sounds 
        (user_id, title, filename, audio_data, mimetype, filesize, duration_ms)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, user_id, title, filename, mimetype, filesize, duration_ms, created_at`,
        [userId, title, filename, audioBuffer, mimetype, filesize, duration_ms || null]
    );
