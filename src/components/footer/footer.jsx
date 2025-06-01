import { Link } from 'react-router-dom';
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Clock,
  Award,
  Home,
  Search,
  Users,
  BookOpen,
  Shield,
  IndianRupee,
  Newspaper,
  Calculator,
  HelpCircle
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      {/* Quick Tools Bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/emi-calculator" className="flex items-center justify-center md:justify-start hover:text-blue-500 transition-colors">
              <Calculator className="h-5 w-5 mr-2" />
              <span>EMI Calculator</span>
            </a>
            <a href="/property-news" className="flex items-center justify-center md:justify-start hover:text-blue-500 transition-colors">
              <Newspaper className="h-5 w-5 mr-2" />
              <span>Property News</span>
            </a>
            <a href="/price-trends" className="flex items-center justify-center md:justify-start hover:text-blue-500 transition-colors">
              <IndianRupee className="h-5 w-5 mr-2" />
              <span>Price Trends</span>
            </a>
            <a href="/help-center" className="flex items-center justify-center md:justify-start hover:text-blue-500 transition-colors">
              <HelpCircle className="h-5 w-5 mr-2" />
              <span>Help Center</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="flex items-center">
              <Building className="h-12 w-12 text-blue-500" />
              <div className="ml-3">
                <span className="text-3xl font-bold text-white">Mahavastu</span>
                <p className="text-sm text-gray-400">Real Estate Excellence</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Maharashtra's premier real estate agency, bringing you the finest properties 
              across Mumbai, Pune, and beyond. Trusted by thousands for our expertise in 
              property dealing and Vastu consultation.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-all transform hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>



          <div className="space-y-6">
            <h3 className="text-white text-xl font-semibold flex items-center">
              <Search className="h-6 w-6 mr-2 text-blue-500" />
              Popular Locations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-medium mb-3">Mumbai Region</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/properties/andheri" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Andheri
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties/bandra" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Bandra
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties/thane" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Thane
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Pune Region</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/properties/kothrud" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Kothrud
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties/hinjewadi" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Hinjewadi
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties/wakad" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Wakad
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>



         
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white text-xl font-semibold flex items-center">
              <Phone className="h-6 w-6 mr-2 text-blue-500" />
              Contact Us
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="h-6 w-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <span className="text-white font-medium">Head Office:</span>
                  <address className="text-gray-400 mt-1 not-italic">
                    Office 501, Iconic Building<br />
                    Bandra West, Mumbai<br />
                    Maharashtra - 400050
                  </address>
                </div>
              </li>
              <li>
                <div className="flex items-center mb-2">
                  <Phone className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium">Call Us:</span>
                </div>
                <div className="ml-9 space-y-1">
                  <a href="tel:+912226401234" className="block text-gray-400 hover:text-blue-500 transition-colors">
                    +91 22 2640 1234 (Mumbai)
                  </a>
                  <a href="tel:+912026401234" className="block text-gray-400 hover:text-blue-500 transition-colors">
                    +91 20 2640 1234 (Pune)
                  </a>
                </div>
              </li>
              <li>
                <div className="flex items-center mb-2">
                  <Clock className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                  <span className="text-white font-medium">Business Hours:</span>
                </div>
                <div className="ml-9 space-y-1">
                  <p className="text-gray-400">Mon - Sat: 9:30 AM - 6:30 PM</p>
                  <p className="text-gray-400">Sunday: By Appointment</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-white text-xl font-semibold flex items-center">
              <BookOpen className="h-6 w-6 mr-2 text-blue-500" />
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Navigation</h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/featured" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Award className="h-4 w-4 mr-2" />
                      Featured
                    </Link>
                  </li>
                  <li>
                    <Link to="/popular" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Popular
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-medium">Account</h4>
                <ul className="space-y-3">
                  <li>
                    <Link to="/login" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-property" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center">
                      <Building className="h-4 w-4 mr-2" />
                      Add Property
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-gray-950 border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm text-center lg:text-left">
                {currentYear} Mahavastu. All rights reserved.
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <Link to="/privacy-policy" className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-blue-500 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/disclaimer" className="hover:text-blue-500 transition-colors">
                  Disclaimer
                </Link>
                <Link to="/refund-policy" className="hover:text-blue-500 transition-colors">
                  Refund Policy
                </Link>
                <Link to="/sitemap" className="hover:text-blue-500 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;