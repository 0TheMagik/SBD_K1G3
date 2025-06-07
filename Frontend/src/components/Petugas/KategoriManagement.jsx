import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KategoriManagement = ({ setError, setNotification }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [kategoriData, setKategoriData] = useState({
    nama_kategori: '',
    deskripsi: ''
  });

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/kategori', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (err) {
      setError && setError('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setKategoriData({
      ...kategoriData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    setKategoriData({ nama_kategori: '', deskripsi: '' });
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = (kategori) => {
    setKategoriData({
      _id: kategori._id,
      nama_kategori: kategori.nama_kategori,
      deskripsi: kategori.deskripsi || ''
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/kategori/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification && setNotification('Category deleted successfully.');
      fetchCategories();
    } catch (err) {
      setError && setError('Failed to delete category.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/api/kategori/${kategoriData._id}`,
          kategoriData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotification && setNotification('Category updated successfully.');
      } else {
        await axios.post(
          'http://localhost:3000/api/kategori',
          kategoriData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotification && setNotification('Category added successfully.');
      }
      setShowForm(false);
      fetchCategories();
    } catch (err) {
      setError && setError('Failed to save category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Kelola Kategori</h3>
      <button
        className="mb-4 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        onClick={handleAdd}
      >
        Add Category
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Nama Kategori</th>
              <th className="py-2 px-4 border-b">Deskripsi</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((kategori, idx) => (
              <tr key={kategori._id}>
                <td className="py-2 px-4 border-b">{idx + 1}</td>
                <td className="py-2 px-4 border-b">{kategori.nama_kategori}</td>
                <td className="py-2 px-4 border-b">{kategori.deskripsi}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleEdit(kategori)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(kategori._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h4 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Category' : 'Add Category'}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Nama Kategori</label>
                <input
                  type="text"
                  name="nama_kategori"
                  value={kategoriData.nama_kategori}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Deskripsi</label>
                <textarea
                  name="deskripsi"
                  value={kategoriData.deskripsi}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                  disabled={loading}
                >
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KategoriManagement;