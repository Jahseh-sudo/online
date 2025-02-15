require("dotenv").config(); // Load environment variables
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// **Export for Vercel**
module.exports = app;
