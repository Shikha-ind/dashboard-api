const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new revenue record
router.post('/', (req, res) => {
  const {
    region, onsite_revenue, onsite_hc, offshore_revenue, offshore_hc,
    ideal_hc_nearshore, ideal_hc_offshore,
    excess_offshore, excess_nearshore,
    canada_fte, uk_fte, uk_catalog,
    ceeba_hcp, wese_catalog, canada_catalog,
    plan_of_action
  } = req.body;

  // Basic validation
  if (!region || onsite_revenue == null || onsite_hc == null || offshore_revenue == null || offshore_hc == null)  {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  const sql = 
    `INSERT INTO revenue (
      region, onsite_revenue, onsite_hc, offshore_revenue, offshore_hc,
      ideal_hc_nearshore, ideal_hc_offshore,
      excess_offshore, excess_nearshore,
      canada_fte, uk_fte, uk_catalog,
      ceeba_hcp, wese_catalog, canada_catalog,
      plan_of_action
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    region, onsite_revenue, onsite_hc, offshore_revenue, offshore_hc,
    ideal_hc_nearshore, ideal_hc_offshore,
    excess_offshore, excess_nearshore,
    canada_fte, uk_fte, uk_catalog,
    ceeba_hcp, wese_catalog, canada_catalog,
    plan_of_action
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: 'Revenue added successfully',
      rhc_id: result.insertId
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

// CORRECT ORDER
router.get('/months', (req, res) => {
  const query = `
    SELECT DISTINCT 
      DATE_FORMAT(created_at, '%Y-%m') AS value,
      DATE_FORMAT(created_at, '%M %Y') AS label
    FROM revenue
    ORDER BY value DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get all revenue data
router.get('/',  (req, res) => {
 const sql = `SELECT * FROM revenue ORDER BY rhc_id DESC`;

    db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});


// Delete a revenue record by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
    db.query('DELETE FROM revenue WHERE rhc_id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully' });
  });
  
});

// Update a revenue record by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    region, onsite_revenue, onsite_hc,
    ideal_hc_nearshore, ideal_hc_offshore,
    excess_offshore, excess_nearshore,
    canada_fte, uk_fte, uk_catalog,
    ceeba_hcp, wese_catalog, canada_catalog,
    plan_of_action
  } = req.body;

  // Basic validation example (adjust as needed)
  if (!region || onsite_revenue == null || onsite_hc == null) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  
      const sql = 
      `UPDATE revenue SET
        region = ?, onsite_revenue = ?, onsite_hc = ?,
        ideal_hc_nearshore = ?, ideal_hc_offshore = ?,
        excess_offshore = ?, excess_nearshore = ?,
        canada_fte = ?, uk_fte = ?, uk_catalog = ?,
        ceeba_hcp = ?, wese_catalog = ?, canada_catalog = ?,
        plan_of_action = ?
      WHERE rhc_id = ?`;

      const values = [
         region, onsite_revenue, onsite_hc,
        ideal_hc_nearshore, ideal_hc_offshore,
        excess_offshore, excess_nearshore,
        canada_fte, uk_fte, uk_catalog,
        ceeba_hcp, wese_catalog, canada_catalog,
        plan_of_action, id
       ]
    ;

    db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record updated successfully' });
  });
});

module.exports = router;
