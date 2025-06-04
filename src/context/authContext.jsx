import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await fetch('/api/sellers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    // Save user info to context/localStorage if needed
    return data;
  };

  const register = async (email, password, name, phone, role) => {
    // Send registration data to backend
    const res = await fetch('/api/sellers/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name, phone, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    // Save user info to context/localStorage if needed
    setCurrentUser(data.seller);
    localStorage.setItem('currentUser', JSON.stringify(data.seller));
    return data.seller;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const isSellerOrBuyer = () => {
    return currentUser && (currentUser.role === 'seller' || currentUser.role === 'buyer');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isSellerOrBuyer
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 