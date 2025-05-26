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
        const limit = req.query.limit ? parseInt(req.query.limit) : 6;
        
        // First try to get books from rating collection
        const Rating = require('../schema/Rating');
        
        // Aggregate ratings to get average scores
        const bookRatings = await Rating.aggregate([
            { 
                $group: {
                    _id: "$book_id",
                    averageRating: { $avg: "$score" },
                    ratingCount: { $sum: 1 }
                }
            },
            { $sort: { averageRating: -1, ratingCount: -1 } },
            { $limit: limit }
        ]);
        
        // Get book details for the top-rated books
        const bookIds = bookRatings.map(item => item._id);
        const books = await require('../repositories/repo.buku').getBukuByIds(bookIds);
        
        // Combine rating data with book data
        const booksWithRatings = books.map(book => {
            const ratingInfo = bookRatings.find(r => r._id.toString() === book._id.toString());
            return {
                ...book.toObject(),
                rating: ratingInfo ? ratingInfo.averageRating : null,
                ratingCount: ratingInfo ? ratingInfo.ratingCount : 0
            };
        });
        
        res.status(200).json(booksWithRatings);
    } catch (err) {
        console.error('Error in /popular:', err);
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

router.get('/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const books = await bukuRepo.getBukuByKategori(categoryId);
        
        // Add ratings data if available
        const Rating = require('../schema/Rating');
        const bookIds = books.map(book => book._id);
        
        // Get ratings for these books
        const ratings = await Rating.aggregate([
            { 
                $match: { book_id: { $in: bookIds } }
            },
            { 
                $group: {
                    _id: "$book_id",
                    averageRating: { $avg: "$score" },
                    ratingCount: { $sum: 1 }
                }
            }
        ]);
        
        // Combine book data with ratings
        const booksWithRatings = books.map(book => {
            const ratingInfo = ratings.find(r => r._id.toString() === book._id.toString());
            return {
                ...book.toObject(),
                rating: ratingInfo ? ratingInfo.averageRating : null,
                ratingCount: ratingInfo ? ratingInfo.ratingCount : 0
            };
        });
        
        res.status(200).json(booksWithRatings);
    } catch (err) {
        console.error('Error fetching books by category:', err);
        res.status(500).json({ message: err.message });
    }
});

// Also add a route to get category by name for user-friendly URLs
router.get('/category-name/:name', async (req, res) => {
    try {
        const categoryName = req.params.name;
        const kategoriRepo = require('../repositories/repo.kategori');
        const category = await kategoriRepo.getKategoriByName(categoryName);
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        const books = await bukuRepo.getBukuByKategori(category._id);
        
        // Add ratings data if available
        const Rating = require('../schema/Rating');
        const bookIds = books.map(book => book._id);
        
        // Get ratings for these books
        const ratings = await Rating.aggregate([
            { 
                $match: { book_id: { $in: bookIds } }
            },
            { 
                $group: {
                    _id: "$book_id",
                    averageRating: { $avg: "$score" },
                    ratingCount: { $sum: 1 }
                }
            }
        ]);
        
        // Combine book data with ratings
        const booksWithRatings = books.map(book => {
            const ratingInfo = ratings.find(r => r._id.toString() === book._id.toString());
            return {
                ...book.toObject(),
                rating: ratingInfo ? ratingInfo.averageRating : null,
                ratingCount: ratingInfo ? ratingInfo.ratingCount : 0
            };
        });
        
        res.status(200).json({
            category,
            books: booksWithRatings
        });
    } catch (err) {
        console.error('Error fetching category by name:', err);
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

// GET top rated books
router.get('/top-rated', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const minRatings = req.query.minRatings ? parseInt(req.query.minRatings) : 3;
        
        const topRatedBooks = await bukuRepo.getTopRatedBooks(limit, minRatings);
        res.status(200).json(topRatedBooks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/category/:id', async (req, res) => {
    try {
        const categoryId = req.params.id;
        const books = await bukuRepo.getBukuByKategori(categoryId);
        
        // Add ratings data if available
        const Rating = require('../schema/Rating');
        const bookIds = books.map(book => book._id);
        
        // Get ratings for these books
        const ratings = await Rating.aggregate([
            { 
                $match: { book_id: { $in: bookIds } }
            },
            { 
                $group: {
                    _id: "$book_id",
                    averageRating: { $avg: "$score" },
                    ratingCount: { $sum: 1 }
                }
            }
        ]);
        
        // Combine book data with ratings
        const booksWithRatings = books.map(book => {
            const ratingInfo = ratings.find(r => r._id.toString() === book._id.toString());
            return {
                ...book.toObject(),
                rating: ratingInfo ? ratingInfo.averageRating : null,
                ratingCount: ratingInfo ? ratingInfo.ratingCount : 0
            };
        });
        
        res.status(200).json(booksWithRatings);
    } catch (err) {
        console.error('Error fetching books by category:', err);
        res.status(500).json({ message: err.message });
    }
});

// Also add a route to get category by name for user-friendly URLs
router.get('/category-name/:name', async (req, res) => {
    try {
        const categoryName = req.params.name;
        const kategoriRepo = require('../repositories/repo.kategori');
        const category = await kategoriRepo.getKategoriByName(categoryName);
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        const books = await bukuRepo.getBukuByKategori(category._id);
        
        // Add ratings data if available
        const Rating = require('../schema/Rating');
        const bookIds = books.map(book => book._id);
        
        // Get ratings for these books
        const ratings = await Rating.aggregate([
            { 
                $match: { book_id: { $in: bookIds } }
            },
            { 
                $group: {
                    _id: "$book_id",
                    averageRating: { $avg: "$score" },
                    ratingCount: { $sum: 1 }
                }
            }
        ]);
        
        // Combine book data with ratings
        const booksWithRatings = books.map(book => {
            const ratingInfo = ratings.find(r => r._id.toString() === book._id.toString());
            return {
                ...book.toObject(),
                rating: ratingInfo ? ratingInfo.averageRating : null,
                ratingCount: ratingInfo ? ratingInfo.ratingCount : 0
            };
        });
        
        res.status(200).json({
            category,
            books: booksWithRatings
        });
    } catch (err) {
        console.error('Error fetching category by name:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;