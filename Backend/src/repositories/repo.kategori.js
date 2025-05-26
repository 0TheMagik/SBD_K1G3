const Kategori = require('../schema/Kategori');

// Create a new kategori
exports.createKategori = async (data) => {
    try {
        const kategori = new Kategori(data);
        return await kategori.save();
    } catch (error) {
        throw new Error(`Error creating kategori: ${error.message}`);
    }
};

// Get all kategori
exports.getAllKategori = async () => {
    try {
        return await Kategori.find({});
    } catch (error) {
        throw new Error(`Error fetching kategori: ${error.message}`);
    }
};

// Get kategori by ID
exports.getKategoriById = async (id) => {
    try {
        return await Kategori.findById(id);
    } catch (error) {
        throw new Error(`Error fetching kategori by ID: ${error.message}`);
    }
};

// Update kategori by ID
exports.updateKategoriById = async (id, data) => {
    try {
        return await Kategori.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(`Error updating kategori: ${error.message}`);
    }
};

// Delete kategori by ID
exports.deleteKategoriById = async (id) => {
    try {
        return await Kategori.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting kategori: ${error.message}`);
    }
};

exports.getKategoriByName = async (name) => {
    try {
        // Case insensitive search
        return await Kategori.findOne({ 
            nama_kategori: { $regex: new RegExp('^' + name + '$', 'i') } 
        });
    } catch (error) {
        throw new Error(`Error fetching kategori by name: ${error.message}`);
    }
};