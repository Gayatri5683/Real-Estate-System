import React from 'react';
import { Link } from 'react-router-dom';
import properties from '../../data/properties.json';

const HomePage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80"
            alt="Modern home interior"
          />
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Dream Home
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Discover the perfect property that matches your lifestyle and preferences. 
            Browse our extensive collection of homes, apartments, and commercial spaces.
          </p>
          <div className="mt-10">
            <Link
              to="/featured"
              className="inline-block bg-indigo-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-700"
            >
              Explore Properties
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Properties Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Properties
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover premium properties in Maharashtra's most sought-after locations.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map(property => (
            <div key={property.id} className="rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={property.image}
                alt={property.title}
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
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

        <div className="mt-10 text-center">
          <Link
            to="/featured"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            View All Featured Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;