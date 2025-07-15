const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'dashboard',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // Exit on failure
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = connection;
