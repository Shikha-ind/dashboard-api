const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');

// GET all documents (with iconUrl from document_type)
router.get('/', (req, res) => {
  const sql = `
    SELECT d.*, dt.iconUrl
    FROM documents d
    JOIN document_type dt ON d.type = dt.document_name
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Configure file storage
const storage = multer.memoryStorage(); // or diskStorage({ ... })
const upload = multer({ storage: storage });

// POST: Add new document with file upload
router.post('/', upload.single('action'), (req, res) => {
  const { file_name, related_to, type, region } = req.body;
  const file = req.file;

  if (!file_name || !file) {
    return res.status(400).json({ error: 'file_name and action (file) are required' });
  }

  // You can optionally store file.buffer to DB or save to disk
  const sql = `
    INSERT INTO documents (file_name, related_to, type, region, action)
    VALUES (?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [file_name, related_to, type, region, file.originalname], // You may store file path instead
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        message: 'Document added successfully',
        serial_no: result.insertId
      });
    }
  );
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



// DELETE document by serial_no
router.delete('/:serial_no', (req, res) => {
  const { serial_no } = req.params;

  db.query('DELETE FROM documents WHERE serial_no = ?', [serial_no], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  });
});

// UPDATE document by serial_no
router.put('/:serial_no', (req, res) => {
  const { serial_no } = req.params;
  const { file_name, related_to, type, region, action } = req.body;

  if (!file_name || !related_to || !type || !region || !action) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `
    UPDATE documents
    SET file_name = ?, related_to = ?, type = ?, region = ?, action = ?
    WHERE serial_no = ?
  `;
  const values = [file_name, related_to, type, region, action, serial_no];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document updated successfully' });
  });
});

module.exports = router;
