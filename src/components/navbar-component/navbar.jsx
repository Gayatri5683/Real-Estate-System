import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  src="/MahaVastu-logo.svg"
                  alt="MahaVastu Logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:border-amber-300 hover:text-amber-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Home
              </Link>
              <Link
                to="/featured"
                className={`${
                  isActive("/featured")
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:border-amber-300 hover:text-amber-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Featured
              </Link>
              <Link
                to="/popular"
                className={`${
                  isActive("/popular")
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:border-amber-300 hover:text-amber-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Popular
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive("/about")
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:border-amber-300 hover:text-amber-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`${
                  isActive("/contact")
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-500 hover:border-amber-300 hover:text-amber-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
              >
                Contact
              </Link>
              {currentUser &&
                currentUser.role &&
                (currentUser.role === "seller" ||
                  currentUser.role === "broker") && (
                  <Link
                    to="/add-property"
                    className={`${
                      isActive("/add-property")
                        ? "border-amber-500 text-amber-600"
                        : "border-transparent text-gray-500 hover:border-amber-300 hover:text-amber-700"
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                  >
                    Add Property
                  </Link>
                )}
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center gap-3 bg-amber-50 px-4 py-2 rounded-full border border-amber-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
                    <span className="text-white font-semibold">
                      {currentUser.name
                        ? currentUser.name[0].toUpperCase()
                        : currentUser.email[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-semibold text-amber-800 truncate max-w-[80px]" title={currentUser.name || currentUser.email}>
                      {currentUser.name || currentUser.email}
                    </p>
                    <p className="flex space-x-2 text-xs text-amber-600 font-medium">
                      <span>
                        {currentUser.role.charAt(0).toUpperCase() +
                          currentUser.role.slice(1)}
                      </span>
                      
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-md transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-amber-600 border border-amber-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-500 hover:text-amber-600 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden bg-white shadow-lg rounded-b-lg mt-2 overflow-hidden">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "bg-amber-50 border-amber-500 text-amber-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/featured"
              className={`${
                isActive("/featured")
                  ? "bg-amber-50 border-amber-500 text-amber-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Featured
            </Link>
            <Link
              to="/popular"
              className={`${
                isActive("/popular")
                  ? "bg-amber-50 border-amber-500 text-amber-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Popular
            </Link>
            <Link
              to="/about"
              className={`${
                isActive("/about")
                  ? "bg-amber-50 border-amber-500 text-amber-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive("/contact")
                  ? "bg-amber-50 border-amber-500 text-amber-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {currentUser &&
              currentUser.role &&
              (currentUser.role === "seller" ||
                currentUser.role === "broker") && (
                <Link
                  to="/add-property"
                  className={`${
                    isActive("/add-property")
                      ? "bg-amber-50 border-amber-500 text-amber-700"
                      : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Property
                </Link>
              )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
            {currentUser ? (
              <div className="px-4 py-3">
                <div className="mb-3">
                  <p className="text-base font-medium text-gray-800">
                    {currentUser.name || "User"}
                  </p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                  <p className="text-xs text-amber-600 capitalize mt-1">
                    Role: {currentUser.role}
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-md transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 py-3 space-y-3">
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-amber-500 to-amber-600 text-center text-white px-4 py-2 rounded-md text-sm font-medium hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 shadow-md transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full bg-white text-center text-amber-600 border border-amber-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
