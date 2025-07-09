const mysql = require('mysql2');
require('dotenv').config(); // <-- Important: loads variables from .env

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Shikha@123',
  database: process.env.DB_DATABASE || 'dashboard'
});

connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    throw err;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
