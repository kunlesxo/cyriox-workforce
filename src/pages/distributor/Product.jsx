import React, { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8000/product/';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category: '',
    newCategory: '',
    image: null,
  });

  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await fetch(`${API_URL}categories/`, { headers });
      if (!response.ok) {
        throw new Error(`Failed to fetch categories. Status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const getToken = () => {
    return (
      localStorage.getItem('authToken') ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('authToken') ||
      sessionStorage.getItem('access_token') ||
      sessionStorage.getItem('token')
    );
  };

  const resetForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      stock_quantity: '',
      category: '',
      newCategory: '',
      image: null
    });
    setFormError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = getToken();
    const distributorId = localStorage.getItem('distributor_id');
  
    if (!token || !distributorId) {
      setError('Missing token or distributor ID. Please log in again.');
      return;
    }
  
    if (!newProduct.name || !newProduct.price || !newProduct.stock_quantity || (!newProduct.category && !newProduct.newCategory)) {
      setFormError('Name, Price, Stock Quantity, and Category are required!');
      return;
    }
  
    try {
      setIsSubmitting(true);
  
      let categoryId = newProduct.category;
  
      // If a new category name is provided, create it first
      if (!categoryId && newProduct.newCategory) {
        const categoryRes = await fetch(`${API_URL}categories/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newProduct.newCategory }),
        });
  
        if (!categoryRes.ok) {
          const errData = await categoryRes.json();
          throw new Error(`Category Error: ${JSON.stringify(errData)}`);
        }
  
        const createdCategory = await categoryRes.json();
        categoryId = createdCategory.id;
      }
  
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('stock_quantity', newProduct.stock_quantity);
      formData.append('distributor', distributorId);
      formData.append('category_id', categoryId); // ensure this is an integer
  
      if (newProduct.image) {
        formData.append('image', newProduct.image);
      }
  
      const response = await fetch(`${API_URL}products/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
  
      await response.json();
      setSubmitSuccess(true);
      resetForm();
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Product added successfully!</span>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Stock Quantity */}
          <div className="mb-4">
            <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity *</label>
            <input
              type="number"
              id="stock_quantity"
              name="stock_quantity"
              value={newProduct.stock_quantity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <p className="text-sm text-gray-500 mt-2">Or create a new category below:</p>
            <input
              type="text"
              name="newCategory"
              value={newProduct.newCategory}
              onChange={handleInputChange}
              placeholder="Enter new category name"
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          {/* Image */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleInputChange}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded-md"
            />
            {newProduct.image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(newProduct.image)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
