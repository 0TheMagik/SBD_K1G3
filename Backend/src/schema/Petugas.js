const mongoose = require('mongoose');

const petugasSchema = new mongoose.Schema({
    nama: String,
    username: { type: String, unique: true },
    password: String, // hash your password in real use
    role: { type: String, enum: ['admin', 'petugas'], default: 'petugas' }
});

module.exports = mongoose.model('Petugas', petugasSchema);
