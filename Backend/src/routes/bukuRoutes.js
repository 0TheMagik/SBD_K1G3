const express = require('express');
const router = express.Router();
const bukuRepo = require('../repositories/repo.buku'); // Import the repository

// GET all buku
router.get('/', async (req, res) => {
    try {
        const bukuList = await bukuRepo.getAllBuku();
        res.status(200).json(bukuList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single buku by ID
router.get('/:id', async (req, res) => {
    try {
        const buku = await bukuRepo.getBukuById(req.params.id);
        if (!buku) return res.status(404).json({ message: 'Buku not found' });
        res.status(200).json(buku);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new buku
router.post('/', async (req, res) => {
    try {
        const newBuku = await bukuRepo.createBuku(req.body);
        res.status(201).json(newBuku);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a buku by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBuku = await bukuRepo.updateBukuById(req.params.id, req.body);
        if (!updatedBuku) return res.status(404).json({ message: 'Buku not found' });
        res.status(200).json(updatedBuku);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a buku by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBuku = await bukuRepo.deleteBukuById(req.params.id);
        if (!deletedBuku) return res.status(404).json({ message: 'Buku not found' });
        res.status(200).json({ message: 'Buku deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;