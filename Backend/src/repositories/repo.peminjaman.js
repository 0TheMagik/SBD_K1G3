const Peminjaman = require('../schema/Peminjaman');
const Buku = require('../schema/Buku');

// Create a new peminjaman
exports.createPeminjaman = async (data) => {
    try {
        const peminjaman = new Peminjaman(data);
        // const buku = await Buku.findById(data.id_buku);
        // if (!buku) {
        //     throw new Error('Buku not found');
        // }
        // buku.count += 1;
        return await peminjaman.save();
    } catch (error) {
        throw new Error(`Error creating peminjaman: ${error.message}`);
    }
};

// Get all peminjaman
exports.getAllPeminjaman = async () => {
    try {
        return await Peminjaman.find({});
    } catch (error) {
        throw new Error(`Error fetching peminjaman: ${error.message}`);
    }
};

// Get peminjaman by ID
exports.getPeminjamanById = async (id) => {
    try {
        return await Peminjaman.findById(id);
    } catch (error) {
        throw new Error(`Error fetching peminjaman by ID: ${error.message}`);
    }
};

// Update peminjaman by ID
exports.updatePeminjamanById = async (id, data) => {
    try {
        return await Peminjaman.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(`Error updating peminjaman: ${error.message}`);
    }
};

// Delete peminjaman by ID
exports.deletePeminjamanById = async (id) => {
    try {
        return await Peminjaman.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting peminjaman: ${error.message}`);
    }
};