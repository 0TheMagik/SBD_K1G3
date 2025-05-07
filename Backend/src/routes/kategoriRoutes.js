const express = require('express');
const router = express.Router();
const kategoriRepo = require('../repositories/repo.kategori'); // Import the repository

// GET all kategori
router.get('/', async (req, res) => {
    try {
        const kategoriList = await kategoriRepo.getAllKategori();
        res.status(200).json(kategoriList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single kategori by ID
router.get('/:id', async (req, res) => {
    try {
        const kategori = await kategoriRepo.getKategoriById(req.params.id);
        if (!kategori) return res.status(404).json({ message: 'Kategori not found' });
        res.status(200).json(kategori);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new kategori
router.post('/', async (req, res) => {
    try {
        const newKategori = await kategoriRepo.createKategori(req.body);
        res.status(201).json(newKategori);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a kategori by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedKategori = await kategoriRepo.updateKategoriById(req.params.id, req.body);
        if (!updatedKategori) return res.status(404).json({ message: 'Kategori not found' });
        res.status(200).json(updatedKategori);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a kategori by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedKategori = await kategoriRepo.deleteKategoriById(req.params.id);
        if (!deletedKategori) return res.status(404).json({ message: 'Kategori not found' });
        res.status(200).json({ message: 'Kategori deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;