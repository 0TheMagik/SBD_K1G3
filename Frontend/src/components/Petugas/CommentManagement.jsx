import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentManagement = ({ setError, setNotification }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/rating', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(res.data);
    } catch (err) {
      setError('Gagal mengambil komentar');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus komentar ini?')) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/rating/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification('Komentar berhasil dihapus');
      fetchComments();
    } catch (err) {
      setError('Gagal menghapus komentar');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading komentar...</div>;

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Kelola Komentar ({comments.length})</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-3 text-left">Buku</th>
              <th className="py-2 px-3 text-left">Reviewer</th>
              <th className="py-2 px-3 text-left">Komentar</th>
              <th className="py-2 px-3 text-left">Rating</th>
              <th className="py-2 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="py-2 px-3">{c.book_id?.judul || c.book_id?._id}</td>
                <td className="py-2 px-3">{c.reviewer_id?.nama || c.reviewer_id?._id}</td>
                <td className="py-2 px-3">{c.Comment}</td>
                <td className="py-2 px-3">{c.score}</td>
                <td className="py-2 px-3 text-right">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentManagement;
