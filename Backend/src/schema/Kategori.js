const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
    nama_kategori: { type: String, unique: true },
    deskripsi: String
});

module.exports = mongoose.model('Kategori', kategoriSchema);
