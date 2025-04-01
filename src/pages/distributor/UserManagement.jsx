import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const DistributorUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  
  // Form state for adding/editing users
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: 'viewer',
    status: 'active',
    territory: '',
    notes: ''
  });

  const roles = [
    { id: 'admin', name: 'Administrator' },
    { id: 'manager', name: 'Regional Manager' },
    { id: 'sales', name: 'Sales Representative' },
    { id: 'support', name: 'Support Staff' },
    { id: 'viewer', name: 'Viewer' }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Retrieve JWT token from localStorage
        const token = localStorage.getItem("access_token");
        
        if (!token) {
          throw new Error("No token found in localStorage.");
        }

        const response = await fetch("http://127.0.0.1:8000/distributorassign-customer/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError("Failed to fetch distributor users. Check API and authentication.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on role and search query
    let result = users;
    
    // Apply role filter
    if (selectedRole !== 'all') {
      result = result.filter(user => user.role === selectedRole);
    }
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.firstName.toLowerCase().includes(query) || 
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        (user.territory && user.territory.toLowerCase().includes(query))
      );
    }
    
    setFilteredUsers(result);
  }, [selectedRole, searchQuery, users]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("First Name, Last Name, and Email are required fields.");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      
      const response = await fetch("http://127.0.0.1:8000/users/distributors/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setShowAddUserModal(false);
      
      // Reset form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        role: 'viewer',
        status: 'active',
        territory: '',
        notes: ''
      });
      
    } catch (err) {
      setError("Failed to add new user. Please try again.");
      console.error("Add user error:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Loading users...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-red-100 p-6 rounded-lg text-red-700 max-w-md">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Distributor User Management</h1>
          <p className="text-xl opacity-90 max-w-2xl">Manage your distribution network users, assign roles, and control access permissions</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full md:w-auto relative">
            <input
              type="text"
              placeholder="Search users..."
              className="px-5 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
          
          {/* Role Filter */}
          <div className="w-full md:w-auto">
            <select 
              className="border border-gray-300 rounded-lg py-3 px-4 bg-white shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-300 w-full"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          
          {/* Add User Button */}
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-sm transition-colors font-medium flex items-center gap-2 w-full md:w-auto justify-center"
            onClick={() => setShowAddUserModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add User
          </button>
        </div>
        
        {/* User Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
          </p>
        </div>
        
        {/* Users Table */}
        {filteredUsers.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-gray-600">Email</th>
                    <th className="px-6 py-3 text-left text-gray-600">Role</th>
                    <th className="px-6 py-3 text-left text-gray-600">Territory</th>
                    <th className="px-6 py-3 text-left text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-gray-700">{user.firstName} {user.lastName}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">{user.role}</td>
                      <td className="px-6 py-4 text-gray-600">{user.territory}</td>
                      <td className="px-6 py-4 text-gray-600">{user.status}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <button className="text-blue-600 hover:text-blue-700">Edit</button>
                        <button className="ml-3 text-red-600 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-8">No users found matching the criteria.</p>
        )}
      </div>
    </div>
  );
};

export default DistributorUserManagement;
