const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST, // MySQL host
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_NAME, // Database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API Routes

// Add a Product
app.post('/api/products', (req, res) => {
  const { productName, description, price, contactInfo, whatsappLink, category, image } = req.body;

  // Validate input
  if (!productName || !description || !price || !contactInfo || !whatsappLink || !category || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `
    INSERT INTO products (productName, description, price, contactInfo, whatsappLink, category, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [productName, description, price, contactInfo, whatsappLink, category, image];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({ message: 'Failed to add product' });
    }
    res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
  });
});

// Get All Products
app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
    res.status(200).json({ products: results });
  });
});

// Get a Product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM products WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ message: 'Failed to fetch product' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product: results[0] });
  });
});

// Delete a Product by ID
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM products WHERE id = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).json({ message: 'Failed to delete product' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
});

// Export the app for Vercel
module.exports = app;
