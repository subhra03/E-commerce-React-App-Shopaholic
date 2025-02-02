import React, { useState } from 'react';

const Product = ({ products, addToCart, addToWishlist, selectedCategory, setSelectedCategory, sortBy, setSortBy, priceRange, setPriceRange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && product.price <= priceRange;
  });

  return (
    <div className="products-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Store</h1>
          <p>Discover the best products at unbeatable prices.</p>
          <button className="hero-button" onClick={() => setSelectedCategory('all')}>
            Shop Now
          </button>
        </div>
      </div>


      <div className="filters-container">
        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="category-select"
          >
            <option value="all">All Categories</option>
            <option value="phones">Phones</option>
            <option value="laptops">Laptops</option>
            <option value="audio">Audio</option>
            <option value="monitors">Monitors</option>
            <option value="monitors">Monitors</option>
            <option value="storage">Storage</option>
            <option value="smart home">Smart home</option>
            <option value="tablets">Tablets</option>
            <option value="accessories">Accessories</option>
            <option value="wearables">Wearables</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.id}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              <button
                className="add-to-cart"
                onClick={() => addToCart(product.id)}>
                Add to Cart
              </button>
            </div>
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <div className="price-section">
                <span className="current-price">₹{product.price.toLocaleString()}</span>
                <span className="original-price">₹{Math.round(product.price * 1.2).toLocaleString()}</span>
                <span className="discount">20% off</span>
              </div>
              <div className="rating">
                ⭐⭐⭐⭐☆ <span className="rating-count">(1.2k)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
