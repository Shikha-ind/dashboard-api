const express = require('express');
const router = express.Router();
const db = require('../config/db');

// -------------------- GET ALL TEAM MEMBERS --------------------
router.get('/', async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT * FROM team');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- ADD TEAM MEMBER --------------------
router.post('/add-team-member', async (req, res) => {
  const {
    name, empId, band, designation, region,
    emailId, emailPrid, emailAz, imageUrl, market,
    date_of_joining, role, created_by,
    skill_set_1, skill_set_2, skill_set_3,
    skill_set_4, skill_set_5, skill_set_6,
    skills = []
  } = req.body;

  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const insertTeamSql = `
    INSERT INTO team (
      name, empId, band, designation, region,
      emailId, emailPrid, emailAz, imageUrl, market,
      date_of_joining, role,
      skill_set_1, skill_set_2, skill_set_3,
      skill_set_4, skill_set_5, skill_set_6,
      created_by, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const teamValues = [
    name, empId, band, designation, region,
    emailId, emailPrid, emailAz, imageUrl, market,
    date_of_joining, role,
    skill_set_1, skill_set_2, skill_set_3,
    skill_set_4, skill_set_5, skill_set_6,
    created_by, created_at
  ];

  try {
    const [result] = await db.promise().query(insertTeamSql, teamValues);
    const teamId = result.insertId;

    if (skills.length > 0) {
      const skillSql = 'INSERT INTO team_skills (team_id, skill_name, skill_level) VALUES ?';
      const skillValues = skills.map(skill => [teamId, skill.name, skill.level]);
      await db.promise().query(skillSql, [skillValues]);
      return res.status(201).json({ message: 'Team member and skills saved successfully' });
    } else {
      return res.status(201).json({ message: 'Team member saved (no skills)' });
    }
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      const message = err.sqlMessage.includes('empId')
        ? `Employee ID '${empId}' already exists.`
        : 'Duplicate entry detected.';
      return res.status(409).json({ error: message });
    }
    res.status(500).json({ error: err.message });
  }
});

// -------------------- UPDATE TEAM MEMBER --------------------
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const {
    name, empId, band, emailId, emailAz, emailPrid,
    region, designation, imageUrl, date_of_joining, role,
    skills = []
  } = req.body;

  const updateTeamSql = `
    UPDATE team SET 
      name = ?, empId = ?, band = ?, emailId = ?, emailAz = ?, emailPrid = ?, 
      region = ?, designation = ?, imageUrl = ?, date_of_joining = ?, role = ?
    WHERE id = ?
  `;

  const teamValues = [
    name, empId, band, emailId, emailAz, emailPrid,
    region, designation, imageUrl, date_of_joining, role,
    id
  ];

  try {
    await db.promise().query(updateTeamSql, teamValues);

    if (Array.isArray(skills) && skills.length > 0) {
      await db.promise().query('DELETE FROM team_skills WHERE team_id = ?', [id]);

      const insertSkillSql = 'INSERT INTO team_skills (team_id, skill_name, skill_level) VALUES ?';
      const skillValues = skills.map(skill => [id, skill.name, skill.level]);

      await db.promise().query(insertSkillSql, [skillValues]);

      return res.json({ message: 'Team member and skills updated successfully' });
    }

    res.json({ message: 'Team member updated (no skill changes)' });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: err.message });
  }
});

// -------------------- DELETE TEAM MEMBER --------------------
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.promise().query('DELETE FROM team WHERE id = ?', [id]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET TEAM MEMBER SKILLS --------------------
router.get('/skills/:teamId', async (req, res) => {
  const teamId = req.params.teamId;
  try {
    const [result] = await db.promise().query(
      'SELECT skill_name AS name, skill_level AS level FROM team_skills WHERE team_id = ?',
      [teamId]
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- GET REGION LIST --------------------
router.get('/region', async (req, res) => {
  try {
    const [results] = await db.promise().query('SELECT region_name FROM region');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------- CHECK DUPLICATE EMP ID --------------------
router.get('/check-empid/:empId', async (req, res) => {
  const empId = req.params.empId;
  try {
    const [rows] = await db.promise().query('SELECT * FROM team WHERE empId = ?', [empId]);
    res.json(rows.length > 0);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
