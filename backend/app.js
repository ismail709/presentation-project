const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Allow cross-origin requests from the frontend
app.use(cors());

// Set up multer storage (where to store uploaded files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// Serve images statically from the "uploads" folder
app.use('/uploads', express.static('uploads'));

// Endpoint to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json(req.file.filename); // Return the image filename
});

// Endpoint to get all uploaded images
app.get('/images', (req, res) => {
  const fs = require('fs');
  const path = './uploads';
  const files = fs.readdirSync(path);
  res.json(files); // Send list of uploaded images
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
