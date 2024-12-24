const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./config/db'); // Assuming db is your MySQL connection

// Ensure 'uploads' directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Serve static files from 'uploads' folder
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST route to add a new product
router.post('/api/products', upload.single('image'), (req, res) => {
  const { productName, description, price, contactInfo, whatsappLink, category } = req.body;
  const image = req.file ? 'uploads/' + req.file.filename : null;

  if (!productName || !description || !price || !contactInfo || !category || !image) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const query = `
    INSERT INTO products (productName, description, price, contactInfo, whatsappLink, category, image)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [productName, description, price, contactInfo, whatsappLink || `https://wa.me/${contactInfo}`, category, image],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Database error.' });
      }
      res.status(201).json({ message: 'Product added successfully.' });
    }
  );
});

module.exports = router;
