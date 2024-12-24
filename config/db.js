// config/db.js

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',        // Replace with your database host
  user: 'root',             // Replace with your database user
  password: 'Spydeer8@',     // Replace with your database password
  database: 'campus_trade', // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export the pool object for use in other files
module.exports = pool.promise(); // We use .promise() to return promises for async/await
