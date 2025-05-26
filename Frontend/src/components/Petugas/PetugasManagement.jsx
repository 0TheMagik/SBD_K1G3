import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PetugasManagement = ({ setError, setNotification }) => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [staffData, setStaffData] = useState({
    nama: '',
    username: '',
    password: '',
    role: 'petugas'
  });

  // Fetch all staff members
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.get('http://localhost:3000/api/petugas', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStaffList(response.data);
    } catch (err) {
      console.error("Error fetching staff:", err);
      setError('Failed to fetch staff data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaffData({
      ...staffData,
      [name]: value
    });
  };

  // Handle form submit (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (isEditing) {
        // If editing, don't send password unless it has been changed
        const dataToSend = {...staffData};
        if (!dataToSend.password) {
          delete dataToSend.password;
        }
        
        await axios.put(
          `http://localhost:3000/api/petugas/${staffData._id}`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotification('Staff member updated successfully!');
      } else {
        // If creating new staff
        await axios.post(
          'http://localhost:3000/api/auth/admin/register',
          staffData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotification('Staff member added successfully!');
      }
      
      // Reset form and refresh data
      setShowForm(false);
      setIsEditing(false);
      resetForm();
      fetchData();
      
    } catch (err) {
      console.error("Error managing staff:", err);
      setError(isEditing 
        ? `Failed to update staff member: ${err.response?.data?.message || err.message}` 
        : `Failed to add staff member: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete staff member
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) return;
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      await axios.delete(`http://localhost:3000/api/petugas/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotification('Staff member deleted successfully!');
      fetchData();
    } catch (err) {
      console.error("Error deleting staff:", err);
      setError(`Failed to delete staff member: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Edit staff member
  const handleEdit = (staff) => {
    // Create a copy without password since we don't want to show/edit the hashed password
    const staffToEdit = {
      _id: staff._id,
      nama: staff.nama,
      username: staff.username,
      role: staff.role || 'petugas',
      password: '' // Empty password field for security
    };
    
    setStaffData(staffToEdit);
    setIsEditing(true);
    setShowForm(true);
  };

  // Reset form
  const resetForm = () => {
    setStaffData({
      nama: '',
      username: '',
      password: '',
      role: 'petugas'
    });
    setIsEditing(false);
    setShowForm(false);
  };

  if (loading && staffList.length === 0) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Staff Management ({staffList.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add Staff'}
        </button>
      </div>

      {/* Staff Form */}
      {showForm && (
        <div className="bg-gray-50 p-4 rounded mb-4">
          <h3 className="font-medium mb-3">{isEditing ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  name="nama"
                  value={staffData.nama}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  name="username"
                  value={staffData.username}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                  disabled={isEditing} // Don't allow username changes when editing
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  {isEditing ? 'New Password (leave blank to keep current)' : 'Password'}
                </label>
                <input
                  type="password"
                  name="password"
                  value={staffData.password}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required={!isEditing} // Only required when creating new staff
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={staffData.role}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="petugas">Staff</option>
                  <option value="admin">Admin</option>
                </select>
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

      {/* Staff List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Name</th>
              <th className="py-2 px-3 text-left">Username</th>
              <th className="py-2 px-3 text-left">Role</th>
              <th className="py-2 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(staff => (
              <tr key={staff._id} className="border-t">
                <td className="py-2 px-3">{staff.nama}</td>
                <td className="py-2 px-3">{staff.username}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    staff.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {staff.role === 'admin' ? 'Admin' : 'Staff'}
                  </span>
                </td>
                <td className="py-2 px-3 text-right">
                  <button 
                    onClick={() => handleEdit(staff)} 
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(staff._id)} 
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {staffList.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No staff members found. Add some staff to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetugasManagement;