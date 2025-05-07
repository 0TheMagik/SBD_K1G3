const Petugas = require('../schema/Petugas');

// Create a new petugas
exports.createPetugas = async (data) => {
    try {
        const petugas = new Petugas(data);
        return await petugas.save();
    } catch (error) {
        throw new Error(`Error creating petugas: ${error.message}`);
    }
};

// Get all petugas
exports.getAllPetugas = async () => {
    try {
        return await Petugas.find({});
    } catch (error) {
        throw new Error(`Error fetching petugas: ${error.message}`);
    }
};

// Get petugas by ID
exports.getPetugasById = async (id) => {
    try {
        return await Petugas.findById(id);
    } catch (error) {
        throw new Error(`Error fetching petugas by ID: ${error.message}`);
    }
};

// Update petugas by ID
exports.updatePetugasById = async (id, data) => {
    try {
        return await Petugas.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new Error(`Error updating petugas: ${error.message}`);
    }
};

// Delete petugas by ID
exports.deletePetugasById = async (id) => {
    try {
        return await Petugas.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting petugas: ${error.message}`);
    }
};