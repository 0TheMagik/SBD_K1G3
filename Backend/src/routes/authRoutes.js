const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Anggota = require('../schema/Anggota');
const Petugas = require('../schema/Petugas');

// Generate JWT token
const generateToken = (user) => {
  const JWT_SECRET = process.env.JWT_SECRET || 'secret';
  return jwt.sign(
    { id: user._id, role: user.role || 'member' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Member login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const anggota = await Anggota.findOne({ email });
        if (!anggota) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // In a real application, you would use bcrypt to compare passwords
        if (anggota.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a user object without the password
        const userWithoutPassword = {
            _id: anggota._id,
            nama: anggota.nama,
            alamat: anggota.alamat,
            telepon: anggota.telepon,
            email: anggota.email,
            tanggal_daftar: anggota.tanggal_daftar,
            status: anggota.status,
            role: 'member'
        };

        // Generate JWT token
        const token = generateToken(userWithoutPassword);
        
        res.status(200).json({
            user: userWithoutPassword,
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Admin/Petugas login route
router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Attempting admin login with:", username);
        
        // Find staff by username
        const petugas = await Petugas.findOne({ username });
        if (!petugas) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        
        // In a real application, you would use bcrypt to compare passwords
        if (petugas.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a staff object without the password
        const staffWithoutPassword = {
            _id: petugas._id,
            nama: petugas.nama,
            username: petugas.username,
            role: petugas.role || 'petugas'
        };

        // Generate JWT token
        const token = generateToken(staffWithoutPassword);
        
        res.status(200).json({
            user: staffWithoutPassword,
            token
        });
    } catch (err) {
        console.error('Admin login error:', err);
        res.status(500).json({ message: err.message });
    }
});

// Registration route for members
router.post('/register', async (req, res) => {
    try {
        // Check if email already exists
        const existingAnggota = await Anggota.findOne({ email: req.body.email });
        if (existingAnggota) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        
        // Create new anggota
        const anggota = new Anggota({
            nama: req.body.nama,
            alamat: req.body.alamat,
            telepon: req.body.telepon,
            email: req.body.email,
            password: req.body.password, // In production, hash this password
            status: 'aktif'
        });
        
        const newAnggota = await anggota.save();
        
        // Remove password from response
        const anggotaResponse = newAnggota.toObject();
        delete anggotaResponse.password;
        
        res.status(201).json(anggotaResponse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Registration route for staff (admin only)
router.post('/admin/register', async (req, res) => {
    try {
        // Check if username already exists
        const existingPetugas = await Petugas.findOne({ username: req.body.username });
        if (existingPetugas) {
            return res.status(400).json({ message: 'Username already in use' });
        }
        
        // Create new petugas
        const petugas = new Petugas({
            nama: req.body.nama,
            username: req.body.username,
            password: req.body.password, // In production, hash this password
            role: req.body.role || 'petugas'
        });
        
        const newPetugas = await petugas.save();
        
        // Remove password from response
        const petugasResponse = newPetugas.toObject();
        delete petugasResponse.password;
        
        res.status(201).json(petugasResponse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;