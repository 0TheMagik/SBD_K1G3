import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const { currentUser, logout } = useAuth();

    // State for pinjam button
    const [pinjamLoading, setPinjamLoading] = useState(false);
    const [pinjamSuccess, setPinjamSuccess] = useState('');
    const [pinjamError, setPinjamError] = useState('');

    // Ambil token dari localStorage (atau dari context jika ada)
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/buku/${id}`);
                setBook(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load book details.');
            } finally {
                setLoading(false);
            }
        };
        const fetchAverageRating = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/rating/average/${id}`);
                setAverageRating(res.data);
            } catch (err) {
                console.error('Failed to load average rating:', err);
                setAverageRating({ averageScore: 0, totalRatings: 0 });
            }
        };

        fetchBook();
        fetchAverageRating();
    }, [id]);

    // Handler for pinjam
    const handlePinjam = async () => {
        setPinjamLoading(true);
        setPinjamError('');
        setPinjamSuccess('');
        try {
            if (!currentUser || !currentUser._id) {
                setPinjamError('Silakan login untuk meminjam buku.');
                setPinjamLoading(false);
                return;
            }
            if (!token) {
                setPinjamError('Token tidak ditemukan. Silakan login ulang.');
                setPinjamLoading(false);
                return;
            }
            await axios.post(
                'http://localhost:3000/api/peminjaman',
                {
                    id_buku: id,
                    id_anggota: currentUser._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPinjamSuccess('Berhasil mengajukan peminjaman!');
        } catch (err) {
            setPinjamError(
                err.response?.data?.message || 'Gagal meminjam buku.'
            );
        } finally {
            setPinjamLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Header currentUser={currentUser} logout={logout} />
            <Sidebar />

            <main className="container mx-auto p-6">
                <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
                    {/* Image */}
                    <div className="w-full md:w-1/3">
                        {book.image_url ? (
                            <img
                                src={book.image_url}
                                alt={book.judul}
                                className="w-full rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-full h-80 flex items-center justify-center bg-gray-200 rounded-lg">
                                <span className="text-gray-500">No Image</span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800">{book.judul}</h2>
                        <p className="text-lg text-gray-600">Penulis: <strong>{book.penulis}</strong></p>
                        <p className="text-lg text-gray-600">Penerbit: <strong>{book.penerbit || 'N/A'}</strong></p>
                        <p className="text-lg text-gray-600">Tahun Terbit: <strong>{book.tahun_terbit || 'N/A'}</strong></p>
                        <p className="text-lg text-gray-600">Kategori: <strong>{book.kategori.nama_kategori}</strong></p>
                        <p className="text-lg text-gray-600">Jumlah Buku: <strong>{book.jumlah}</strong></p>
                        <p className="text-lg text-gray-600">Ketersediaan:
                            <strong className={`ml-1 ${book.tersedia === 'tersedia' ? 'text-green-600' : 'text-red-600'}`}>
                                {book.tersedia}
                            </strong>
                        </p>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <StarRating rating={averageRating?.averageScore || 0} />
                            <span className="text-sm text-gray-500">
                                {averageRating?.averageScore 
                                    ? `${averageRating.averageScore}/5` 
                                    : 'No ratings'}
                            </span>
                        </div>

                        <Link to="/" className="text-blue-600 hover:underline">← Back to books</Link>
                        <div className="flex gap-4 mt-4">
                            <Link
                                to={`/rating/${book._id}`}
                                className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
                            >
                                Beri Rating
                            </Link>
                            <button
                                className="bg-blue-600 hover:bg-blue-400 text-white px-4 py-2 rounded-full shadow transition"
                                onClick={handlePinjam}
                                disabled={pinjamLoading}
                            >
                                {pinjamLoading ? 'Meminjam...' : 'Pinjam'}
                            </button>
                        </div>
                        {pinjamSuccess && (
                            <div className="text-green-600 mt-2">{pinjamSuccess}</div>
                        )}
                        {pinjamError && (
                            <div className="text-red-600 mt-2">{pinjamError}</div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BookDetailPage;