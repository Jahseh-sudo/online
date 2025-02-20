require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// **MySQL Database Connection**
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// **Handle MySQL Connection Errors**
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// **API Route Example**
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// **Export Express App for Vercel**
module.exports = app;
