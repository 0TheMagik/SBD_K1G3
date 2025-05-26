const express = require('express');
const router = express.Router();
const ratingRepository = require('../repositories/repo.rating');

router.get('/', async (req, res) => {
    try {
        const ratings = await ratingRepository.getAllRatings();
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rating = await ratingRepository.getRatingById(req.params.id);
        if (!rating) return res.status(404).json({ message: 'Rating not found' });
        res.status(200).json(rating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/review', async (req, res) => {
    try {
        const newRating = await ratingRepository.createRating(req.body);
        res.status(201).json(newRating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/review/:id', async (req, res) => {
    try {
        const updatedRating = await ratingRepository.updateRatingById(req.params.id, req.body);
        if (!updatedRating) return res.status(404).json({ message: 'Rating not found' });
        res.status(200).json(updatedRating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
