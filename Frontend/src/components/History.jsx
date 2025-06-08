import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';

const HistoryPage = () => {
    const [peminjamanList, setPeminjamanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser, logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token tidak ditemukan');

            const response = await axios.get('http://localhost:3000/api/peminjaman/history', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (Array.isArray(response.data)) {
            setPeminjamanList(response.data);
            } else if (response.data && Array.isArray(response.data.result)) {
            setPeminjamanList(response.data.result);
            } else if (response.data && response.data.length === 0) {
            setPeminjamanList([]);
            } else {
            console.error('Unexpected API data format:', response.data);
            throw new Error('Format data tidak valid');
            }

            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Gagal memuat data peminjaman');
            setLoading(false);
        }
        };

        fetchHistory();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        });
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
        case 'requested':
            return 'bg-yellow-100 text-yellow-800';
        case 'approved':
            return 'bg-blue-100 text-blue-800';
        case 'dipinjam':
            return 'bg-indigo-100 text-indigo-800';
        case 'dikembalikan':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
        case 'requested':
            return 'Diminta';
        case 'approved':
            return 'Disetujui';
        case 'dipinjam':
            return 'Dipinjam';
        case 'dikembalikan':
            return 'Dikembalikan';
        default:
            return status;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
        <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            currentUser={currentUser}
            logout={logout}
        />
        <Sidebar isSidebarOpen={isSidebarOpen} />

        <main className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Riwayat Peminjaman</h2>

            {loading && (
            <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600"></div>
                <p className="mt-2">Memuat data...</p>
            </div>
            )}

            {error && <div className="p-4 text-red-500">{error}</div>}

            {!loading && !error && (
            peminjamanList.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded border">
                <p className="text-gray-500">Tidak ada data peminjaman.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="py-2 px-3 text-left">Judul Buku</th>
                        <th className="py-2 px-3 text-left">Tanggal Pinjam</th>
                        <th className="py-2 px-3 text-left">Tanggal Kembali</th>
                        <th className="py-2 px-3 text-left">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {peminjamanList.map((item) => (
                        <tr key={item._id} className="border-t hover:bg-gray-50">
                        <td className="py-3 px-3">{item.id_buku?.judul || 'Tidak diketahui'}</td>
                        <td className="py-3 px-3">{formatDate(item.tanggal_pinjam)}</td>
                        <td className="py-3 px-3">{formatDate(item.tanggal_kembali)}</td>
                        <td className="py-3 px-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(item.status)}`}>
                            {getStatusLabel(item.status)}
                            </span>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
            )
            )}
        </main>

        <Footer />
        </div>
    );
};

export default HistoryPage;
