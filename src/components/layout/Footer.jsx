import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">
              Yatra<span className="text-primary-500">.</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Discover India's beauty with our expert-curated travel experiences. 
              From majestic mountains to serene beaches, we'll help you explore the 
              incredible diversity of our homeland.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-primary-500 transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-500 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-300 hover:text-primary-500 transition-colors">News & Blog</Link>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">Top Destinations</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations?location=kerala" className="text-gray-300 hover:text-primary-500 transition-colors">Kerala</Link>
              </li>
              <li>
                <Link to="/destinations?location=rajasthan" className="text-gray-300 hover:text-primary-500 transition-colors">Rajasthan</Link>
              </li>
              <li>
                <Link to="/destinations?location=goa" className="text-gray-300 hover:text-primary-500 transition-colors">Goa</Link>
              </li>
              <li>
                <Link to="/destinations?location=himachal" className="text-gray-300 hover:text-primary-500 transition-colors">Himachal Pradesh</Link>
              </li>
              <li>
                <Link to="/destinations?location=andaman" className="text-gray-300 hover:text-primary-500 transition-colors">Andaman Islands</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="text-primary-500 mr-3 mt-1 flex-shrink-0" />
                <p className="text-gray-300">
                  123 Travel Lane, Mumbai<br />
                  Maharashtra, India 400001
                </p>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="text-primary-500 mr-3 flex-shrink-0" />
                <p className="text-gray-300">+91 9876543210</p>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="text-primary-500 mr-3 flex-shrink-0" />
                <p className="text-gray-300">info@yatra-explore.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Yatra. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-primary-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 text-sm hover:text-primary-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-gray-400 text-sm hover:text-primary-500 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;