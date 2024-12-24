const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost', // Your MySQL host (localhost for local machine)
  user: 'root', // Your MySQL username
  password: 'Spydeer8@', // Your MySQL password
  database: 'campus_trade', // The database name
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Route: Add a product
api.post('/api/products', upload.single('image'), (req, res) => {
  console.log('Request Body:', req.body);  // Log the form data
  console.log('Uploaded File:', req.file);  // Log the image file

  const { productName, description, price, contactInfo, whatsappLink, image, category } = req.body;

  // Validate input
  if (!productName || !description || !price || !contactInfo || !image || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // SQL Query to insert a product
  const query = `
    INSERT INTO products (productName, description, price, contactInfo, whatsappLink, image, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [productName, description, price, contactInfo, whatsappLink, image, category];

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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
