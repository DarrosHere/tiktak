const express = require('express');
const multer = require('multer');
const pool = require('../db');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const jwt = require('jsonwebtoken');



router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { title, category, user_id } = req.body;
    const videoPath = req.file.path;
    await pool.query(
      'INSERT INTO videos(title, category, path, user_id) VALUES($1, $2, $3, $4)',
      [title, category, videoPath, user_id]
    );
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});
router.post('/like', async (req, res) => {
  try {
    const { user_id, video_id } = req.body;
    const like = await pool.query('SELECT * FROM likes WHERE user_id=$1 AND video_id=$2', [user_id, video_id]);
    if (like.rows.length) {
      await pool.query('DELETE FROM likes WHERE user_id=$1 AND video_id=$2', [user_id, video_id]);
      return res.json({ liked: false });
    } else {
      await pool.query('INSERT INTO likes(user_id, video_id) VALUES($1, $2)', [user_id, video_id]);
      return res.json({ liked: true });
    }
  } catch (err) {
    res.status(500).json({ error: 'Like error' });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const videos = await pool.query('SELECT * FROM videos WHERE user_id=$1 ORDER BY created_at DESC', [userId]);
    res.json(videos.rows);
  } catch (err) {
    res.status(500).json({ error: 'Fetch error' });
  }
});


router.get('/all', async (req, res) => {
  try {
    const videos = await pool.query('SELECT * FROM videos ORDER BY created_at DESC');
    res.json(videos.rows);
  } catch (err) {
    res.status(500).json({ error: 'Fetch error' });
  }
});


router.get('/recommend', async (req, res) => {
  const userId = req.query.user_id;
  if (!userId) return res.status(400).json({ error: "No user_id" });

  try {
    const allVideos = await pool.query('SELECT * FROM videos ORDER BY created_at DESC');

    const likes = await pool.query(
      `SELECT v.category FROM likes l JOIN videos v ON l.video_id = v.id WHERE l.user_id = $1`,
      [userId]
    );

    const catCount = {};
    likes.rows.forEach(like => {
      catCount[like.category] = (catCount[like.category] || 0) + 1;
    });
    let weighted = [];
    allVideos.rows.forEach(v => {
      const weight = 1 + (catCount[v.category] || 0); 
      for (let i = 0; i < weight; i++) weighted.push(v);
    });

    for (let i = weighted.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
    }

    res.json(weighted.slice(0, 20));
  } catch (err) {
    res.status(500).json({ error: 'Recommend error' });
  }
});

router.get('/likes/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  const likes = await pool.query(
    `SELECT l.video_id, v.category FROM likes l JOIN videos v ON l.video_id = v.id WHERE l.user_id = $1`,
    [userId]
  );
  res.json(likes.rows);
});
module.exports = router;