import React, { useState, useEffect } from 'react';

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - replace with your actual API endpoint
  const API_URL = 'http://127.0.0.1:8000/distributor-invoices';  // Ensure this is correct

  // Fetch invoices from the API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}`);  // Ensure the endpoint is correct
        
        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }
        
        const data = await response.json();
        setInvoices(data);
        setError(null);
      } catch (err) {
        setError('Error fetching invoices: ' + err.message);
        console.error('Error fetching invoices:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  // Filter invoices by status
  const filteredInvoices = activeTab === 'all' 
    ? invoices 
    : invoices.filter(invoice => invoice.status.toLowerCase() === activeTab.toLowerCase());

  // Status badge styling
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle status change
  const handleStatusChange = async (invoiceId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/invoices/${invoiceId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token if your API requires authentication
          // 'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update invoice status');
      }

      const updatedInvoice = await response.json();
      
      // Update local state
      setInvoices(invoices.map(invoice => 
        invoice.id === invoiceId ? updatedInvoice : invoice
      ));
      
      // Close modal
      setIsModalOpen(false);
    } catch (err) {
      setError('Error updating invoice: ' + err.message);
      console.error('Error updating invoice:', err);
    }
  };

  // Fetch invoice details
  const fetchInvoiceDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}/invoices/${id}/`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch invoice details');
      }
      
      const data = await response.json();
      setSelectedInvoice(data);
      setIsModalOpen(true);
    } catch (err) {
      setError('Error fetching invoice details: ' + err.message);
      console.error('Error fetching invoice details:', err);
    }
  };

  // Modal for invoice details
  const InvoiceDetailModal = () => {
    if (!selectedInvoice) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Invoice #{selectedInvoice.id}</h2>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Distributor</p>
              <p className="font-medium">{selectedInvoice.distributor_name || 'N/A'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{selectedInvoice.customer_name || 'N/A'}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="font-medium">${parseFloat(selectedInvoice.total_amount).toFixed(2)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Created At</p>
              <p className="font-medium">{formatDate(selectedInvoice.created_at)}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="mt-1">
                <select 
                  className="border rounded p-2 w-full"
                  value={selectedInvoice.status}
                  onChange={(e) => handleStatusChange(selectedInvoice.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end space-x-2">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Invoice Management</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'all' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Invoices
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'pending' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'paid' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('paid')}
            >
              Paid
            </button>
          </li>
          <li>
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === 'failed' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('failed')}
            >
              Failed
            </button>
          </li>
        </ul>
      </div>
      
      {/* Invoice Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{invoice.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{invoice.customer_name || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${parseFloat(invoice.total_amount).toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(invoice.created_at)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => fetchInvoiceDetails(invoice.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Invoice Detail Modal */}
      {isModalOpen && <InvoiceDetailModal />}
    </div>
  );
};

export default InvoiceManagement;
