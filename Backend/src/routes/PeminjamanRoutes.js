const express = require('express');
const router = express.Router();
const peminjamanRepo = require('../repositories/repo.peminjaman'); // Import the repository

// GET all peminjaman
router.get('/', async (req, res) => {
    try {
        const peminjamanList = await peminjamanRepo.getAllPeminjaman();
        res.status(200).json(peminjamanList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single peminjaman by ID
router.get('/:id', async (req, res) => {
    try {
        const peminjaman = await peminjamanRepo.getPeminjamanById(req.params.id);
        if (!peminjaman) return res.status(404).json({ message: 'Peminjaman not found' });
        res.status(200).json(peminjaman);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new peminjaman
router.post('/', async (req, res) => {
    try {
        const newPeminjaman = await peminjamanRepo.createPeminjaman(req.body);
        res.status(201).json(newPeminjaman);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a peminjaman by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPeminjaman = await peminjamanRepo.updatePeminjamanById(req.params.id, req.body);
        if (!updatedPeminjaman) return res.status(404).json({ message: 'Peminjaman not found' });
        res.status(200).json(updatedPeminjaman);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a peminjaman by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPeminjaman = await peminjamanRepo.deletePeminjamanById(req.params.id);
        if (!deletedPeminjaman) return res.status(404).json({ message: 'Peminjaman not found' });
        res.status(200).json({ message: 'Peminjaman deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;