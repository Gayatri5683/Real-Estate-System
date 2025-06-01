import React from 'react';
import { Link } from 'react-router-dom';

const Popular = () => {
  // Sample popular properties data for Maharashtra
  const popularProperties = [
    {
      id: 7,
      title: 'Luxury Apartment in Bandra',
      address: 'Bandra West, Mumbai, Maharashtra',
      price: '₹5,75,00,000',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      beds: 3,
      baths: 3,
      sqft: 1800,
      views: 2150
    },
    {
      id: 8,
      title: 'Garden View Apartment in Kothrud',
      address: 'Kothrud, Pune, Maharashtra',
      price: '₹1,45,00,000',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1084&q=80',
      beds: 3,
      baths: 2,
      sqft: 1500,
      views: 1680
    },
    {
      id: 9,
      title: 'Hill View Villa in Panchgani',
      address: 'Panchgani, Maharashtra',
      price: '₹2,85,00,000',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 3,
      baths: 3,
      sqft: 2200,
      views: 1875
    },
    {
      id: 10,
      title: 'Beachfront Property in Alibaug',
      address: 'Alibaug, Maharashtra',
      price: '₹6,50,00,000',
      image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 4,
      baths: 4,
      sqft: 3500,
      views: 2450
    },
    {
      id: 11,
      title: 'Heritage Bungalow in Kolhapur',
      address: 'Kolhapur, Maharashtra',
      price: '₹1,95,00,000',
      image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 4,
      baths: 3,
      sqft: 2800,
      views: 1920
    },
    {
      id: 12,
      title: 'Eco-Friendly Villa in Nashik',
      address: 'Nashik, Maharashtra',
      price: '₹2,25,00,000',
      image: 'https://images.unsplash.com/photo-1600047508788-26bb381500e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 3,
      baths: 3,
      sqft: 2400,
      views: 1780
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Most Popular Properties
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Our most viewed and sought-after properties that are trending with home buyers.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {popularProperties.map((property) => (
            <div key={property.id} className="rounded-lg shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  className="w-full h-48 object-cover"
                  src={property.image}
                  alt={property.title}
                />
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 m-2 rounded-full text-sm">
                  {property.views} views
                </div>
              </div>
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
                  <span className="text-indigo-600 font-bold">{property.price}</span>
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
      </div>
    </div>
  );
};

export default Popular;