import React, { useState, useEffect } from 'react';

const ProductGrid = ({ distributorId }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for API calls
  const API_BASE_URL = 'http://127.0.0.1:8000/product';

  useEffect(() => {
    const fetchData = async () => {
      if (!distributorId) {
        setError('No distributor ID provided');
        setIsLoading(false);
        return;
      }
   
      const distributorToken = localStorage.getItem('distributorToken');
      if (!distributorToken) {
        setError('No distributor token found. Please log in.');
        setIsLoading(false);
        return;
      }
   
      try {
        setIsLoading(true);
   
        // Fetch products for the specific distributor using the distributorId and token
        const productResponse = await fetch(`${API_BASE_URL}/distributors/${distributorId}/products`, {
          headers: {
            'Authorization': `Bearer ${distributorToken}`,
            'Content-Type': 'application/json',
          },
        });
   
        if (!productResponse.ok) {
          throw new Error(`Failed to fetch distributor products: ${productResponse.statusText}`);
        }
   
        const productData = await productResponse.json();
        setProducts(productData);
   
        // Extract categories from products
        const uniqueCategories = [];
        const categoryMap = {};
        productData.forEach((product) => {
          const categoryId = product.category_id || product.categoryId || product.category;
          const categoryName = product.category_name || product.categoryName || product.category;
   
          if (categoryId && !categoryMap[categoryId]) {
            categoryMap[categoryId] = true;
            uniqueCategories.push({ id: categoryId, name: categoryName });
          }
        });
   
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('API Error:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
   };
   
    fetchData();
  }, [distributorId]);

  // Filter products by category (client-side filtering)
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => {
        const productCategory = product.category_id || product.categoryId || product.category;
        return productCategory === selectedCategory;
      });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error: {error}</p>
        <p className="text-sm mt-2">Please check your API connection and make sure the server is running.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Distributor Products</h1>
      
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            All
          </button>

          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id || product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 p-4 bg-gray-100 flex items-center justify-center">
                <img
                  src={product.image || product.imageUrl || product.image_url || '/api/placeholder/200/200'}
                  alt={product.title || product.name || 'Product'}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/api/placeholder/200/200';
                  }}
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-blue-600 font-semibold mb-1">
                  {product.category_name || product.categoryName || product.category || 'Uncategorized'}
                </p>
                <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2" title={product.title || product.name}>
                  {product.title || product.name || 'Unnamed Product'}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3" title={product.description}>
                  {product.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price || '0.00'}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
                    Add to Cart
                  </button>
                </div>
                {product.stock !== undefined && (
                  <div className="mt-2 text-sm">
                    <span className={`${parseInt(product.stock) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {parseInt(product.stock) > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
