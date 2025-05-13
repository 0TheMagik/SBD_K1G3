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