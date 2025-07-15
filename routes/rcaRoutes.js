const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/rca'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// GET all RCA entries
// router.get('/', (req, res) => {
//   db.query('SELECT * FROM rca ORDER BY created_at DESC', (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// GET all rca (with iconUrl from document_type)
router.get('/', (req, res) => {
  const sql = `
    SELECT rc.*, dt.iconUrl
    FROM rca rc
    LEFT JOIN document_type dt ON rc.type = dt.document_name
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});


// GET RCA by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM rca WHERE rca_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'RCA not found' });
    res.json(results[0]);
  });
});

// get regions
router.get('/regions', (req, res) => {
  db.query('SELECT region_name FROM region', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.region_name));
  });
});

// Get all documents types with icon
router.get('/document-type', (req, res) => {
  db.query('SELECT document_name, iconUrl FROM document_type', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); // send full objects instead of just names
  });
});

// get months
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

// POST RCA with optional file
router.post('/', upload.single('action_file'), (req, res) => {
  const { region, reported_by, root_cause } = req.body;
  const action_file = req.file ? req.file.filename : null;

  if (!region || !reported_by || !root_cause) {
    return res.status(400).json({ error: 'All fields except file are required' });
  }

  const sql = `
    INSERT INTO rca (region, reported_by, root_cause, action_file)
    VALUES (?, ?, ?, ?)
  `;
  const values = [region, reported_by, root_cause, action_file];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'RCA entry created successfully', id: result.insertId });
  });
});

// DELETE RCA
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM rca WHERE rca_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'RCA deleted successfully' });
  });
});

module.exports = router;
