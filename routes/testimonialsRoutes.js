const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../config/db');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// -------------------- GET ALL TESTIMONIALS --------------------
router.get('/', (req, res) => {
  db.query('SELECT * FROM testimonials', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// -------------------- GET REGIONS --------------------
router.get('/regions', (req, res) => {
  db.query('SELECT region_name FROM region', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.region_name));
  });
});

// -------------------- GET SERVICE TYPES --------------------
router.get('/service-types', (req, res) => {
  db.query('SELECT service_name FROM service_type', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(s => s.service_name));
  });
});

// -------------------- TOGGLE LIKE --------------------
router.post('/like', async (req, res) => {
  const { user_id, t_id } = req.body;

  if (!user_id || !t_id) {
    return res.status(400).json({ error: 'user_id and t_id are required' });
  }

  try {
    const [existing] = await db.promise().query(
      'SELECT * FROM testimonial_likes WHERE user_id = ? AND t_id = ?',
      [user_id, t_id]
    );

    if (existing.length > 0) {
      await db.promise().query('DELETE FROM testimonial_likes WHERE user_id = ? AND t_id = ?', [user_id, t_id]);
      await db.promise().query('UPDATE testimonials SET likes = likes - 1 WHERE t_id = ?', [t_id]);
      return res.json({ liked: false });
    } else {
      await db.promise().query('INSERT INTO testimonial_likes (user_id, t_id) VALUES (?, ?)', [user_id, t_id]);
      await db.promise().query('UPDATE testimonials SET likes = likes + 1 WHERE t_id = ?', [t_id]);
      return res.json({ liked: true });
    }
  } catch (err) {
    console.error(' Like toggle error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// -------------------- CREATE TESTIMONIAL --------------------
router.post('/', upload.single('upload'), (req, res) => {
  const { from, to, service_name, region_name, content } = req.body;
  const filePath = req.file ? req.file.filename : null;

  if (!from || !to || !service_name || !region_name || !content) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  const sql = `
    INSERT INTO testimonials 
      (content, \`to\`, \`from\`, service_name, region_name, created_at, upload_path)
    VALUES (?, ?, ?, ?, ?, NOW(), ?)
  `;
  const values = [content, to, from, service_name, region_name, filePath];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(' DB insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }

    res.status(201).json({
      message: 'Testimonial added successfully',
      testimonial_id: result.insertId
    });
  });
});

// -------------------- GET DISTINCT MONTHS --------------------
router.get('/months', (req, res) => {
  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(created_at, '%Y-%m') AS value,
      DATE_FORMAT(created_at, '%M %Y') AS label
    FROM testimonials
    ORDER BY value DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // e.g., [{ value: "2024-07", label: "July 2024" }]
  });
});


router.get('/uploads/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath, err => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('File download failed');
    }
  });
});


module.exports = router;
