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

// Update buku by ID
exports.updateBukuById = async (id, data) => {
    try {
        return await Buku.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(`Error updating buku: ${error.message}`);
    }
};

// Delete buku by ID
exports.deleteBukuById = async (id) => {
    try {
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