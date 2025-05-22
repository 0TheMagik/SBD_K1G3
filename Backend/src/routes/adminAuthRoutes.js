const express = require('express');
const router = express.Router();
const Petugas = require('../schema/Petugas');

// Admin/Petugas login endpoint
router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find petugas by username
        const petugas = await Petugas.findOne({ username });
        if (!petugas) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check password (in a production app, use bcrypt to compare hashed passwords)
        if (petugas.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a user object without sensitive data
        const userWithoutPassword = {
            _id: petugas._id,
            nama: petugas.nama,
            username: petugas.username,
            role: petugas.role
        };

        // In a real application, generate a JWT token
        const token = "admin-dummy-token";
        
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