import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BuyerList = () => {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/buyers')
      .then(res => {
        setBuyers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buyer Details</h2>
      {loading ? <p>Loading...</p> : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Property</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map(buyer => (
              <tr key={buyer.buyerId}>
                <td className="py-2 px-4 border">{buyer.name}</td>
                <td className="py-2 px-4 border">{buyer.email}</td>
                <td className="py-2 px-4 border">{buyer.phone}</td>
                <td className="py-2 px-4 border">
                  {buyer.propertyTitle
                    ? <span>{buyer.propertyTitle} (ID: {buyer.propertyId})</span>
                    : <span>No purchase</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BuyerList; 