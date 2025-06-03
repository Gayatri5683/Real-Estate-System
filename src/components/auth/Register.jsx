import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await register(email, password, name, phone, role);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to create an account');
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-100 py-8 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md space-y-4">
    <div>
      <h2 className="text-center text-2xl font-bold text-gray-800">
        Create your account
      </h2>
      <p className="mt-1 text-center text-sm text-gray-500">
        Join <span className="font-semibold text-indigo-600">MahaVastu</span> and find your perfect property
      </p>
    </div>

    <form className="space-y-3" onSubmit={handleSubmit}>
      {error && (
        <div className="text-red-600 text-sm text-center bg-red-100 p-2 rounded-md">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="Your full name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="you@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="123-456-7890"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="At least 6 characters"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          placeholder="Re-enter password"
        />
      </div>

      {/* Register as */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Register as
        </label>
        <div className="flex flex-wrap gap-3 text-sm">
          {["buyer", "seller", "admin"].map((type) => (
            <label key={type} className="inline-flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value={type}
                checked={role === type}
                onChange={(e) => setRole(e.target.value)}
                className="text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="capitalize text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Register button */}
      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </div>

      {/* Link to login */}
      <div className="text-center text-xs text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </div>
    </form>
  </div>
</div>

  );
};

export default Register; 