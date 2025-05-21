const express = require('express');
const router = express.Router();
const Anggota = require('../schema/Anggota');

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const anggota = await Anggota.findOne({ email });
        if (!anggota) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // In a real application, you should use bcrypt to compare passwords
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
            status: anggota.status
        };

        // In a real application, you would generate a JWT token
        const token = "dummy-token";  // For now, using a dummy token
        
        res.status(200).json({
            user: userWithoutPassword,
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;