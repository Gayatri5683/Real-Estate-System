import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProperty from './AddProperty';

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  const [propertiesBySeller, setPropertiesBySeller] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/sellers')
      .then(res => {
        setSellers(res.data);
        setLoading(false);
        // Fetch properties for each seller
        res.data.forEach(seller => {
          axios.get(`http://localhost:5000/api/properties/seller/${seller._id}`)
            .then(propRes => {
              setPropertiesBySeller(prev => ({
                ...prev,
                [seller._id]: propRes.data
              }));
            });
        });
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Details</h2>
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Properties</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map(seller => (
              <tr key={seller._id}>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.phone}</td>
                <td>
                  <ul>
                    {(propertiesBySeller[seller._id] || []).map(property => (
                      <li key={property._id}>
                        {property.title} - ₹{property.price}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <AddProperty sellerId={seller._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SellerList; 