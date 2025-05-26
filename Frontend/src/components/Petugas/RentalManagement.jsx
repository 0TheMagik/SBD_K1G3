import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalManagement = ({ setError, setNotification }) => {
  const [rentals, setRentals] = useState([]);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [rentalsRes, membersRes, booksRes] = await Promise.all([
        axios.get('http://localhost:3000/api/peminjaman', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:3000/api/anggota', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:3000/api/buku', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setRentals(rentalsRes.data);
      setMembers(membersRes.data);
      setBooks(booksRes.data);
    } catch (err) {
      console.error("Error fetching rental data:", err);
      setError('Gagal mengambil data peminjaman');
    } finally {
      setLoading(false);
    }
  };

  const getMemberName = (id) => {
    const member = members.find(m => m._id === id);
    return member ? member.nama : 'Anggota Tidak Dikenal';
  };

  const getBookTitle = (id) => {
    const book = books.find(b => b._id === id);
    return book ? book.judul : 'Buku Tidak Dikenal';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const approveRequest = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const rental = rentals.find(r => r._id === id);
      if (!rental) {
        setError('Peminjaman tidak ditemukan');
        return;
      }
      
      // Update the book availability status
      const book = books.find(b => b._id === rental.id_buku);
      if (book && book.jumlah <= 0) {
        setError('Buku tidak tersedia');
        setLoading(false);
        return;
      }
      
      // Calculate return date (14 days from now)
      const returnDate = new Date();
      returnDate.setDate(returnDate.getDate() + 14);
      
      await axios.put(`http://localhost:3000/api/peminjaman/${id}`, 
        { 
          status: 'dipinjam',
          tanggal_pinjam: new Date(),
          tanggal_kembali: returnDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update book availability
      await axios.put(`http://localhost:3000/api/buku/${rental.id_buku}`, 
        { 
          jumlah: book.jumlah - 1,
          tersedia: book.jumlah - 1 <= 0 ? 'tidak tersedia' : 'tersedia'
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setNotification('Permintaan peminjaman berhasil disetujui');
      fetchData();
    } catch (err) {
      console.error("Error approving request:", err);
      setError('Gagal menyetujui permintaan');
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (id) => {
    if (!window.confirm('Anda yakin ingin menolak permintaan ini?')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.delete(`http://localhost:3000/api/peminjaman/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotification('Permintaan peminjaman ditolak');
      fetchData();
    } catch (err) {
      console.error("Error rejecting request:", err);
      setError('Gagal menolak permintaan');
    } finally {
      setLoading(false);
    }
  };

  const processReturn = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const rental = rentals.find(r => r._id === id);
      if (!rental) {
        setError('Peminjaman tidak ditemukan');
        return;
      }
      
      await axios.put(`http://localhost:3000/api/peminjaman/${id}`, 
        { 
          status: 'dikembalikan',
          tanggal_kembali: new Date()
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update book availability
      const book = books.find(b => b._id === rental.id_buku);
      if (book) {
        await axios.put(`http://localhost:3000/api/buku/${rental.id_buku}`, 
          { 
            jumlah: book.jumlah + 1,
            tersedia: 'tersedia'
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      
      setNotification('Pengembalian buku berhasil diproses');
      fetchData();
    } catch (err) {
      console.error("Error processing return:", err);
      setError('Gagal memproses pengembalian');
    } finally {
      setLoading(false);
    }
  };
  
  const getFilteredRentals = () => {
    if (statusFilter === 'all') return rentals;
    return rentals.filter(rental => rental.status === statusFilter);
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
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
    switch(status) {
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

  if (loading && rentals.length === 0) {
    return <div className="text-center py-10">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600"></div>
      <p className="mt-2">Memuat data...</p>
    </div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Kelola Peminjaman</h2>
        <div>
          <label className="mr-2 text-sm font-medium">Filter Status:</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">Semua</option>
            <option value="requested">Diminta</option>
            <option value="dipinjam">Dipinjam</option>
            <option value="dikembalikan">Dikembalikan</option>
          </select>
        </div>
      </div>
      
      {rentals.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded border">
          <p className="text-gray-500">Belum ada data peminjaman</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left">Anggota</th>
                <th className="py-2 px-3 text-left">Buku</th>
                <th className="py-2 px-3 text-left">Tanggal Pinjam</th>
                <th className="py-2 px-3 text-left">Tanggal Kembali</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredRentals().map(rental => (
                <tr key={rental._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-3">{getMemberName(rental.id_anggota)}</td>
                  <td className="py-3 px-3">{getBookTitle(rental.id_buku)}</td>
                  <td className="py-3 px-3">{formatDate(rental.tanggal_pinjam)}</td>
                  <td className="py-3 px-3">{formatDate(rental.tanggal_kembali)}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(rental.status)}`}>
                      {getStatusLabel(rental.status)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {rental.status === 'requested' && (
                      <>
                        <button 
                          onClick={() => approveRequest(rental._id)} 
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded mr-1"
                        >
                          Terima
                        </button>
                        <button 
                          onClick={() => rejectRequest(rental._id)} 
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
                        >
                          Tolak
                        </button>
                      </>
                    )}
                    {rental.status === 'dipinjam' && (
                      <button 
                        onClick={() => processReturn(rental._id)} 
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded"
                      >
                        Proses Pengembalian
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RentalManagement;