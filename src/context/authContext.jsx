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

  const login = (email, password) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      try {
        // Simulate authentication
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const userInfo = {
            id: user.id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            role: user.role || 'buyer'
          };
          
          setCurrentUser(userInfo);
          localStorage.setItem('currentUser', JSON.stringify(userInfo));
          resolve(userInfo);
        } else {
          reject(new Error('Invalid credentials'));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const register = (email, password, name, phone, role) => {
    // In a real app, this would be an API call
    return new Promise((resolve, reject) => {
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
          reject(new Error('Email already in use'));
          return;
        }
        
        const newUser = {
          id: Date.now().toString(),
          email,
          password,
          name,
          phone,
          role: role || 'buyer'
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login after registration
        const userInfo = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          phone: newUser.phone,
          role: newUser.role
        };
        
        setCurrentUser(userInfo);
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        resolve(userInfo);
      } catch (error) {
        reject(error);
      }
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const isSellerOrBroker = () => {
    return currentUser && (currentUser.role === 'seller' || currentUser.role === 'broker');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isSellerOrBroker
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 