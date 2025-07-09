// Required modules
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const crypto = require('crypto');

const SECRET_KEY = 'mysecretkey';

// -------------------- GET ALL USERS (WITH ROLE NAME) --------------------
router.get('/', auth, (req, res) => {
  const sql = `
    SELECT users.*, user_role.role 
    FROM users 
    JOIN user_role ON users.role = user_role.role
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// -------------------- GET ALL ROLES (for UI dropdown) --------------------
router.get('/roles', (req, res) => {
  db.query('SELECT id, role FROM user_role', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// -------------------- CREATE USER --------------------
router.post('/', (req, res) => {
  const {
    id, name, empId, band, designation, region,
    emailId, emailPrid, emailAz, imageUrl, market,
    date_of_joining, password, role
  } = req.body;

  if (!password || !role)
    return res.status(400).json({ message: 'Password and role are required' });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO users (
      id, name, empId, band, designation, region,
      emailId, emailPrid, emailAz, imageUrl, market,
      date_of_joining, password, role
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id, name, empId, band, designation, region,
    emailId, emailPrid, emailAz, imageUrl, market,
    date_of_joining, hashedPassword, role
  ];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User created successfully' });
  });
});

// -------------------- UPDATE USER --------------------
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const {
    name, empId, band, designation, region,
    emailId, emailPrid, emailAz, imageUrl, market,
    date_of_joining, role
  } = req.body;

  const sql = `
    UPDATE users SET
      name = ?, empId = ?, band = ?, designation = ?, region = ?,
      emailId = ?, emailPrid = ?, emailAz = ?, imageUrl = ?, market = ?,
      date_of_joining = ?, role = ?
    WHERE id = ?
  `;

  const values = [
    name, empId, band, designation, region,
    emailId, emailPrid, emailAz, imageUrl, market,
    date_of_joining, role, id
  ];

  db.query(sql, values, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated successfully' });
  });
});

// -------------------- DELETE USER --------------------
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted successfully' });
  });
});


// -------------------- LOGIN (with role from joined table) --------------------
router.post('/login', (req, res) => {
  const { emailId, password } = req.body;

  if (!emailId || !password)
    return res.status(400).json({ message: 'Email and password are required' });

  const sql = `
    SELECT users.*, user_role.role
    FROM users 
    JOIN user_role ON users.role = user_role.role 
    WHERE users.emailId = ?
  `;

  db.query(sql, [emailId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    const user = results[0];
    if (!user) return res.status(401).json({ message: 'User not found' });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        {
          id: user.id,
          emailId: user.emailId,
          role: user.role
        },
        SECRET_KEY,
        { expiresIn: '1d' }
      );

      res.status(200).json({ token, message: 'Login successful' });
    });
  });
});


// -------------------- FORGOT PASSWORD --------------------
router.post('/forgot-password', (req, res) => {
  const { emailId } = req.body;

  if (!emailId) return res.status(400).json({ error: 'Email ID is required' });

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 3600000); // 1 hour from now

  const sql = `UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE emailId = ?`;
  db.query(sql, [token, expiry, emailId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Email ID not found' });
    }

    // Log reset link (can be emailed in real-world)
    console.log(`Reset Password Link: http://localhost:4200/reset-password/${token}`);

    res.json({ message: 'Reset link has been sent.' });
  });
});

module.exports = router;
