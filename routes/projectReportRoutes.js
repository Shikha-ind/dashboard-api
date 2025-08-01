// routes/projectsRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); 

// Create
router.post('/', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO projects_reports 
    (next_id, project_name, region, market, start_date, end_date, project_manager, developer, reviewer, scope, status, po_number, cost, brand, no_of_pages, comments)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.next_id, data.project_name, data.region, data.market,
    data.start_date, data.end_date, data.project_manager, data.developer,
    data.reviewer, data.scope, data.status, data.po_number,
    data.cost, data.brand, data.no_of_pages, data.comments
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, ...data });
  });
});

// Read all
router.get('/', (req, res) => {
  db.query('SELECT * FROM projects_reports', (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
});

router.get('/region', (req, res) => {
  db.query('SELECT region_name FROM region;', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results); // [{ region_name: 'UK' }, { region_name: 'US' }]
  });
});

// Read by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM projects_reports WHERE pr_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ message: 'Not found' });
    res.send(result[0]);
  });
});



// Update
router.put('/:id', (req, res) => {
  const data = req.body;
  const sql = `UPDATE projects_reports SET ? WHERE pr_id = ?`;
  db.query(sql, [data, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Updated successfully' });
  });
});

// Delete
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM projects_reports WHERE pr_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Deleted successfully' });
  });
});

module.exports = router;
