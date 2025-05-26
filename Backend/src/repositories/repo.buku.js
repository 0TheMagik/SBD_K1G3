const Buku = require('../schema/Buku');

// Create a new buku
exports.createBuku = async (data) => {
    try {
        const buku = new Buku(data);
        return await buku.save();
    } catch (error) {
        throw new Error(`Error creating buku: ${error.message}`);
    }
};

// Get all buku
exports.getAllBuku = async () => {
    try {
        return await Buku.find({});
    } catch (error) {
        throw new Error(`Error fetching buku: ${error.message}`);
    }
};

// Get buku by ID
exports.getBukuById = async (id) => {
    try {
        return await Buku.findById(id);
    } catch (error) {
        throw new Error(`Error fetching buku by ID: ${error.message}`);
    }
};

exports.getBukuByIds = async (ids) => {
    try {
        return await Buku.find({ _id: { $in: ids } });
    } catch (error) {
        throw new Error(`Error fetching books by IDs: ${error.message}`);
    }
};

// Update buku by ID
exports.updateBukuById = async (id, data) => {
    try {
        return await Buku.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(`Error updating buku: ${error.message}`);
    }
};

// Add this function to handle deletion of book images when a book is deleted
exports.deleteBukuById = async (id) => {
    try {
        // Get the book to check if it has an image to delete
        const book = await Buku.findById(id);
        
        if (book && book.image_public_id) {
            try {
                await cloudinary.uploader.destroy(book.image_public_id);
            } catch (cloudinaryError) {
                console.error('Error deleting image from Cloudinary:', cloudinaryError);
                // We'll continue with book deletion even if image deletion fails
            }
        }
        
        return await Buku.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting buku: ${error.message}`);
    }
};

// Get buku by kategori
exports.getBukuByKategori = async (kategori) => {
    try {
        return await Buku.find({ kategori: kategori });
    } catch (error) {
        throw new Error(`Error fetching buku by kategori: ${error.message}`);
    }
};

// find buku by lease count number
exports.findBukuByLeaseCount = async (count) => {
    try {
        const result = await Buku.aggregate([
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
        return result.length > 0 ? result[0] : null;
    } catch (error) {
        throw new Error(`Error fetching buku by lease count: ${error.message}`);
    }
};

// Get buku by title
exports.getBukuByTitle = async (title) => {
    try {
        return await Buku.find({ title: { $regex: title, $options: 'i' } });
    } catch (error) {
        throw new Error(`Error fetching buku by title: ${error.message}`);
    }
};

// Add book rating
exports.addBookRating = async (id, rating) => {
    try {
        const buku = await Buku.findById(id);
        if (!buku) {
            throw new Error('Buku not found');
        }
        buku.rating.push(rating);
        return await buku.save();
    } catch (error) {
        throw new Error(`Error adding book rating: ${error.message}`);
    }
};

// Get books with highest average rating (calculated from Rating collection)
exports.getTopRatedBooks = async (limit = 10) => {
    try {
        const Rating = require('../schema/Rating');
        
        // Aggregate to calculate average ratings
        const avgRatings = await Rating.aggregate([
            { $group: {
                _id: "$book_id",
                averageRating: { $avg: "$score" },
                ratingCount: { $sum: 1 }
            }},
            { $sort: { averageRating: -1 } },
            { $limit: limit }
        ]);
        
        // Get book details for those IDs
        const bookIds = avgRatings.map(item => item._id);
        const books = await Buku.find({ _id: { $in: bookIds } });
        
        // Add the average rating to each book object
        const booksWithRatings = books.map(book => {
            const ratingInfo = avgRatings.find(r => r._id.equals(book._id));
            return {
                ...book.toObject(),
                averageRating: ratingInfo.averageRating,
                ratingCount: ratingInfo.ratingCount
            };
        });
        
        // Sort by average rating
        booksWithRatings.sort((a, b) => b.averageRating - a.averageRating);
        
        return booksWithRatings;
    } catch (error) {
        throw new Error(`Error fetching top rated books: ${error.message}`);
    }
};