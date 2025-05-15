const express = require('express');
const router = express.Router();
const bukuRepo = require('../repositories/repo.buku'); // Import the repository
const Buku = require('../schema/Buku'); // Import the Buku schema

// GET all buku
router.get('/', async (req, res) => {
    try {
        const bukuList = await bukuRepo.getAllBuku();
        res.status(200).json(bukuList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET popular books
router.get('/popular', async (req, res) => {
    try {
        const popularBooks = await Buku.find().sort({ count: -1 }).limit(10); // Sort by count (descending)
        res.status(200).json(popularBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET random books
router.get('/random', async (req, res) => {
    try {
        const randomBooks = await Buku.aggregate([{ $sample: { size: 10 } }]); // Fetch 10 random books
        res.status(200).json(randomBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET terbaru books
router.get('/terbaru', async (req, res) => {
    try {
        const terbaruBooks = await Buku.find().sort({ _id: -1 }).limit(10); // Sort by creation date (descending)
        res.status(200).json(terbaruBooks);
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