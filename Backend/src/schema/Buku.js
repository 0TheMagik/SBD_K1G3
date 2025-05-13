const mongoose = require('mongoose');

const bukuSchema = new mongoose.Schema({
    judul: String,
    penulis: String,
    penerbit: String,
    tahun_terbit: Number,
    kategori: { type: mongoose.Schema.Types.ObjectId, ref: 'Kategori' },
    jumlah: Number,
    tersedia: {type: String, enum: ['tersedia', 'tidak tersedia'], default: 'tersedia'},
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model('Buku', bukuSchema);
