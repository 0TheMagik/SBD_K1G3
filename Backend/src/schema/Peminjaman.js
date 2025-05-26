const mongoose = require('mongoose');

const peminjamanSchema = new mongoose.Schema({
    id_anggota: { type: mongoose.Schema.Types.ObjectId, ref: 'Anggota' },
    id_buku: { type: mongoose.Schema.Types.ObjectId, ref: 'Buku' },
    tanggal_pinjam: { type: Date, default: Date.now },
    tanggal_kembali: Date,
    status: { type: String, enum: [ 'requested', 'approved', 'dipinjam', 'dikembalikan'], default: 'dipinjam' }
});

module.exports = mongoose.model('Peminjaman', peminjamanSchema);
