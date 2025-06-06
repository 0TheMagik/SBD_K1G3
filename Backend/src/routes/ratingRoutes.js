const express = require('express');
const router = express.Router();
const ratingRepository = require('../repositories/repo.rating');
const { authenticateToken } = require('../middleware/authMiddleware');
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
        console.log("Rating request received (auth bypassed for testing):", req.body);
        
        // Ensure we have the required fields
        if (!req.body.reviewer_id || !req.body.book_id || !req.body.score) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newRating = await ratingRepository.createRating(req.body);
        res.status(201).json(newRating);
    } catch (error) {
        console.error('Rating error:', error);
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

router.get('/average/:bookId', async (req, res) => {
    try {
        const averageRating = await ratingRepository.getAverageRating(req.params.bookId);
        res.status(200).json(averageRating);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;