import React, { useState, useEffect } from 'react';

const DistributorsInvoice = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distributor, setDistributor] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, description: '', quantity: 1, unitPrice: 0, amount: 0 }
  ]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Fetch distributor data (current user) from API
  useEffect(() => {
    const fetchDistributor = async () => {
      setIsLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://127.0.0.1:8000/distributor/distributor-invoices/');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setDistributor(data);
        
        // Also fetch customers
        const customersResponse = await fetch('http://127.0.0.1:8000/distributor/customers/');
        if (!customersResponse.ok) {
          throw new Error('Failed to fetch customers');
        }
        const customersData = await customersResponse.json();
        setCustomers(customersData);
        if (customersData.length > 0) {
          setCustomerId(customersData[0].id);
        }
      } catch (err) {
        setError(err.message);
        // Using mock data as fallback for demonstration
        setDistributor({
          id: 1,
          username: 'distributor_1',
          first_name: 'John',
          last_name: 'Distributor',
          email: 'john@distribution.com',
          company_name: 'ABC Distribution Co.',
          address: '123 Distribution Lane',
          phone: '(555) 123-4567',
        });
        
        // Mock customers
        const mockCustomers = [
          { id: 2, username: 'customer_1', first_name: 'Jane', last_name: 'Customer', email: 'jane@outlet.com', company_name: 'XYZ Outlet', address: '456 Retail Ave' },
          { id: 3, username: 'customer_2', first_name: 'Bob', last_name: 'Buyer', email: 'bob@shop.com', company_name: 'Bob\'s Shop', address: '789 Market St' }
        ];
        setCustomers(mockCustomers);
        setCustomerId(2); // Default to first customer
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistributor();
  }, []);

  // Calculate totals whenever invoice items change
  useEffect(() => {
    const newSubtotal = invoiceItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    setSubtotal(newSubtotal);
    
    const taxAmount = newSubtotal * 0.07; // Assuming 7% tax rate
    setTax(taxAmount);
    
    setTotal(newSubtotal + taxAmount);
  }, [invoiceItems]);

  const handleItemChange = (id, field, value) => {
    const updatedItems = invoiceItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate amount if quantity or unitPrice changes
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.amount = updatedItem.quantity * updatedItem.unitPrice;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setInvoiceItems(updatedItems);
  };

  const addInvoiceItem = () => {
    const newId = invoiceItems.length > 0 ? Math.max(...invoiceItems.map(item => item.id)) + 1 : 1;
    setInvoiceItems([...invoiceItems, { id: newId, description: '', quantity: 1, unitPrice: 0, amount: 0 }]);
  };

  const removeInvoiceItem = (id) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter(item => item.id !== id));
    }
  };

  const saveInvoice = async () => {
    try {
      const invoiceData = {
        distributor: distributor.id,
        customer: customerId, // Sending just the customer ID
        total_amount: total.toFixed(2),
        status: status,
        created_at: invoiceDate,
        items: invoiceItems.map(item => ({
          description: item.description,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          amount: item.amount
        }))
      };
      
      // Replace with your actual API endpoint
      const response = await fetch('/api/invoices/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save invoice');
      }
      
      const result = await response.json();
      alert(`Invoice #${result.id} created successfully!`);
      // Reset or redirect after successful save
    } catch (err) {
      console.error('Error saving invoice:', err);
      alert(`Error saving invoice: ${err.message}`);
    }
  };

  const handleCustomerChange = (e) => {
    setCustomerId(parseInt(e.target.value));
  };

  const getSelectedCustomer = () => {
    return customers.find(c => c.id === customerId) || {};
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !distributor) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const selectedCustomer = getSelectedCustomer();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Invoice Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
              <div className="mt-2">
                <div className="text-sm text-gray-600">Date: {invoiceDate}</div>
                <div className="text-sm text-gray-600">Status: {status}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">{distributor?.company_name}</div>
              <div className="text-sm text-gray-600">Distributor ID: {distributor?.id}</div>
            </div>
          </div>
        </div>

        {/* Distributor and Customer Information */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-gray-700 mb-2">From:</h2>
              <div className="text-sm">
                <p className="font-medium">{distributor?.company_name}</p>
                <p>{distributor?.first_name} {distributor?.last_name}</p>
                <p>{distributor?.address}</p>
                <p>Phone: {distributor?.phone}</p>
                <p>Email: {distributor?.email}</p>
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700 mb-2">To: (User ID: {customerId})</h2>
              <div className="mb-2">
                <select 
                  value={customerId} 
                  onChange={handleCustomerChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>
                      ID: {c.id} - {c.company_name || `${c.first_name} ${c.last_name}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-sm">
                <p>{selectedCustomer.first_name} {selectedCustomer.last_name}</p>
                <p>{selectedCustomer.address}</p>
                <p>Email: {selectedCustomer.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoice Items */}
        <div className="p-6 border-b border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoiceItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md text-sm"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value) || 0)}
                      className="w-full p-1 border border-gray-300 rounded-md text-sm text-right"
                      min="1"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full p-1 border border-gray-300 rounded-md text-sm text-right"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="px-3 py-2 text-right font-medium">
                    ${(item.quantity * item.unitPrice).toFixed(2)}
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={() => removeInvoiceItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                      disabled={invoiceItems.length === 1}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4">
            <button 
              onClick={addInvoiceItem}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Item
            </button>
          </div>
        </div>
        
        {/* Invoice Totals */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col items-end">
            <div className="w-64">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax (7%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Selection */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Invoice Status</h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Notes</h3>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                rows="3"
                placeholder="Additional notes..."
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Actions */}
        <div className="p-6 flex justify-end space-x-4">
          <button className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancel
          </button>
          <button 
            className="py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700" 
            onClick={saveInvoice}
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistributorsInvoice;