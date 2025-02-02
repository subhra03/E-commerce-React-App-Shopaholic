import React from 'react';

const Cart = ({ cart, removeFromCart, handleCheckout }) => {
  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image-container">
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">Price: ₹{item.price}</p>
                <p className="item-quantity">Quantity: {item.quantity}</p>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;