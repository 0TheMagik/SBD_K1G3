const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { authenticateToken, isStaff } = require('./src/middleware/authMiddleware');
require('dotenv').config(); 

// Import routes
const anggotaRoutes = require('./src/routes/anggotaRoutes');
const bukuRoutes = require('./src/routes/bukuRoutes');
const kategoriRoutes = require('./src/routes/kategoriRoutes');
const peminjamanRoutes = require('./src/routes/PeminjamanRoutes');
const petugasRoutes = require('./src/routes/PetugasRoutes');
const authRoutes = require('./src/routes/authRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const ratingRoutes = require('./src/routes/ratingRoutes');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }))


app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});


// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/buku/terbaru', bukuRoutes); // Allow public access to browse books
app.use('/api/buku/popular', bukuRoutes); 
app.use('/api/buku/random', bukuRoutes);
app.use('/api/buku', bukuRoutes); // For GET requests only

// Protected routes for staff only
app.use('/api/petugas', authenticateToken, isStaff, petugasRoutes);
// Protected routes requiring authentication
app.use('/api/anggota', authenticateToken, anggotaRoutes);
app.use('/api/kategori', authenticateToken, kategoriRoutes);
app.use('/api/peminjaman', authenticateToken, peminjamanRoutes);
app.use('/api/rating', authenticateToken, ratingRoutes); // Rating routes

app.use('/api/upload', uploadRoutes); // Upload route

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});