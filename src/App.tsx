import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { CartPage } from './components/CartPage';
import { CategoryProducts } from './components/CategoryProducts';

// Sample data - In a real app, this would come from an API
export const featuredProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'Premium wireless headphones with noise cancellation',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Electronics',
    stock: 10,
    rating: 4.5,
    reviews: [
      { id: 'r1', userId: 'u1', userName: 'John Doe', rating: 5, comment: 'Great sound quality!', date: '2024-03-10' },
    ],
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Feature-rich smartwatch with health tracking',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Electronics',
    stock: 15,
    rating: 4.8,
    reviews: [
      { id: 'r2', userId: 'u2', userName: 'Jane Smith', rating: 4, comment: 'Love the features!', date: '2024-03-09' },
    ],
  },
  {
    id: '3',
    name: 'Premium Backpack',
    price: 79.99,
    description: 'Durable backpack with laptop compartment',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Fashion',
    stock: 20,
    rating: 4.6,
    reviews: [
      { id: 'r3', userId: 'u3', userName: 'Mike Johnson', rating: 5, comment: 'Perfect for daily use!', date: '2024-03-08' },
    ],
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 149.99,
    description: 'Programmable coffee maker with thermal carafe',
    images: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Home & Living',
    stock: 8,
    rating: 4.7,
    reviews: [
      { id: 'r4', userId: 'u4', userName: 'Sarah Wilson', rating: 4, comment: 'Makes great coffee!', date: '2024-03-07' },
    ],
  },
  // Additional products for each category
  {
    id: '5',
    name: 'Running Shoes',
    price: 129.99,
    description: 'Professional running shoes with superior comfort',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Sports',
    stock: 25,
    rating: 4.9,
    reviews: [
      { id: 'r5', userId: 'u5', userName: 'Mike Runner', rating: 5, comment: 'Best running shoes ever!', date: '2024-03-06' },
    ],
  },
  {
    id: '6',
    name: 'Laptop Stand',
    price: 49.99,
    description: 'Ergonomic laptop stand for better posture',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
    category: 'Electronics',
    stock: 30,
    rating: 4.6,
    reviews: [
      { id: 'r6', userId: 'u6', userName: 'Work Pro', rating: 5, comment: 'Great for home office!', date: '2024-03-05' },
    ],
  }
];

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const renderContent = () => {
    if (currentPath === '/cart') {
      return <CartPage />;
    }

    if (currentPath.startsWith('/category/')) {
      const category = decodeURIComponent(currentPath.split('/category/')[1]);
      return <CategoryProducts category={category} products={featuredProducts} />;
    }

    return (
      <>
        <Hero />
        <CategorySection />
        <ProductGrid products={featuredProducts} title="Featured Products" />
      </>
    );
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>{renderContent()}</main>
      </div>
    </CartProvider>
  );
}

export default App;