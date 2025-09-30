// routes/reports.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new weekly report
router.post('/', (req, res) => {
  const {
    region,
    project_count,
    quality_issue,
    timeline_issue,
    remark,
    issue_description,
    remediation_steps,
    created_by  // <-- Expect this from req.body
  } = req.body;

  if (!created_by) {
    return res.status(400).json({ error: 'created_by is required' });
  }

  const sql = `
    INSERT INTO weekly_report 
    (region, project_count, quality_issue, timeline_issue, remark, issue_description, remediation_steps, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    region,
    project_count,
    quality_issue,
    timeline_issue,
    remark,
    issue_description,
    remediation_steps,
    created_by
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting report:', err);
      return res.status(500).json({ error: 'Failed to insert report' });
    }
    res.status(201).json({ message: 'Report created successfully', reportId: result.insertId });
  });
});

// get regions
router.get('/regions', (req, res) => {
  db.query('SELECT region_name FROM region', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.region_name));
  });
});

// Get all reports
router.get('/', (req, res) => {
  db.query('SELECT * FROM weekly_report ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Error fetching reports:', err);
      return res.status(500).json({ error: 'Failed to fetch reports' });
    }
    res.json(results);
  });
});

module.exports = router;
