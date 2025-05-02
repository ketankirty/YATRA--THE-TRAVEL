import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  return (
    <>
      <nav className={navClasses}>
        <div className="container-custom flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-primary-600">
              Yatra<span className="text-secondary-500">_</span>
              <small style={{fontSize:'15px'}}>The Travel Agency</small>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <NavLink 
                to="/" 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Home
              </NavLink>
              <NavLink 
                to="/destinations" 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Destinations
              </NavLink>
              <NavLink 
                to="/booking" 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Book Tour
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About Us
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact
              </NavLink>
              <NavLink 
                to="/news" 
                className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}
              >
                News
              </NavLink>
            </div>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  className="btn btn-outline flex items-center space-x-2"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <User size={18} />
                  <span>{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={16} />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-fadeIn">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Bookings
                    </Link>
                    <button 
                      onClick={logout} 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <button 
                  onClick={() => openAuthModal('login')} 
                  className="btn btn-outline flex items-center space-x-1"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
                <button 
                  onClick={() => openAuthModal('signup')} 
                  className="btn btn-primary"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg animate-fadeIn">
            <div className="container-custom py-4 flex flex-col space-y-3">
              <NavLink 
                to="/" 
                className={({isActive}) => `px-2 py-2 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'}`}
              >
                Home
              </NavLink>
              <NavLink 
                to="/destinations" 
                className={({isActive}) => `px-2 py-2 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'}`}
              >
                Destinations
              </NavLink>
              <NavLink 
                to="/booking" 
                className={({isActive}) => `px-2 py-2 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'}`}
              >
                Book Tour
              </NavLink>
              <NavLink 
                to="/about" 
                className={({isActive}) => `px-2 py-2 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'}`}
              >
                About Us
              </NavLink>
              <NavLink 
                to="/contact" 
                className={({isActive}) => `px-2 py-2 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'}`}
              >
                Contact
              </NavLink>
              <NavLink 
                to="/news" 
                className={({isActive}) => `px-2 py-2 rounded-md ${isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-800'}`}
              >
                News
              </NavLink>
              
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center px-2 py-2 text-gray-800">
                      <User size={18} className="mr-2" />
                      Profile
                    </Link>
                    <button 
                      onClick={logout} 
                      className="flex items-center w-full text-left px-2 py-2 text-gray-800"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button 
                      onClick={() => openAuthModal('login')} 
                      className="btn btn-outline w-full justify-start"
                    >
                      <LogIn size={18} className="mr-2" />
                      Login
                    </button>
                    <button 
                      onClick={() => openAuthModal('signup')} 
                      className="btn btn-primary w-full"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
          initialMode={authMode}
        />
      )}
      
      {/* Spacer to handle fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;