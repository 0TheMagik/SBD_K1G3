const express = require('express');
const router = express.Router();
const anggotaRepo = require('../repositories/repo.anggota'); // Import the repository

// GET all anggota
router.get('/', async (req, res) => {
    try {
        const anggotaList = await anggotaRepo.getAllAnggota();
        res.status(200).json(anggotaList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single anggota by ID
router.get('/:id', async (req, res) => {
    try {
        const anggota = await anggotaRepo.getAnggotaById(req.params.id);
        if (!anggota) return res.status(404).json({ message: 'Anggota not found' });
        res.status(200).json(anggota);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new anggota
router.post('/', async (req, res) => {
    try {
        const newAnggota = await anggotaRepo.createAnggota(req.body);
        res.status(201).json(newAnggota);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update an anggota by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedAnggota = await anggotaRepo.updateAnggotaById(req.params.id, req.body);
        if (!updatedAnggota) return res.status(404).json({ message: 'Anggota not found' });
        res.status(200).json(updatedAnggota);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE an anggota by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedAnggota = await anggotaRepo.deleteAnggotaById(req.params.id);
        if (!deletedAnggota) return res.status(404).json({ message: 'Anggota not found' });
        res.status(200).json({ message: 'Anggota deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;