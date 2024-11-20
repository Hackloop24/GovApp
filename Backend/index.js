import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import InfoModel from './models/info.js';
import reportRoutes from './reportRoutes.js';
import ReportModel from './models/ReportModel.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize app and middleware
const app = express();
app.use(express.json());
app.use(cors());

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoose.connect(
    'mongodb+srv://prajwalinna1905:mJXlPo4EStDg0GPF@cluster0.hvl16.mongodb.net/information?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
// File upload configuration using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // Save files to 'uploads' folder
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`), // Add a timestamp to filenames
});
const upload = multer({ storage });

// Ensure the 'uploads' directory exists and is accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  InfoModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json({ message: 'Login successful', user });
        } else {
          res.status(401).json({ message: 'Password Incorrect' });
        }
      } else {
        res.status(404).json({ message: 'No record exists' });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Register route
app.post('/register', (req, res) => {
  InfoModel.create(req.body)
    .then((information) => res.status(201).json(information))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Report submission route with file upload
app.post('/report', upload.single('proof'), async (req, res) => {
  try {
    const { description, state, district, taluk, municipal, pincode } = req.body;

    // Validate data
    if (!description || !state || !district || !taluk || !municipal || !pincode) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create report object
    const reportData = {
      description,
      state,
      district,
      taluk,
      municipal,
      pincode,
      proof: req.file ? req.file.path : null, // Save file path if proof exists
    };

    // Save to database
    const newReport = await ReportModel.create(reportData);

    // Return success response
    res.status(201).json({ queryNumber: newReport.queryNumber });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to save report' });
  }
});

// Use reportRoutes for other report-related operations
app.use('/api/reports', reportRoutes);

// Start the server
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
