import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/properties/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Property not found");
        return res.json();
      })
      .then(data => {
        setProperty(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!property) return <div>Property not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
      <p className="mb-2"><strong>Location:</strong> {property.city}</p>
      <p className="mb-2"><strong>Price:</strong> ₹{property.price}</p>
      <p className="mb-2"><strong>Bedrooms:</strong> {property.bedroom}</p>
      <p className="mb-2"><strong>Bathrooms:</strong> {property.bathrooms}</p>
      <p className="mb-2"><strong>Area:</strong> {property.area} sq ft</p>
      <p className="mb-2"><strong>Description:</strong> {property.description}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default PropertyDetails; 