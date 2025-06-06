import React, { use, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import properties from "./data/properties.json";

const fetchProperty = async (id) => {
  const response = await fetch("http://localhost:3000/api/v1/properties/" + id);
  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }
  return response.json();
};

const Products = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Find the property by ID from the imported JSON
    const found = properties.find((p) => p.id === id);
    if (found) {
      setProperty(found);
    } else {
      fetchProperty(id)
        .then((data) => {
          setProperty(data);
        })
        .catch((error) => {
          console.error("Error fetching property:", error);
        });
    }
  }, [id]);

  if (!property) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">
          Property not found.
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="relative">
        <img
          className="w-full h-96 object-cover"
          src={"http://localhost:3000/uploads/" + property.image}
          alt={property.title}
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold">{property.name}</h1>
            <p className="mt-2 text-xl">{property.city}</p>
            <p className="mt-4 text-2xl font-bold">₹{property.price}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900">
              Property Details
            </h2>
            <p className="mt-4 text-lg text-gray-500">{property.description}</p>
            <p className="mt-4 text-lg text-gray-500">{property.details}</p>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900">Amenities</h3>
              <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(property.amenities) && property.amenities &&
                  property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-indigo-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {amenity}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900">Gallery</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {property.images?.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 overflow-hidden rounded-lg"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={"http://localhost:3000/uploads/" + image.imagePath}
                      alt={`Gallery image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900">Location</h3>
              <div className="mt-4 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <iframe
                  title="Property location"
                  className="w-full h-96 border-0"
                  // src={`https://www.google.com/maps?q=${encodeURIComponent(
                  //   property.address
                  // )}&output=embed`}
                  src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
              {/* Agent info can be added here if available in your data */}
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Contact Agent
                </Link>
              </div>
              <div className="mt-4">
                <button className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Schedule Viewing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
