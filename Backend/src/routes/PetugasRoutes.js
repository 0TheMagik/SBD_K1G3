const express = require('express');
const router = express.Router();
const petugasRepo = require('../repositories/repo.petugas'); // Import the repository

// GET all petugas
router.get('/', async (req, res) => {
    try {
        const petugasList = await petugasRepo.getAllPetugas();
        res.status(200).json(petugasList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single petugas by ID
router.get('/:id', async (req, res) => {
    try {
        const petugas = await petugasRepo.getPetugasById(req.params.id);
        if (!petugas) return res.status(404).json({ message: 'Petugas not found' });
        res.status(200).json(petugas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new petugas
router.post('/', async (req, res) => {
    try {
        const newPetugas = await petugasRepo.createPetugas(req.body);
        res.status(201).json(newPetugas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT to update a petugas by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPetugas = await petugasRepo.updatePetugasById(req.params.id, req.body);
        if (!updatedPetugas) return res.status(404).json({ message: 'Petugas not found' });
        res.status(200).json(updatedPetugas);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a petugas by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPetugas = await petugasRepo.deletePetugasById(req.params.id);
        if (!deletedPetugas) return res.status(404).json({ message: 'Petugas not found' });
        res.status(200).json({ message: 'Petugas deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;