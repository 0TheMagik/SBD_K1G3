const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { authenticateToken, isStaff } = require('./src/middleware/authMiddleware');
require('dotenv').config(); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

// Import routes
const anggotaRoutes = require('./src/routes/anggotaRoutes');
const bukuRoutes = require('./src/routes/bukuRoutes');
const kategoriRoutes = require('./src/routes/kategoriRoutes');
const peminjamanRoutes = require('./src/routes/PeminjamanRoutes');
const petugasRoutes = require('./src/routes/PetugasRoutes');
const authRoutes = require('./src/routes/authRoutes');

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});