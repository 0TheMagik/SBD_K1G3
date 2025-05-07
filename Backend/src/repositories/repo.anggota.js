const Anggota = require('../schema/Anggota');

// Create a new anggota
exports.createAnggota = async (data) => {
    try {
        const anggota = new Anggota(data);
        return await anggota.save();
    } catch (error) {
        throw new Error(`Error creating anggota: ${error.message}`);
    }
};

// Get all anggota
exports.getAllAnggota = async () => {
    try {
        return await Anggota.find({});
    } catch (error) {
        throw new Error(`Error fetching anggota: ${error.message}`);
    }
};

// Get anggota by ID
exports.getAnggotaById = async (id) => {
    try {
        return await Anggota.findById(id);
    } catch (error) {
        throw new Error(`Error fetching anggota by ID: ${error.message}`);
    }
};

// Update anggota by ID
exports.updateAnggotaById = async (id, data) => {
    try {
        return await Anggota.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(`Error updating anggota: ${error.message}`);
    }
};

// Delete anggota by ID
exports.deleteAnggotaById = async (id) => {
    try {
        return await Anggota.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting anggota: ${error.message}`);
    }
};