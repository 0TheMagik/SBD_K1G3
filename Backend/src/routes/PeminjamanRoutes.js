const express = require('express');
const router = express.Router();
const Peminjaman = require('../schema/Peminjaman');
const Buku = require('../schema/Buku');
const { authenticateToken } = require('../middleware/authMiddleware');

// Apply authentication to all routes
router.use(authenticateToken);

// Get all peminjaman
router.get('/', async (req, res) => {
    try {
        const peminjaman = await Peminjaman.find();
        res.json(peminjaman);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific peminjaman
router.get('/:id', async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findById(req.params.id);
        if (!peminjaman) {
            return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
        }
        res.json(peminjaman);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new peminjaman request
router.post('/', async (req, res) => {
    try {
        // Check if book is available
        const book = await Buku.findById(req.body.id_buku);
        if (!book) {
            return res.status(404).json({ message: 'Buku tidak ditemukan' });
        }
        
        if (book.tersedia === 'tidak tersedia') {
            return res.status(400).json({ message: 'Buku tidak tersedia untuk dipinjam' });
        }
        
        // Create new peminjaman with 'requested' status
        const peminjaman = new Peminjaman({
            id_anggota: req.body.id_anggota,
            id_buku: req.body.id_buku,
            status: 'requested'
        });
        
        const newPeminjaman = await peminjaman.save();
        res.status(201).json(newPeminjaman);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a peminjaman (for status changes)
router.put('/:id', async (req, res) => {
    try {
        const updatedPeminjaman = await Peminjaman.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        
        if (!updatedPeminjaman) {
            return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
        }
        
        res.json(updatedPeminjaman);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a peminjaman (for rejecting requests)
router.delete('/:id', async (req, res) => {
    try {
        const peminjaman = await Peminjaman.findById(req.params.id);
        if (!peminjaman) {
            return res.status(404).json({ message: 'Peminjaman tidak ditemukan' });
        }
        
        await Peminjaman.findByIdAndDelete(req.params.id);
        res.json({ message: 'Peminjaman dihapus' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;