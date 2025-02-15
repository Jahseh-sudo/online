const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Replace with your MySQL username
  password: 'Spydeer8@',  // Replace with your MySQL password
  database: 'campus_trade', // Environment variable for database name
});

// Connect to the Database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// API Route: Add a product
app.post('/api/products', (req, res) => {
  const { productName, description, price, contactInfo, whatsappLink, category, image } = req.body;

  // Validate input
  if (!productName || !description || !price || !contactInfo || !whatsappLink || !category || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // SQL Query to insert a product
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
    res.status(200).json({ message: 'Product added successfully', productId: result.insertId });
  });
});

// API Route: Get all products
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

// API Route: Get a single product by ID
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

// API Route: Delete a product by ID
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

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
