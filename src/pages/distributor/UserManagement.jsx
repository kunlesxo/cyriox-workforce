import React, { useState, useEffect } from 'react';

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Invalid token:', error);
    return true;
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Refresh token error:', errorText);
      throw new Error('Unable to refresh token');
    }

    const data = await response.json();
    const newAccessToken = data.access || data.access_token;

    if (!newAccessToken) {
      throw new Error('No access token in refresh response');
    }

    localStorage.setItem('token', newAccessToken);
    return newAccessToken;
  } catch (err) {
    console.error('Refresh access token failed:', err.message);
    throw err;
  }
};

const DistributorCustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      let token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      if (isTokenExpired(token)) {
        if (refreshToken) {
          token = await refreshAccessToken(refreshToken);
        } else {
          setError('Refresh token not found or expired. Please log in again.');
          return;
        }
      }

      const response = await fetch('http://127.0.0.1:8000/distributor/customers/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server did not return JSON. Check API endpoint and authentication.');
      }

      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <p className="text-sm mt-2">Please check your API configuration and authentication settings.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Customers</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {customer.first_name} {customer.last_name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.phone || 'N/A'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                    onClick={() => window.location.href = `/customer/${customer.id}`}
                  >
                    View Details
                  </button>
                  <button
                    className="text-green-600 hover:text-green-900"
                    onClick={() => window.location.href = `/message/${customer.id}`}
                  >
                    Message
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

export default DistributorCustomersList;
