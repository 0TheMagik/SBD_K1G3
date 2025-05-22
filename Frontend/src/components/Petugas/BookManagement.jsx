import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookManagement = ({ setError, setNotification }) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [bookData, setBookData] = useState({
    judul: '',
    penulis: '',
    penerbit: '',
    tahun_terbit: '',
    kategori: '',
    jumlah: 1,
    tersedia: 'tersedia'
  });

  // Fetch books and categories
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [booksResponse, categoriesResponse] = await Promise.all([
        axios.get('http://localhost:3000/api/buku', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:3000/api/kategori', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      setBooks(booksResponse.data);
      setCategories(categoriesResponse.data);
    } catch (err) {
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setBookData({
      ...bookData,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };

  // Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/api/buku/${bookData._id}`,
          bookData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotification('Book updated successfully!');
      } else {
        await axios.post(
          'http://localhost:3000/api/buku',
          bookData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotification('Book added successfully!');
      }
      
      // Reset form and refresh data
      setShowForm(false);
      setIsEditing(false);
      fetchData();
      
    } catch (err) {
      setError(isEditing ? 'Failed to update book' : 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.delete(`http://localhost:3000/api/buku/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotification('Book deleted successfully!');
      fetchData();
    } catch (err) {
      setError('Failed to delete book');
    } finally {
      setLoading(false);
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setBookData(book);
    setIsEditing(true);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setBookData({
      judul: '',
      penulis: '',
      penerbit: '',
      tahun_terbit: '',
      kategori: '',
      jumlah: 1,
      tersedia: 'tersedia'
    });
    setIsEditing(false);
    setShowForm(false);
  };

  if (loading && books.length === 0) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Books ({books.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add Book'}
        </button>
      </div>

      {/* Book Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded mb-4">
          <h3 className="font-medium mb-3">{isEditing ? 'Edit Book' : 'Add New Book'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  name="judul"
                  value={bookData.judul}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Author</label>
                <input
                  name="penulis"
                  value={bookData.penulis}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Publisher</label>
                <input
                  name="penerbit"
                  value={bookData.penerbit}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input
                  type="number"
                  name="tahun_terbit"
                  value={bookData.tahun_terbit}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select
                  name="kategori"
                  value={bookData.kategori}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.nama_kategori}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                  type="number"
                  name="jumlah"
                  value={bookData.jumlah}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                  min="0"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button 
                type="button" 
                onClick={resetForm} 
                className="px-4 py-1 border rounded"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-cyan-600 text-white px-4 py-1 rounded"
                disabled={loading}
              >
                {loading ? 'Saving...' : isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Book List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Title</th>
              <th className="py-2 px-3 text-left">Author</th>
              <th className="py-2 px-3 text-left">Year</th>
              <th className="py-2 px-3 text-left">Qty</th>
              <th className="py-2 px-3 text-left">Status</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id} className="border-t">
                <td className="py-2 px-3">{book.judul}</td>
                <td className="py-2 px-3">{book.penulis}</td>
                <td className="py-2 px-3">{book.tahun_terbit}</td>
                <td className="py-2 px-3">{book.jumlah}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    book.tersedia === 'tersedia' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {book.tersedia}
                  </span>
                </td>
                <td className="py-2 px-3 text-right">
                  <button 
                    onClick={() => handleEdit(book)} 
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(book._id)} 
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No books found. Add some books to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookManagement;