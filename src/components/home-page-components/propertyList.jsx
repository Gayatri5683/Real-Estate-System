import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";
import { formatCompactNumber } from "../../constants/formatNumber";
import { scrollToTop } from "../../constants/scrollToTop";
import Button from "../buttons-component/solidbutton";

const PropertyList = () => {
  const { properties } = useContext(CartContext);

  return (
    <div className="bg-gray-100 py-16">
      <div style={{ maxWidth: 1200 }} className="mx-auto px-10 max-sm:px-5">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold title-font">Maharashtra Properties</h2>
          <Link to="/add-property" onClick={scrollToTop}>
            <Button
              content="Add New Property"
              padding="py-2 px-5"
              fontSize="text-lg"
            />
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{property.name}</h3>
                  <p className="text-gray-600 mb-4">
                    <span className="font-medium">Location:</span> {property.location}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-xl font-bold text-red-500">
                      ₹ {formatCompactNumber(property.price)}/month
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    {property.bedrooms && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{property.bedrooms}</span> Bedrooms
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{property.bathrooms}</span> Bathrooms
                      </div>
                    )}
                    {property.area && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{property.area}</span> sq ft
                      </div>
                    )}
                  </div>
                  {property.description && (
                    <p className="text-gray-700 mb-4 line-clamp-2">{property.description}</p>
                  )}
                  <div className="flex justify-center">
                    <Button
                      content="View Details"
                      padding="py-2 px-4"
                      fontSize="text-base"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-lg text-center">
            <p className="text-xl mb-6">No properties have been added yet.</p>
            <p className="text-lg mb-6">Add your first property in Maharashtra to get started!</p>
            <Link to="/add-property" onClick={scrollToTop}>
              <Button
                content="Add Your First Property"
                padding="py-3 px-6"
                fontSize="text-xl"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyList; 