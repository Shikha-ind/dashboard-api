<<<<<<< HEAD

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ========================================
// GET all risk entries
// ========================================
router.get('/', (req, res) => {
  db.query('SELECT * FROM risk_register ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ========================================
// GET list of regions (this must come before '/:id')
// ========================================
router.get('/regions', (req, res) => {
  db.query('SELECT region_name FROM region', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.region_name));
  });
});

// ========================================
// GET distinct months from created_at
// ========================================
router.get('/months', (req, res) => {
  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(created_at, '%Y-%m') AS value,
      DATE_FORMAT(created_at, '%M %Y') AS label
    FROM risk_register
    ORDER BY value DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // [{ value: "2024-07", label: "July 2024" }, ...]
  });
});

// ========================================
// GET risk entry by ID
// ========================================
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM risk_register WHERE rr_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Risk not found' });
    res.json(results[0]);
  });
});

// ========================================
// POST: Create a new risk entry
// ========================================
router.post('/', (req, res) => {
  const { region, reported_by, priority, status, risk_description, impact_area } = req.body;

  if (!region || !reported_by || !priority || !status || !risk_description || !impact_area) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    INSERT INTO risk_register (region, reported_by, priority, status, risk_description, impact_area)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [region, reported_by, priority, status, risk_description, impact_area];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Risk registered successfully', id: result.insertId });
  });
});

// ========================================
// PUT: Update a risk entry
// ========================================
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { region, reported_by, priority, status, risk_description, impact_area } = req.body;

  if (!region || !reported_by || !priority || !status || !risk_description || !impact_area) {
    return res.status(400).json({ error: 'All fields are required for update' });
  }

  const sql = `
    UPDATE risk_register 
    SET region = ?, reported_by = ?, priority = ?, status = ?, risk_description = ?, impact_area = ?
    WHERE rr_id = ?
  `;
  const values = [region, reported_by, priority, status, risk_description, impact_area, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Risk updated successfully' });
  });
});

// ========================================
// DELETE: Remove a risk entry
// ========================================
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM risk_register WHERE rr_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Risk deleted successfully' });
  });
});

module.exports = router;

=======
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ========================================
// GET all risk entries
// ========================================
router.get('/', (req, res) => {
  db.query('SELECT * FROM risk_register ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ========================================
// GET list of regions (this must come before '/:id')
// ========================================
router.get('/regions', (req, res) => {
  db.query('SELECT region_name FROM region', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.region_name));
  });
});

// ========================================
// GET distinct months from created_at
// ========================================
router.get('/months', (req, res) => {
  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(created_at, '%Y-%m') AS value,
      DATE_FORMAT(created_at, '%M %Y') AS label
    FROM risk_register
    ORDER BY value DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // [{ value: "2024-07", label: "July 2024" }, ...]
  });
});

// ========================================
// GET risk entry by ID
// ========================================
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM risk_register WHERE rr_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Risk not found' });
    res.json(results[0]);
  });
});

// ========================================
// POST: Create a new risk entry
// ========================================
router.post('/', (req, res) => {
  const { region, reported_by, priority, status, risk_description, impact_area } = req.body;

  if (!region || !reported_by || !priority || !status || !risk_description || !impact_area) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    INSERT INTO risk_register (region, reported_by, priority, status, risk_description, impact_area)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [region, reported_by, priority, status, risk_description, impact_area];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Risk registered successfully', id: result.insertId });
  });
});

// ========================================
// PUT: Update a risk entry
// ========================================
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { region, reported_by, priority, status, risk_description, impact_area } = req.body;

  if (!region || !reported_by || !priority || !status || !risk_description || !impact_area) {
    return res.status(400).json({ error: 'All fields are required for update' });
  }

  const sql = `
    UPDATE risk_register 
    SET region = ?, reported_by = ?, priority = ?, status = ?, risk_description = ?, impact_area = ?
    WHERE rr_id = ?
  `;
  const values = [region, reported_by, priority, status, risk_description, impact_area, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Risk updated successfully' });
  });
});

// ========================================
// DELETE: Remove a risk entry
// ========================================
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM risk_register WHERE rr_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Risk deleted successfully' });
  });
});

module.exports = router;
>>>>>>> dfad0aac13c9f894441de146218bfe07c7d9a5bc
