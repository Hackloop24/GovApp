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

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(
  'mongodb+srv://prajwalinna1905:mJXlPo4EStDg0GPF@cluster0.hvl16.mongodb.net/information?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// File upload configuration using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await InfoModel.findOne({ email, password });
    if (user) {
      res.json({ message: 'Login successful', user: { email: user.email, username: user.username } });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/register', async (req, res) => {
  try {
    console.log('Received registration data:', req.body);

    const { username, email, password } = req.body;

    const existingUser = await InfoModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const newUser = await InfoModel.create({
      username,
      email,
      password
    });
    res.status(201).json({
      message: 'Registration successful',
      user: {
        email: newUser.email,
        username: newUser.username
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/report', upload.single('proof'), async (req, res) => {
  try {
    const { description, state, district, taluk, municipal, pincode } = req.body;

    if (!description || !state || !district || !taluk || !municipal || !pincode) {
      return res.status(400).json({ message: 'All fields are required' });
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

// Add the reports GET route directly to the app
app.get('/api/reports', async (req, res) => {
  try {
    const reports = await ReportModel.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports', error });
  }
});
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});