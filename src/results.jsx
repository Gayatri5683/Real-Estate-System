import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  // Sample search results data (in a real app, this would come from an API based on the search query)
  const allProperties = [
    {
      id: 1,
      title: 'Luxury Villa',
      address: '123 Main St, Anytown',
      price: '$1,250,000',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 5,
      baths: 4,
      sqft: 3500,
      type: 'Sale'
    },
    {
      id: 2,
      title: 'Modern Apartment',
      address: '456 Park Ave, Anytown',
      price: '$450,000',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: 'Sale'
    },
    {
      id: 3,
      title: 'Family Home',
      address: '789 Oak St, Anytown',
      price: '$750,000',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: 'Sale'
    },
    {
      id: 4,
      title: 'Waterfront Property',
      address: '101 Lake View Dr, Anytown',
      price: '$1,850,000',
      image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 6,
      baths: 5,
      sqft: 4200,
      type: 'Sale'
    },
    {
      id: 5,
      title: 'Downtown Condo',
      address: '555 Center St, Anytown',
      price: '$2,500/month',
      image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      beds: 1,
      baths: 1,
      sqft: 950,
      type: 'Rent'
    },
    {
      id: 6,
      title: 'Country Estate',
      address: '777 Rural Route, Anytown',
      price: '$2,100,000',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80',
      beds: 7,
      baths: 6,
      sqft: 5500,
      type: 'Sale'
    },
    {
      id: 7,
      title: 'Urban Loft',
      address: '222 Downtown Ave, Anytown',
      price: '$3,200/month',
      image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      beds: 1,
      baths: 2,
      sqft: 1100,
      type: 'Rent'
    },
    {
      id: 8,
      title: 'Suburban Retreat',
      address: '333 Maple Dr, Anytown',
      price: '$3,800/month',
      image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1084&q=80',
      beds: 3,
      baths: 2,
      sqft: 2200,
      type: 'Rent'
    }
  ];

  // Filter properties based on search query
  const filteredProperties = searchQuery
    ? allProperties.filter(property => 
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allProperties;

  // Filter states
  const [filters, setFilters] = useState({
    type: 'All',
    minPrice: '',
    maxPrice: '',
    beds: 'Any',
    baths: 'Any'
  });

  // Apply filters
  const applyFilters = (properties) => {
    return properties.filter(property => {
      // Filter by type
      if (filters.type !== 'All' && property.type !== filters.type) {
        return false;
      }

      // Filter by price
      const price = parseInt(property.price.replace(/[^0-9]/g, ''));
      if (filters.minPrice && price < parseInt(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && price > parseInt(filters.maxPrice)) {
        return false;
      }

      // Filter by beds
      if (filters.beds !== 'Any' && property.beds < parseInt(filters.beds)) {
        return false;
      }

      // Filter by baths
      if (filters.baths !== 'Any' && property.baths < parseInt(filters.baths)) {
        return false;
      }

      return true;
    });
  };

  const filteredAndSortedProperties = applyFilters(filteredProperties);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Properties'}
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            {filteredAndSortedProperties.length} properties found
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Property Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="All">All</option>
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
                    Min Price
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    id="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min Price"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
                    Max Price
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    id="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="beds" className="block text-sm font-medium text-gray-700">
                    Bedrooms
                  </label>
                  <select
                    id="beds"
                    name="beds"
                    value={filters.beds}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="baths" className="block text-sm font-medium text-gray-700">
                    Bathrooms
                  </label>
                  <select
                    id="baths"
                    name="baths"
                    value={filters.baths}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="Any">Any</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({
                    type: 'All',
                    minPrice: '',
                    maxPrice: '',
                    beds: 'Any',
                    baths: 'Any'
                  })}
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {filteredAndSortedProperties.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedProperties.map((property) => (
                  <div key={property.id} className="rounded-lg shadow-lg overflow-hidden">
                    <div className="relative">
                      <img
                        className="w-full h-48 object-cover"
                        src={property.image}
                        alt={property.title}
                      />
                      <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 m-2 rounded-full text-sm">
                        {property.type}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
