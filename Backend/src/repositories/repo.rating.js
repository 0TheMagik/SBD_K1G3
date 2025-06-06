const Rating = require('../schema/Rating');
const mongoose = require('mongoose');

// Create a new rating
exports.createRating = async (data) => {
    try {
        const rating = new Rating(data);
        return await rating.save();
    } catch (error) {
        throw new Error(`Error creating rating: ${error.message}`);
    }
};

// Get all ratings
exports.getAllRatings = async () => {
    try {
        return await Rating.find({}).populate('reviewer_id book_id');
    } catch (error) {
        throw new Error(`Error fetching ratings: ${error.message}`);
    }
};

// Get rating by ID
exports.getRatingById = async (id) => {
    try {
        return await Rating.findById(id).populate('reviewer_id book_id');
    } catch (error) {
        throw new Error(`Error fetching rating by ID: ${error.message}`);
    }
};

// Update rating by ID
exports.updateRatingById = async (id, data) => {
    try {
        const updated = await Rating.findByIdAndUpdate(id, data, { new: true });
        if (!updated) {
            throw new Error('Rating not found');
        }
        return updated;
    }
    catch (error) {
        throw new Error(`Error updating rating by ID: ${error.message}`);
    }
}

// Get average rating for a book
exports.getAverageRating = async (bookId) => {
    try {
        const result = await Rating.aggregate([
            { $match: { book_id: new mongoose.Types.ObjectId(bookId) } },
            {
                $group: {
                    _id: '$book_id',
                    averageScore: { $avg: '$score' },
                    totalRatings: { $sum: 1 }
                }
            }
        ]);

        if (result.length === 0) {
            // Return an object directly instead of trying to call json()
            return { averageScore: 0, totalRatings: 0 };
        }

        return result[0];
    } catch (err) {
        throw new Error(`Error calculating average rating: ${err.message}`);
    }
};