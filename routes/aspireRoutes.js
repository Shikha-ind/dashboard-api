const express = require('express');
const router = express.Router();
const db = require('../config/db');

//  GET all Aspire entries
router.get('/', (req, res) => {
  const query = 'SELECT * FROM aspire ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

//  POST: Create a new Aspire entry
router.post('/', (req, res) => {
  const { to, from, service_name, region_name, award_type, award_name, url_link } = req.body;

  // Validate required fields
  if (!to || !from || !service_name || !region_name || !award_type || !award_name) {
    return res.status(400).json({ error: 'All fields except URL link are required' });
  }

  const sql = `
    INSERT INTO aspire (\`to\`, \`from\`, service_name, region_name, award_type, award_name, url_link)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [to, from, service_name, region_name, award_type, award_name, url_link || null];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Aspire entry created', id: result.insertId });
  });
});

// DELETE Aspire entry by ID
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM aspire WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Aspire entry deleted successfully' });
  });
});

// POST: Toggle Like for Aspire entry
router.post('/like', async (req, res) => {
  const { user_id, sp_id } = req.body;

  if (!user_id || !sp_id) {
    return res.status(400).json({ error: 'user_id and sp_id are required' });
  }

  try {
    // Check if already liked
    const [existing] = await db.promise().query(
      'SELECT * FROM aspire_likes WHERE user_id = ? AND sp_id = ?',
      [user_id, sp_id]
    );

    console.log('Like check:', { user_id, sp_id, existing });

    if (existing.length > 0) {
      // Unlike (remove entry)
      await db.promise().query(
        'DELETE FROM aspire_likes WHERE user_id = ? AND sp_id = ?',
        [user_id, sp_id]
      );

      // Decrease like count
      await db.promise().query(
        'UPDATE aspire SET likes = likes - 1 WHERE sp_id = ?',
        [sp_id]
      );

      return res.json({ liked: false });
    } else {
      // Like (insert entry)
      await db.promise().query(
        'INSERT INTO aspire_likes (user_id, sp_id) VALUES (?, ?)',
        [user_id, sp_id]
      );

      // Increase like count
      await db.promise().query(
        'UPDATE aspire SET likes = likes + 1 WHERE sp_id = ?',
        [sp_id]
      );

      return res.json({ liked: true });
    }
  } catch (err) {
    console.error('Like toggle error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


//  GET: Distinct months (for filtering)
router.get('/months', (req, res) => {
  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(created_at, '%Y-%m') AS value,
      DATE_FORMAT(created_at, '%M %Y') AS label
    FROM aspire
    ORDER BY value DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // [{ value: '2024-07', label: 'July 2024' }, ...]
  });
});

//  GET: Region list
router.get('/regions', (req, res) => {
  db.query('SELECT region_name FROM region', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.region_name));
  });
});

// GET: Service type list
router.get('/service-types', (req, res) => {
  db.query('SELECT service_name FROM service_type', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(s => s.service_name));
  });
});

module.exports = router;
