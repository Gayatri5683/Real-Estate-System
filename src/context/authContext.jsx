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
     try {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
    } finally {
        setLoading(false);
    }
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
        console.error("Error during login:", error);
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
        /* if (users.some(user => user.email === email)) {
          reject(new Error('Email already in use'));
          return;
        } */
        
        const newUser = {
          id: Date.now().toString(),
          email,
          password,
          name,
          phone,
          role: role /* || 'buyer' */
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
        console.error("Error during registration:", error);
        reject(error);
      }
      });
      };
  // In your backend login route handler
/* app.post('/api/sellers/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email); // Debug incoming request

    try {
        // ... your authentication logic ...
        const user = await User.findOne({ email }); // Or findOne({ email: email })
        if (!user) {
            console.log('Login failed: User not found for email', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password (use bcrypt.compare if you hashed it)
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            console.log('Login failed: Incorrect password for email', email);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If successful:
        console.log('Login successful for user:', user.email);
        // Crucial: Send a proper JSON response with user data or token
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id, // Or user._id if MongoDB
                name: user.name,
                email: user.email,
                role: user.role,
                // DO NOT send password_hash here
                token: 'your_jwt_token_here' // If you're implementing JWTs
            }
        });

    } catch (error) {
        console.error('Server error during login for email', email, ':', error); // Log the actual error
        res.status(500).json({ message: 'Server error during login' });
    }
}); */

// In your backend register route handler
/* app.post('/api/sellers/register', async (req, res) => {
    const { email, password, name, phone, role } = req.body;
    console.log('Registration attempt for email:', email); // Debug incoming request

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Registration failed: Email already exists', email);
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10); // Use a salt round like 10

        const newUser = new User({
            name,
            email,
            phone,
            password_hash: hashedPassword, // Store the hashed password
            role
        });

        const savedUser = await newUser.save(); // Save to database

        console.log('Registration successful for user:', savedUser.email);
        // Crucial: Send a proper JSON response
        res.status(201).json({
            message: 'Registration successful',
            seller: { // Or 'user' depending on what your frontend expects
                id: savedUser.id,
                name: savedUser.name,
                email: savedUser.email,
                role: savedUser.role
            }
        });

    } catch (error) {
        console.error('Server error during registration for email', email, ':', error); // Log the actual error
        res.status(500).json({ message: 'Server error during registration' });
    }
});   */

  /* const login = async (email, password) => {
    // Send login data to backend
    const res = await fetch('/api/sellers/login', {
      method: 'POST',
      headers: { 'Content-Type': 'authorization' },
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
      headers: { 'Content-Type': 'authorization' },
      body: JSON.stringify({ email, password, name, phone, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    // Save user info to context/localStorage if needed
    setCurrentUser(data.seller);
    localStorage.setItem('currentUser', JSON.stringify(data.seller));
    return data.seller;
  }; */

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