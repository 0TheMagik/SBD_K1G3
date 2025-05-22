import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RentalManagement = ({ setError, setNotification }) => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);

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
      setError('Failed to fetch rental data');
    } finally {
      setLoading(false);
    }
  };

  const getMemberName = (id) => {
    const member = members.find(m => m._id === id);
    return member ? member.nama : 'Unknown Member';
  };

  const getBookTitle = (id) => {
    const book = books.find(b => b._id === id);
    return book ? book.judul : 'Unknown Book';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const approveReturn = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.put(`http://localhost:3000/api/peminjaman/${id}`, 
        { 
          status: 'dikembalikan',
          tanggal_kembali: new Date()
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setNotification('Book return processed successfully');
      fetchData();
    } catch (err) {
      setError('Failed to process return');
    } finally {
      setLoading(false);
    }
  };

  if (loading && rentals.length === 0) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Rental Requests</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Member</th>
              <th className="py-2 px-3 text-left">Book</th>
              <th className="py-2 px-3 text-left">Borrowed</th>
              <th className="py-2 px-3 text-left">Return</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map(rental => (
              <tr key={rental._id} className="border-t">
                <td className="py-2 px-3">{getMemberName(rental.id_anggota)}</td>
                <td className="py-2 px-3">{getBookTitle(rental.id_buku)}</td>
                <td className="py-2 px-3">{formatDate(rental.tanggal_pinjam)}</td>
                <td className="py-2 px-3">{formatDate(rental.tanggal_kembali)}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    rental.status === 'dikembalikan' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {rental.status}
                  </span>
                </td>
                <td className="py-2 px-3 text-right">
                  {rental.status === 'dipinjam' && (
                    <button 
                      onClick={() => approveReturn(rental._id)}
                      className="bg-green-600 text-white text-xs px-2 py-1 rounded"
                    >
                      Process Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {rentals.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No rental requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalManagement;