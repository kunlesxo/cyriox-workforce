import React, { useState, useEffect } from 'react';

const OrderManagement = () => {
  // Sample data based on the Order model
  const [orders, setOrders] = useState([
    {
      id: 1,
      distributor: { id: 1, name: 'Distributor A' },
      branch: { id: 1, name: 'Branch X' },
      customer: { id: 2, name: 'Customer 1' },
      product_name: 'Product Alpha',
      quantity: 5,
      price: 199.99,
      status: 'Pending',
      created_at: '2025-03-28T10:30:00Z'
    },
    {
      id: 2,
      distributor: { id: 1, name: 'Distributor A' },
      branch: { id: 2, name: 'Branch Y' },
      customer: { id: 3, name: 'Customer 2' },
      product_name: 'Product Beta',
      quantity: 2,
      price: 49.99,
      status: 'Processing',
      created_at: '2025-03-29T14:15:00Z'
    },
    {
      id: 3,
      distributor: { id: 2, name: 'Distributor B' },
      branch: { id: 1, name: 'Branch X' },
      customer: { id: 4, name: 'Customer 3' },
      product_name: 'Product Gamma',
      quantity: 10,
      price: 29.99,
      status: 'Shipped',
      created_at: '2025-03-30T09:45:00Z'
    }
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const statusClasses = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Delivered: 'bg-green-100 text-green-800'
  };

  const STATUS_CHOICES = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
  ];
  
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };
  
  const handleEditClick = (order) => {
    setSelectedOrder({...order});
    setIsModalOpen(true);
  };
  
  const handleSaveOrder = () => {
    if (selectedOrder) {
      setOrders(orders.map(order => 
        order.id === selectedOrder.id ? selectedOrder : order
      ));
      setIsModalOpen(false);
    }
  };
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatPrice = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h1>
        
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search orders by product or customer..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              className="p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {STATUS_CHOICES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.branch.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatPrice(order.price, order.quantity)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.created_at)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEditClick(order)} 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Edit Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Order #{selectedOrder.id}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedOrder.product_name}
                  onChange={(e) => setSelectedOrder({...selectedOrder, product_name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedOrder.quantity}
                  onChange={(e) => setSelectedOrder({...selectedOrder, quantity: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedOrder.price}
                  onChange={(e) => setSelectedOrder({...selectedOrder, price: parseFloat(e.target.value)})}
                  step="0.01"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  value={selectedOrder.status}
                  onChange={(e) => setSelectedOrder({...selectedOrder, status: e.target.value})}
                >
                  {STATUS_CHOICES.slice(1).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                onClick={handleSaveOrder}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;