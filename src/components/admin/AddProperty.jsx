import React, { useState } from 'react';
import axios from 'axios';

const AddProperty = ({ sellerId, onPropertyAdded }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/properties', {
        ...form,
        price: Number(form.price),
        seller: sellerId,
      });
      setForm({ title: '', description: '', price: '', location: '', image: '' });
      if (onPropertyAdded) onPropertyAdded(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add property');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded bg-white max-w-md mx-auto">
      <h2 className="text-xl font-bold">Add New Property</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="w-full p-2 border rounded" required />
      <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full p-2 border rounded" required />
      <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" required />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
        {loading ? 'Adding...' : 'Add Property'}
      </button>
    </form>
  );
};

export default AddProperty; 