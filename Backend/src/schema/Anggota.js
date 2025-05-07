const mongoose = require('mongoose');

const anggotaSchema = new mongoose.Schema({
    nama: String,
    alamat: String,
    telepon: String,
    email: String,
    tanggal_daftar: { type: Date, default: Date.now },
    status: { type: String, enum: ['aktif', 'nonaktif'], default: 'aktif' }
});

module.exports = mongoose.model('Anggota', anggotaSchema);
