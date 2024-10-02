import React from 'react';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';

const ProductList = () => {
  const { state, dispatch } = useShop();

  const filteredProducts = state.products.filter(product => 
    product.name.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
    (state.category === 'all' || product.category === state.category)
  );

  const handleCategoryChange = (e) => {
    dispatch({ type: 'SET_CATEGORY', payload: e.target.value });
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
          <select
            className="border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            onChange={handleCategoryChange}
            value={state.category}
          >
            <option value="all">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home</option>
            <option value="jewelry">Jewelry</option>
            <option value="art">Art</option>
            <option value="textiles">Textiles</option>
            <option value="music">Music</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;