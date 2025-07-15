const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your MySQL connection
const multer = require('multer');
const path = require('path');

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname)); // e.g., 1720789928.jpg
  }
});
const upload = multer({ storage: storage });


// GET all case studies (with iconUrl from document_type)
router.get('/', (req, res) => {
  const sql = `
    SELECT cs.*, dt.iconUrl
    FROM case_study cs
    LEFT JOIN document_type dt ON cs.type = dt.document_name
  `;


  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// POST: Upload new case study
router.post('/', upload.single('upload'), (req, res) => {
  const { file_name, related_to, type, region } = req.body;
  const filePath = req.file ? req.file.filename : null;

  if (!file_name || !related_to || !type || !region) {
    return res.status(400).json({ error: 'All required fields must be filled.' });
  }

  const sql = `
    INSERT INTO case_study (file_name, related_to, type, region, file_action, created_at)
    VALUES (?, ?, ?, ?, ?, NOW())
  `;
  const values = [file_name, related_to, type, region, filePath];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ error: 'Database insert failed' });
    }
    res.status(201).json({
      message: 'Case study added successfully',
      testimonial_id: result.insertId
    });
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
    res.json(results); 
  });
});

// DELETE document by serial_no
router.delete('/:serial_no', (req, res) => {
  const { serial_no } = req.params;

  db.query('DELETE FROM case_study WHERE serial_no = ?', [serial_no], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'case study not found' });
    }

    res.status(200).json({ message: 'Case study deleted successfully' });
  });
});

// UPDATE document by serial_no
router.put('/:serial_no', (req, res) => {
  const { serial_no } = req.params;
  const { file_name, related_to, type, region, file_action } = req.body;

  if (!file_name || !related_to || !type || !region || !file_action) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `
    UPDATE case_study
    SET file_name = ?, related_to = ?, type = ?, region = ?, file_action = ?
    WHERE serial_no = ?
  `;
  const values = [file_name, related_to, type, region, file_action, serial_no];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Case study not found' });
    }

    res.status(200).json({ message: 'Case study updated successfully' });
  });
});

module.exports = router;
