const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users(username, password) VALUES($1, $2)', [username, hash]);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
    if (!user.rows.length) return res.sendStatus(401);
    const valid = await bcrypt.compare(password, user.rows[0].password);
    if (!valid) return res.sendStatus(401);
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/profile', async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.sendStatus(401);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await pool.query('SELECT id, username, avatar FROM users WHERE id=$1', [decoded.id]);
      res.json(user.rows[0]);
    } catch (err) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

module.exports = router;