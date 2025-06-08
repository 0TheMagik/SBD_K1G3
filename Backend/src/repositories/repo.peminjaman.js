const Peminjaman = require('../schema/Peminjaman');
const Buku = require('../schema/Buku');

// Create a new peminjaman
exports.createPeminjaman = async (data) => {
    try {
        const peminjaman = new Peminjaman(data);
        const buku = await Buku.findById(data.id_buku);
        if (!buku) {
            throw new Error('Buku not found');
        }
        if (buku.jumlah <= 0){
            buku.tersedia = 'tidak tersedia';
            throw new Error('Buku tidak tersedia');
        }
        buku.jumlah -= 1;
        buku.count += 1;

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
        const updated = await Peminjaman.findByIdAndUpdate(id, data, { new: true });
        if (!updated) {
            throw new Error('Peminjaman not found');
        }
        if(updated.status === 'dikembalikan'){
            const buku = await Buku.findById(updated.id_buku);
            if (!buku) {
                throw new Error('Buku not found');
            }
            buku.jumlah += 1;
            if(buku.jumlah > 0){
                buku.tersedia = 'tersedia';
            }
        }
        return updated;
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

exports.getPeminjamanByAnggota = async (id_anggota) => {
    try {
        return await Peminjaman.find({ id_anggota }).populate('id_buku');
    } catch (error) {
        throw new Error(`Error fetching peminjaman by anggota: ${error.message}`);
    }
};