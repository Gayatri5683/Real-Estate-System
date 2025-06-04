import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Featured = () => {
  // Static featured properties data for Maharashtra
  const featuredProperties = [
    {
      id: 1,
      title: 'Premium Apartment in Hiranandani Gardens',
      address: 'Powai, Mumbai, Maharashtra',
      price: '₹2,85,00,000',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 3,
      baths: 2,
      sqft: 1850
    },
    {
      id: 2,
      title: 'Modern Flat in Koregaon Park',
      address: 'Koregaon Park, Pune, Maharashtra',
      price: '₹1,25,00,000',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 2,
      baths: 2,
      sqft: 1200
    },
    {
      id: 3,
      title: 'Luxury Villa in Lonavala',
      address: 'Lonavala, Maharashtra',
      price: '₹4,50,00,000',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 4,
      baths: 4,
      sqft: 3200
    },
    {
      id: 4,
      title: 'Seafront Apartment in Worli',
      address: 'Worli, Mumbai, Maharashtra',
      price: '₹7,50,00,000',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 4,
      baths: 4,
      sqft: 2800
    },
    {
      id: 5,
      title: 'Premium Flat in Viman Nagar',
      address: 'Viman Nagar, Pune, Maharashtra',
      price: '₹95,00,000',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 2,
      baths: 2,
      sqft: 1100
    },
    {
      id: 6,
      title: 'Luxury Bungalow in Nagpur',
      address: 'Civil Lines, Nagpur, Maharashtra',
      price: '₹3,25,00,000',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
      beds: 5,
      baths: 5,
      sqft: 4500
    }
  ];

  // Database properties
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/properties/all').then(res => setProperties(res.data));
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Properties
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our handpicked selection of premium properties that stand out for their exceptional quality and value.
          </p>
        </div>

        {/* Static featured properties */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <div key={property.id} className="rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={property.image}
                alt={property.title}
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                <p className="text-gray-600">{property.address}</p>
                <div className="mt-4 flex justify-between">
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <div>{property.beds} beds</div>
                    <div>{property.baths} baths</div>
                    <div>{property.sqft} sqft</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-indigo-600 font-bold"> {property.price}</span>
                  <Link
                    to={`/products/${property.id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Database properties */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Recently Added Properties</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <div key={property._id} className="rounded-lg shadow-lg overflow-hidden">
                <img
                  className="w-full h-48 object-cover"
                  src={"http://localhost:3000/uploads/" + property.image}
                  alt={property.title}
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                  <p className="text-gray-600">{property.city} {property.streetAddress} {property.landmark} {property.pincode}</p>
                  <div className="mt-4 flex justify-between">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      {property.bedrooms && <div>{property.bedrooms} beds</div>}
                      {property.bathrooms && <div>{property.bathrooms} baths</div>}
                      {property.area && <div>{property.area} sqft</div>}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-indigo-600 font-bold">₹{property.price}</span>
                    <Link
                      to={`/products/${property.ID}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </Link>
                  </div>
                  {property.seller && (
                    <p className="text-sm text-gray-600">Seller: {property.seller.name} ({property.seller.email})</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;