import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Product from './components/Product';
import Cart from './components/Cart';
import LoginRegistration from './components/LoginRegistration';
import './App.css';

const App = () => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')));
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLogin, setIsLogin] = useState(true);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [sortBy, setSortBy] = useState('price_asc');
  const [priceRange, setPriceRange] = useState(2000);

  const products = [
    { id: 1, name: 'Smartphone X', price: 799, category: 'phones', image: 'https://m.media-amazon.com/images/I/71lD7eGdW-L._SX679_.jpg', },
    { id: 2, name: 'Laptop Pro', price: 1499, category: 'laptops', image: 'https://m.media-amazon.com/images/I/61koe2VO+jL._SX679_.jpg', },
    { id: 3, name: 'Wireless Headphones', price: 199, category: 'audio', image: 'https://m.media-amazon.com/images/I/318EgLiOMUL._SX300_SY300_QL70_FMwebp_.jpg', },
    { id: 4, name: '4K Monitor', price: 499, category: 'monitors', image: 'https://m.media-amazon.com/images/I/81r4H4+w+FL._SX679_.jpg', },
    { id: 5, name: 'Smartwatch Z', price: 199, category: 'wearables', image: 'https://m.media-amazon.com/images/I/41uYSN1XJbL._SX300_SY300_QL70_FMwebp_.jpg', },
    { id: 6, name: 'Gaming Mouse Pro', price: 89, category: 'accessories', image: 'https://m.media-amazon.com/images/I/31xsKmxYpBL._SX300_SY300_QL70_FMwebp_.jpg', },
    { id: 7, name: 'Bluetooth Speaker X', price: 129, category: 'audio', image: 'https://m.media-amazon.com/images/I/41yQZFhJ-dL._SY300_SX300_QL70_FMwebp_.jpg', },
    { id: 8, name: 'Tablet Ultra', price: 399, category: 'tablets', image: 'https://m.media-amazon.com/images/I/6104lCOYMJL._SX522_.jpg', },
    { id: 9, name: 'Portable SSD', price: 169, category: 'storage', image: 'https://m.media-amazon.com/images/I/71xC92ZZJ2L._SX679_.jpg', },
    { id: 10, name: 'Smart Home Hub', price: 149, category: 'smart home', image: 'https://m.media-amazon.com/images/I/31qVgC9A3LL._SX300_SY300_QL70_FMwebp_.jpg', }
  ];

  useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('wishlist', JSON.stringify(wishlist)), [wishlist]);

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity++;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success('Item added to cart!');
  };

  const addToWishlist = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!wishlist.find(item => item.id === productId)) {
      setWishlist([...wishlist, product]);
      toast.success('Added to wishlist!');
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.error('Item removed from cart');
  };

  const filteredProducts = products
    .filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      return matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price_asc': return a.price - b.price;
        case 'price_desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.id - b.id;
      }
    });

  const handleCheckout = () => {
    if (!currentUser) {
      alert('Please login to checkout');
    } else {
      alert('Proceeding to checkout');
    }
  };

  const handleLogin = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = storedUser.find(user => user.email === username && user.password === password);
    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      toast.success('Login successful!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleRegister = (username, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    storedUsers.push({ email: username, password });
    localStorage.setItem('users', JSON.stringify(storedUsers));
    toast.success('Registration successful!');
    setIsLogin(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast.success('Logged out successfully');
  };

  return (
    <Router>
      <Navbar currentUser={currentUser} cartCount={cart.length} wishlistCount={wishlist.length} onLogout={handleLogout} />
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Routes>
        <Route path="/" element={<Product products={filteredProducts} addToCart={addToCart} addToWishlist={addToWishlist} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} sortBy={sortBy} setSortBy={setSortBy} priceRange={priceRange} setPriceRange={setPriceRange} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} handleCheckout={handleCheckout} />} />
        <Route path="/login" element={<LoginRegistration handleLogin={handleLogin} handleRegister={handleRegister} isLogin={isLogin} setIsLogin={setIsLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
