const mongoose = require('mongoose');

const bukuSchema = new mongoose.Schema({
    judul: String,
    penulis: String,
    penerbit: String,
    tahun_terbit: Number,
    kategori: String,
    jumlah: Number,
    tersedia: Number,
    count: Number
});

module.exports = mongoose.model('Buku', bukuSchema);
