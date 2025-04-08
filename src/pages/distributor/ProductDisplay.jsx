import React, { useState, useEffect } from 'react';

const DistributorProductsOutlet = ({ distributorId }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Fetch categories and distributor's products when component mounts or distributorId changes
    fetchCategories();
    fetchDistributorProducts();
  }, [distributorId]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("access_token"); // Get the token from localStorage or wherever you're storing it
      const response = await fetch('http://127.0.0.1:8000/product/categories', {
        headers: {
          "Authorization": `Bearer ${token}`, // Add the Authorization header with the JWT token
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log('Categories data:', data); // Log the fetched data
      setCategories(Array.isArray(data) ? data : []); // Ensure it's an array
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Unable to load categories. Please try again later.');
    }
  };

  const fetchDistributorProducts = async () => {
    if (!distributorId) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      console.log("Fetching products with distributorId:", distributorId);
      
      // Send distributorId as query parameter in the URL
      const response = await fetch(`http://127.0.0.1:8000/product/products?distributor_id=${distributorId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      console.log('Product data:', data);

      if (data && data.results) {
        setProducts(data.results);
      } else {
        console.error("No products found in response data.");
      }

      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Unable to load products. Please try again later.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
};


  const addToCart = (productId) => {
    setCartCount(prevCount => prevCount + 1);
    // In a real app, you'd implement actual cart functionality here
  };

  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory
      ? product.category_id === selectedCategory // Assuming product has category_id
      : true;

    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with search */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Distributor Products</h1>

            <div className="flex items-center gap-3">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
              </div>

              <button
                className="md:hidden bg-gray-100 p-2 rounded-lg"
                onClick={() => setIsFilterOpen(true)}
              >
                <span className="text-gray-600">🔍</span>
              </button>

              <button
                className="bg-gray-100 p-2 rounded-lg md:hidden"
                onClick={() => setIsFilterOpen(true)}
              >
                <span className="text-gray-600">⚙️</span>
              </button>

              <div className="relative">
                <span className="text-gray-700">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <span className="text-gray-500 text-xl">✕</span>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-categories"
                    name="category"
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="all-categories" className="ml-2 text-gray-700">All Categories</label>
                </div>

                {Array.isArray(categories) && categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category.id}`}
                      name="category"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">{category.name}</label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop sidebar with filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="desktop-all-categories"
                    name="desktop-category"
                    checked={selectedCategory === null}
                    onChange={() => setSelectedCategory(null)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label htmlFor="desktop-all-categories" className="ml-2 text-gray-700">All Categories</label>
                </div>

                {Array.isArray(categories) && categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`desktop-category-${category.id}`}
                      name="desktop-category"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                    />
                    <label htmlFor={`desktop-category-${category.id}`} className="ml-2 text-gray-700">{category.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {isLoading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
                    <h4 className="text-lg font-medium text-gray-800">{product.name}</h4>
                    <p className="text-gray-600">{product.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xl font-semibold text-gray-800">{product.price}</span>
                      <button
                        onClick={() => addToCart(product.id)}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorProductsOutlet;
