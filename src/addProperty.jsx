import { useState, useEffect, useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./context/cartContext";
import { maharashtraCities, cityDescriptions } from "./constants/maharashtraCities";
import { motion } from "framer-motion";
import { animationVariants } from "./constants/animationVariants";
import { useAuth } from './context/authContext';

const AddProperty = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { currentUser } = useAuth();
  const { addProperty } = useContext(CartContext);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    // Only allow sellers to access this page
    if (!currentUser || currentUser.role !== 'seller') {
      navigate('/');
      return;
    }
    document.title = " | Add Property";
  }, [currentUser, navigate]);
  
  const [formData, setFormData] = useState({
    name: "",
    location: "", // City
    address: {
      street: "",
      locality: "",
      landmark: "",
      pincode: ""
    },
    coordinates: {
      latitude: "",
      longitude: ""
    },
    propertyType: "apartment",
    price: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    amenities: [],
    nearbyPlaces: {
      schools: "",
      hospitals: "",
      markets: "",
      transportation: ""
    }
  });

  // State for image uploads
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // List of amenities to choose from
  const amenitiesList = [
    "Swimming Pool", "Gym", "Garden", "Parking", "Security", 
    "Elevator", "Power Backup", "Club House", "Children's Play Area", 
    "Sports Facility", "Gated Community", "24x7 Water Supply"
  ];

  // Property types
  const propertyTypes = [
    "apartment", "villa", "independent house", "plot", "penthouse", 
    "farmhouse", "studio apartment", "builder floor"
  ];

  // Auto-fill description when location changes
  useEffect(() => {
    if (formData.location && cityDescriptions[formData.location]) {
      setFormData(prev => ({
        ...prev,
        description: cityDescriptions[formData.location]
      }));
    }
  }, [formData.location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested objects in formData
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Limit to 5 images total
    if (uploadedImages.length + files.length > 5) {
      toast({
        title: "Maximum 5 images allowed",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Process each file
    const newImages = files.map(file => {
      // Validate file type
      if (!file.type.match('image.*')) {
        toast({
          title: "Only image files are allowed",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return null;
      }
      
      // Validate file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image size should be less than 5MB",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        return null;
      }
      
      return {
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
        type: file.type,
        id: Date.now() + Math.random().toString(36).substring(2, 9)
      };
    }).filter(Boolean); // Remove null entries
    
    setUploadedImages(prev => [...prev, ...newImages]);
    setIsUploading(false);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => {
      const updatedAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      
      return {
        ...prev,
        amenities: updatedAmenities
      };
    });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            coordinates: {
              latitude: position.coords.latitude.toFixed(6),
              longitude: position.coords.longitude.toFixed(6)
            }
          }));
          
          toast({
            title: "Location detected",
            description: "Coordinates have been added to the form",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        },
        (error) => {
          toast({
            title: "Error getting location",
            description: error.message,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.location || !formData.price) {
      toast({
        title: "Please fill all required fields",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
      return;
    }
    
    // Validate images
    if (uploadedImages.length === 0) {
      toast({
        title: "Please upload at least one property image",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
      return;
    }

    // In a real application, you would upload images to a server here
    // For demo purposes, we'll just use the preview URLs
    const imageUrls = uploadedImages.map(img => img.preview);

    // Add property
    const newProperty = {
      id: Date.now(), // Generate a unique ID
      name: formData.name,
      location: formData.location,
      address: formData.address,
      coordinates: formData.coordinates,
      propertyType: formData.propertyType,
      price: parseFloat(formData.price),
      description: formData.description,
      bedrooms: parseInt(formData.bedrooms) || 1,
      bathrooms: parseInt(formData.bathrooms) || 1,
      area: parseFloat(formData.area) || 0,
      images: imageUrls,
      mainImage: imageUrls[0], // First image as the main image
      amenities: formData.amenities,
      nearbyPlaces: formData.nearbyPlaces,
      type: "featured", // Set the property type as featured
      seller: {
        id: currentUser.id,
        name: currentUser.name || currentUser.email,
        role: currentUser.role,
        contact: currentUser.phone || "Contact via email"
      },
      listedDate: new Date().toISOString()
    };

    // Add to context
    if (addProperty) {
      const url = 'http://localhost:3000/api/v1/properties/add';
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        "body": JSON.stringify(newProperty)
      });

      if (!data.ok) {
        toast({
          title: "Failed to add property. Try again later.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top",
          containerStyle: {
            zIndex: 9999,
          },
        });
        return;
      }

      const res = await data.json();

      console.log("%c property added", res, "color: green, font-weight: bold");

      addProperty(newProperty);
      
      toast({
        title: "Property added successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
      
      // Reset form
      setFormData({
        name: "",
        location: "",
        address: {
          street: "",
          locality: "",
          landmark: "",
          pincode: ""
        },
        coordinates: {
          latitude: "",
          longitude: ""
        },
        propertyType: "apartment",
        price: "",
        description: "",
        bedrooms: "",
        bathrooms: "",
        area: "",
        amenities: [],
        nearbyPlaces: {
          schools: "",
          hospitals: "",
          markets: "",
          transportation: ""
        }
      });
      
      // Reset images
      setUploadedImages([]);
      
      // Navigate to home
      navigate("/");
    } else {
      toast({
        title: "Failed to add property. Try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
        containerStyle: {
          zIndex: 9999,
        },
      });
    }
  };

  // For drag and drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileList = {
        files: e.dataTransfer.files
      };
      handleImageUpload({ target: fileList });
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="bg-[url(/showcase2-page-images/showcase2-hero-bg.jpg)] bg-no-repeat bg-center bg-cover pt-44 pb-36 max-md:pt-36 max-md:pb-24 flex flex-col justify-center items-center text-white">
        <img
          src="/MahaVastu-logo-dark.svg"
          alt="MahaVastu Logo"
          className="w-44 max-lg:w-36 mb-6"
        />
        <motion.h1
          initial="initial"
          whileInView="animate"
          variants={animationVariants.zoomOut}
          viewport={{ once: true, amount: 0.2 }}
          className="text-6xl max-md:text-5xl font-semibold"
        >
          Add Property
        </motion.h1>
      </div>
      
      <div style={{ maxWidth: 1000 }} className="mx-auto bg-white rounded-lg shadow-lg p-8 border border-amber-100 my-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-800">List Your Maharashtra Property</h2>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-300 to-red-400 mx-auto mt-3"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Property Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter property name"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Property Type *</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                >
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter price"
                  required
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Number of bedrooms"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Number of bathrooms"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Area (sq ft)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Area in square feet"
                />
              </div>
            </div>
          </div>
          
          {/* Property Images Section */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Property Images *</h3>
            <div className="mb-4">
              <div 
                className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center cursor-pointer hover:bg-amber-50 transition-colors duration-300"
                onClick={() => fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                <div className="text-amber-700 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <p className="text-gray-700 font-medium mb-1">
                  {isUploading ? 'Uploading...' : 'Click to upload or drag images here'}
                </p>
                <p className="text-gray-500 text-sm">
                  Upload up to 5 high-quality images (Max 5MB each)
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Supported formats: JPG, PNG, WEBP
                </p>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                  className="mt-4 bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  Browse Files
                </button>
              </div>
            </div>
            
            {/* Image preview */}
            {uploadedImages.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-3">Uploaded Images ({uploadedImages.length}/5)</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
                        <img 
                          src={image.preview} 
                          alt={`Property image ${index + 1}`} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-500 truncate" style={{ maxWidth: '80%' }}>
                          {image.name}
                        </span>
                        
                        <button 
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                          title="Remove image"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      
                      {index === 0 && (
                        <div className="absolute top-2 left-2 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                          Main Image
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Location Section */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">City *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                >
                  <option value="">Select a city</option>
                  {maharashtraCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Street Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter street address"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Locality/Area</label>
                <input
                  type="text"
                  name="address.locality"
                  value={formData.address.locality}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter locality or area"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Landmark</label>
                <input
                  type="text"
                  name="address.landmark"
                  value={formData.address.landmark}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter nearby landmark"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">PIN Code</label>
                <input
                  type="text"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter PIN code"
                  maxLength="6"
                  pattern="[0-9]{6}"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Map Coordinates</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="coordinates.latitude"
                    value={formData.coordinates.latitude}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Latitude"
                  />
                  <input
                    type="text"
                    name="coordinates.longitude"
                    value={formData.coordinates.longitude}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Longitude"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  className="mt-2 bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Get Current Location
                </button>
              </div>
            </div>
          </div>
          
          {/* Nearby Places Section */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Nearby Places</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Schools & Colleges</label>
                <input
                  type="text"
                  name="nearbyPlaces.schools"
                  value={formData.nearbyPlaces.schools}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Nearby educational institutions"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Hospitals & Clinics</label>
                <input
                  type="text"
                  name="nearbyPlaces.hospitals"
                  value={formData.nearbyPlaces.hospitals}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Nearby healthcare facilities"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Markets & Malls</label>
                <input
                  type="text"
                  name="nearbyPlaces.markets"
                  value={formData.nearbyPlaces.markets}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Nearby shopping areas"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="mb-2 font-medium">Transportation</label>
                <input
                  type="text"
                  name="nearbyPlaces.transportation"
                  value={formData.nearbyPlaces.transportation}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Nearby bus stops, train stations, etc."
                />
              </div>
            </div>
          </div>
          
          {/* Amenities Section */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesList.map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Description Section */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Property Description</h3>
            <div className="flex flex-col">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter detailed property description"
                rows="6"
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">Description will be auto-filled based on selected city, but you can customize it.</p>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-md text-xl font-medium hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-md transition-all duration-200"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty; 