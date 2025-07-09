const express = require('express');
const router = express.Router();
const db = require('../config/db');
//const verifyToken = require('../middleware/teamverifyRole'); // 

// Display all team data 
router.get('/', (req, res) => {
  db.query('SELECT * FROM team', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// POST: Add new team member (only allowed for verified JWTs)
// -------------------- ADD TEAM MEMBER --------------------
// router.post('/add-team-member', (req, res) => {
//   const {
//     // No `id` field if it's AUTO_INCREMENT
//     name, empId, band, designation, region,
//     emailId, emailPrid, emailAz, imageUrl, market,
//     date_of_joining, role,
//     skill_set_1, skill_set_2, skill_set_3,
//     skill_set_4, skill_set_5, skill_set_6,
//     created_by
//   } = req.body;
//    const skills = JSON.parse(req.body.skills || '[]');
//   const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

//   const sql = `
//     INSERT INTO team (
//       name, empId, band, designation, region,
//       emailId, emailPrid, emailAz, imageUrl, market,
//       date_of_joining, role,
//       skill_set_1, skill_set_2, skill_set_3,
//       skill_set_4, skill_set_5, skill_set_6,
//       created_by, created_at
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     name, empId, band, designation, region,
//     emailId, emailPrid, emailAz, imageUrl, market,
//     date_of_joining, role,
//     skill_set_1, skill_set_2, skill_set_3,
//     skill_set_4, skill_set_5, skill_set_6,
//     created_by, created_at
//   ];

//   db.query(sql, values, (err) => {
//     if (err) {
//       if (err.code === 'ER_DUP_ENTRY') {
//         const isEmpIdDuplicate = err.sqlMessage.includes('empId');
//         const message = isEmpIdDuplicate
//           ? `Employee ID '${empId}' already exists.`
//           : 'Duplicate entry detected.';
//         return res.status(409).json({ error: message });
//       }
//       return res.status(500).json({ error: err.message });
//     }

//     res.status(201).json({ message: 'Team member added successfully' });
//   });
//   // Insert skills if provided
//     if (skills.length > 0) {
//       const skillSql = 'INSERT INTO team_skills (team_id, skill_name, skill_level) VALUES ?';
//       const skillValues = skills.map(skill => [teamId, skill.name, skill.level]);

//       db.query(skillSql, [skillValues], (err) => {
//         if (err) {
//           console.error('Insert skills error:', err);
//           return res.status(500).json({ error: 'Failed to insert skills' });
//         }
//         res.json({ message: 'Team member and skills saved successfully' });
//       });
//     } else {
//       res.json({ message: 'Team member saved (no skills)' });
//     }
// });
router.post('/add-team-member', (req, res) => {
  const {
    name, empId, band, designation, region,
    emailId, emailPrid, emailAz, imageUrl, market,
    date_of_joining, role,
    skill_set_1, skill_set_2, skill_set_3,
    skill_set_4, skill_set_5, skill_set_6,
    created_by
  } = req.body;

  const skills = Array.isArray(req.body.skills)
    ? req.body.skills
    : JSON.parse(req.body.skills || '[]');

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

  db.query(insertTeamSql, teamValues, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        const isEmpIdDuplicate = err.sqlMessage.includes('empId');
        const message = isEmpIdDuplicate
          ? `Employee ID '${empId}' already exists.`
          : 'Duplicate entry detected.';
        return res.status(409).json({ error: message });
       // return res.status(409).send('Employee ID already exists');

      }
      return res.status(500).json({ error: err.message });
    }

    const teamId = result.insertId;

    // Insert skills if provided
    if (skills.length > 0) {
      const skillSql = 'INSERT INTO team_skills (team_id, skill_name, skill_level) VALUES ?';
      const skillValues = skills.map(skill => [teamId, skill.name, skill.level]);

      db.query(skillSql, [skillValues], (skillErr) => {
        if (skillErr) {
          console.error('Insert skills error:', skillErr);
          return res.status(500).json({ error: 'Failed to insert skills' });
        }
        return res.status(201).json({ message: 'Team member and skills saved successfully' });
      });
    } else {
      return res.status(201).json({ message: 'Team member saved (no skills)' });
    }
  });
});

// get skill
router.get('/skills/:teamId', (req, res) => {
  const teamId = req.params.teamId;
  const sql = 'SELECT skill_name AS name, skill_level AS level FROM team_skills WHERE team_id = ?';

  db.query(sql, [teamId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

  // Deleted selected data
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM team WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted successfully' });
  });
});

// update the selected profile
// router.put('/:id', (req, res) => {
//   const id = req.params.id;
//   const data = req.body;

//   const sql = `
//     UPDATE team SET 
//       name = ?, empId = ?, band = ?, emailId = ?, emailAz = ?, emailPrid = ?, 
//       region = ?, designation = ?, imageUrl = ?, date_of_joining = ?, role = ?
//     WHERE id = ?
//   `;

//   const values = [
//     data.name, data.empId, data.band, data.emailId, data.emailAz, data.emailPrid,
//     data.region, data.designation, data.imageUrl, data.date_of_joining, data.role,
//     id
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Update error:", err);
//       return res.status(500).json({ error: err.message });
//     }
//     res.json({ message: 'Team member updated successfully' });
//   });
// });

router.put('/:id', (req, res) => {
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

  db.query(updateTeamSql, teamValues, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: err.message });
    }

    //  Update skills only if provided
    if (Array.isArray(skills) && skills.length > 0) {
      const deleteSkillSql = 'DELETE FROM team_skills WHERE team_id = ?';

      db.query(deleteSkillSql, [id], (deleteErr) => {
        if (deleteErr) {
          console.error('Failed to delete old skills:', deleteErr);
          return res.status(500).json({ error: 'Failed to update skills' });
        }

        const insertSkillSql = 'INSERT INTO team_skills (team_id, skill_name, skill_level) VALUES ?';
        const skillValues = skills.map(skill => [id, skill.name, skill.level]);

        db.query(insertSkillSql, [skillValues], (insertErr) => {
          if (insertErr) {
            console.error('Failed to insert updated skills:', insertErr);
            return res.status(500).json({ error: 'Failed to insert updated skills' });
          }

          return res.json({ message: 'Team member and skills updated successfully' });
        });
      });

    } else {
      // No skill update
      return res.json({ message: 'Team member updated (no skill changes)' });
    }
  });
});





// -------------------- GET ALL region (for UI dropdown) --------------------
router.get('/region', (req, res) => {
  db.query('SELECT region_name FROM region;', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results); // [{ region_name: 'UK' }, { region_name: 'US' }]
  });
});

// duplicate emp ID
router.get('/check-empid/:empId', async (req, res) => {
  const empId = req.params.empId;

  try {
    const [rows] = await db.query('SELECT * FROM team WHERE empId = ?', [empId]);
    const exists = rows.length > 0;
    res.json(exists);  // IMPORTANT: must return `true` or `false`
  } catch (error) {
    console.error('Error checking empId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;
