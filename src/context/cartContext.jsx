import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [properties, setProperties] = useState([]);

  // Load properties from localStorage on initial render
  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    }
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addProperty = (property) => {
    const newProperties = [...properties, property];
    setProperties(newProperties);
    return property;
  };

  const removeProperty = (propertyId) => {
    setProperties(properties.filter(property => property.id !== propertyId));
  };

  const value = {
    cartItems,
    properties,
    addToCart,
    removeFromCart,
    clearCart,
    addProperty,
    removeProperty
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 