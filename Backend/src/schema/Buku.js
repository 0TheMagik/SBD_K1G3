const mongoose = require('mongoose');

const bukuSchema = new mongoose.Schema({
    judul: String,
    penulis: String,
    penerbit: String,
    tahun_terbit: Number,
    kategori: { type: mongoose.Schema.Types.ObjectId, ref: 'Kategori' },
    jumlah: Number,
    rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    tersedia: {type: String, enum: ['tersedia', 'tidak tersedia'], default: 'tersedia'},
    count: { type: Number, default: 0 },
    image_url: { type: String, default: '' },
    image_public_id: { type: String, default: '' }
});
module.exports = mongoose.model('Buku', bukuSchema);
