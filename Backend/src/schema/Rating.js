const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    reviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Anggota' },
    book_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Buku' },
    score: { type: Number, min: 1, max: 5 },
    Comment: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);