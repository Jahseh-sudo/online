require("dotenv").config(); // Load environment variables
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// **Load Environment Variables**
const PORT = process.env.PORT || 5000;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error("❌ Missing required environment variables.");
  process.exit(1);
}

// **MySQL Database Connection**
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection error:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database");
});

// **API Routes**
app.post("/api/products", (req, res) => {
  const { productName, description, price, contactInfo, whatsappLink, category, image } = req.body;

  if (!productName || !description || !price || !contactInfo || !whatsappLink || !category || !image) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `
    INSERT INTO products (productName, description, price, contactInfo, whatsappLink, category, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [productName, description, price, contactInfo, whatsappLink, category, image];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("❌ Error adding product:", err);
      return res.status(500).json({ message: "Failed to add product" });
    }
    res.status(201).json({ message: "Product added successfully", productId: result.insertId });
  });
});

// **404 Route Handling**
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// **Start the Server**
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// **Export for Vercel**
module.exports = app;
