import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface CategoryProductsProps {
  category: string;
  products: Product[];
}

export const CategoryProducts: React.FC<CategoryProductsProps> = ({ category, products }) => {
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  const goBack = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
        {category} Products
      </h1>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};