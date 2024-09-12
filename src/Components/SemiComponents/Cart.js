import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Cart.css';
import Navbar from './Navbar';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

    const formatPrice = (price) => {
        if (isNaN(price)) {
            return 'Invalid Price';
        }
        const formattedPrice = Number(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return `Ksh ${formattedPrice}`;
    };


  const removeFromCart = (uuid) => {
    const updatedCart = cartItems.filter(item => item.uuid !== uuid);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (uuid, increment) => {
    const updatedCart = cartItems.map(item => {
      if (item.uuid === uuid) {
        const newQuantity = Math.max(1, item.quantity + increment);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="cart-container">
        <Navbar />
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item.uuid} className="cart-item">
              <img src={item.imageURL} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{item.title}</h2>
                <p>Price: {formatPrice(item.price)}</p>
                <p>Quantity:
                  <button onClick={() => handleQuantityChange(item.uuid, -1)}>-</button>
                  {item.quantity}
                  <button onClick={() => handleQuantityChange(item.uuid, 1)}>+</button>
                </p>
                <p>Total: {formatPrice(item.price * item.quantity)}</p>
                <button onClick={() => removeFromCart(item.uuid)} className="remove-button">Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty. We are still working on It.</p>
        )}
      </div>
      {/* <div className="cart-summary">
        <h2>Cart Total: {formatPrice(calculateTotal())}</h2>
        <button onClick={() => navigate('/checkout')} className="checkout-button">Proceed to Checkout</button>
      </div> */}
    </div>
  );
}

export default Cart;
