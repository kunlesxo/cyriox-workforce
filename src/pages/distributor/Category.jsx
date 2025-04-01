import React, { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8000/product/';  // Ensure this matches your backend URL configuration

// Helper function to create a slug from a string
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();                  // Trim leading/trailing whitespace/hyphens
};

const CategoryManagement = () => {
  // Category state
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add or edit category form state
  const [newCategory, setNewCategory] = useState({ name: '', description: '', slug: '' });
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Editing category state
  const [editingCategory, setEditingCategory] = useState(null);  // Track the category being edited

  // Get token from localStorage or sessionStorage
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

  // Handle input changes and slug generation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name' || name === 'slug') {
      setNewCategory({
        ...newCategory,
        [name]: value,
        slug: name === 'name' ? createSlug(value) : newCategory.slug, // Only regenerate slug if name changes
      });
    } else {
      setNewCategory({
        ...newCategory,
        [name]: value
      });
    }
  };

  const resetForm = () => {
    setNewCategory({ name: '', description: '', slug: '' });
    setFormError(null);
    setSubmitSuccess(false);
    setEditingCategory(null); // Reset editing mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      setError('Authentication token is missing. Please log in.');
      return;
    }

    if (!newCategory.name || !newCategory.slug) {
      setFormError('Name and Slug are required!');
      return;
    }

    try {
      setIsSubmitting(true);

      // If editing, update the existing category
      if (editingCategory) {
        const response = await fetch(`${API_URL}categories/${editingCategory.id}/`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCategory),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(JSON.stringify(errorData));
        }

        const updatedCategory = await response.json();
        setCategories(categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))); // Update the edited category in the list
      } else {
        // If adding, create a new category
        const response = await fetch(`${API_URL}categories/`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCategory),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        setCategories([data, ...categories]); // Add the newly created category at the top
      }

      setSubmitSuccess(true);
      resetForm();  // Reset the form after submission
    } catch (error) {
      const errorMessage = JSON.parse(error.message);
      if (errorMessage.name && errorMessage.name.includes("already exists")) {
        setError("This category name is already taken. Please choose another name.");
      } else if (errorMessage.slug && errorMessage.slug.includes("already exists")) {
        setError("This category slug is already taken. Please choose another slug.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete category
  const handleDelete = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch(`${API_URL}categories/${categoryId}/`, {
        method: 'DELETE',
        headers
      });

      if (!response.ok) {
        throw new Error(`Failed to delete category. Status: ${response.status}`);
      }

      // Remove the deleted category from the list
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (err) {
      console.error('Error deleting category:', err);
      setError(`Error deleting category: ${err.message}`);
    }
  };

  // Set category for editing
  const handleEdit = (category) => {
    setEditingCategory(category);  // Set the category being edited
    setNewCategory({ ...category });  // Populate the form with the category details
  };

  // Render loading state
  if (loading && categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">
            Category {editingCategory ? 'updated' : 'added'} successfully!
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Form */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>

            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug (auto-generated)
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={newCategory.slug}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-white rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'}`}
                >
                  {isSubmitting ? 'Submitting...' : editingCategory ? 'Save Changes' : 'Add Category'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Category List */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Existing Categories</h2>

            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <ul className="space-y-4">
                {categories.map((category) => (
                  <li key={category.id} className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement;
