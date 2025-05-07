const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Import routes
const anggotaRoutes = require('./src/routes/anggotaRoutes');
const bukuRoutes = require('./src/routes/bukuRoutes');
const kategoriRoutes = require('./src/routes/kategoriRoutes');
const peminjamanRoutes = require('./src/routes/PeminjamanRoutes');
const petugasRoutes = require('./src/routes/PetugasRoutes');

// Use routes
app.use('/api/anggota', anggotaRoutes);
app.use('/api/buku', bukuRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/peminjaman', peminjamanRoutes);
app.use('/api/petugas', petugasRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});