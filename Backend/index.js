import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import InfoModel from './models/info.js'; // Ensure this model is correctly defined
import ReportModel from './models/ReportModel.js'; // Ensure this model is correctly defined
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize app and middleware
const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB Connection
mongoose.connect('mongodb+srv://prajwalinna1905:mJXlPo4EStDg0GPF@cluster0.hvl16.mongodb.net/information?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// File upload configuration using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await InfoModel.findOne({ email });
    if (user && user.password === password) { // Compare plain text passwords
      res.json({
        message: 'Login successful',
        user: {
          email: user.email,
          username: user.username,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Something went wrong during login' });
  }
});

// Register Endpoint
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await InfoModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Save the user (without password hashing)
    const newUser = new InfoModel({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Something went wrong during registration' });
  }
});

// Report Submission Endpoint
app.post('/report', upload.single('proof'), async (req, res) => {
  const { description, state, district, taluk, municipal, pincode } = req.body;

  try {
    if (!description || !state || !district || !taluk || !municipal || !pincode) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const reportData = {
      description,
      state,
      district,
      taluk,
      municipal,
      pincode,
      proof: req.file ? req.file.path : null,
    };

    const newReport = await ReportModel.create(reportData);
    res.status(201).json({ queryNumber: newReport._id });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ error: 'Failed to save report' });
  }
});

// Get All Reports Endpoint
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports', error });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
