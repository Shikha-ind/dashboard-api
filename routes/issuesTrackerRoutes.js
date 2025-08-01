const express = require('express');
const router = express.Router();
const db = require('../config/db');


// Utility function to safely format date (if needed)
function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (!isNaN(date)) {
    return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }
  return null;
}

// CREATE issue
router.post('/', async (req, res) => {
  try {
    const {
      region, reported_by, campaign_name, workstream, reported_date,
      ticket_no, stage, paid, likelyhood, impact,
      issue_owner, status, issue_description, mitigation_plan,
      rc_summary, created_by
    } = req.body;

    const formattedDate = formatDate(reported_date);

    const values = [
      region, reported_by, campaign_name, workstream, formattedDate,
      ticket_no, stage, paid, likelyhood, impact,
      issue_owner, status, issue_description, mitigation_plan,
      rc_summary, created_by
    ].map(value => value === undefined ? null : value); // This line fixes the error

    const sql = `
      INSERT INTO issues_tracker (
        region, reported_by, campaign_name, workstream, reported_date,
        ticket_no, stage, paid, likelyhood, impact,
        issue_owner, status, issue_description, mitigation_plan,
        rc_summary, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, values);

    res.status(201).json({ message: 'Issue created successfully' });
  } catch (err) {
    console.error('Insert failed:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});



// READ all issues
router.get('/', (req, res) => {
  db.query('SELECT * FROM issues_tracker ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// get regions
router.get('/regions', (req, res) => {
  db.query('SELECT region_name FROM region', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results.map(r => r.region_name));
  });
});

router.get('/date', (req, res) => {
  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(created_at, '%Y-%m-%d') AS value,     
      DATE_FORMAT(created_at, '%d/%m/%Y') AS label 
    FROM issues_tracker
    ORDER BY value DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CORRECT ORDER
router.get('/months', (req, res) => {
  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(created_at, '%Y-%m') AS value,
      DATE_FORMAT(created_at, '%M %Y') AS label
    FROM rca
    ORDER BY value DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// READ single issue by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM issues_tracker WHERE it_id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Issue not found' });
    res.json(results[0]);
  });
});

// UPDATE issue by ID
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const {
   region, reported_by, campaign_name, workstream, reported_date,
      ticket_no, stage, paid, likelyhood, impact,
      issue_owner, status, issue_description, mitigation_plan,
      rc_summary, created_by
  } = req.body;

  const sql = `
    UPDATE issues_tracker SET
      region=?, reported_by=?, campaign_name=?, workstream=?, reported_date=?,
      ticket_no=?, stage=?, paid=?, likelyhood=?, impact=?,
      issue_owner=?, status=?, issue_description=?, mitigation_plan=?, rc_summary=?, created_by=?
    WHERE it_id=?
  `;

  const values = [
    region, reported_by, campaign_name, workstream, reported_date,
    ticket_no, stage, paid, likelyhood, impact,
    issue_owner, status, issue_description, mitigation_plan, rc_summary, created_by,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Issue updated successfully' });
  });
});

// DELETE issue
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM issues_tracker WHERE it_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Issue deleted successfully' });
  });
});

module.exports = router;
