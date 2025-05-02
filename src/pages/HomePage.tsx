import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Search, Image } from 'lucide-react';
import BookingForm from '../components/home/BookingForm';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/2417842/pexels-photo-2417842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.7)'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Discover the<br />
              <span className="text-primary-500">Beauty of India</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Experience the rich heritage, diverse landscapes, and vibrant culture 
              of incredible India with our expertly crafted travel packages.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/destinations" className="btn btn-primary px-8 py-3 text-lg">
                Explore Destinations
              </Link>
              <a href="#booking" className="btn btn-outline bg-white/20 backdrop-blur-sm border-white text-white px-8 py-3 text-lg hover:bg-white/30">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-16 relative -mt-24 z-20">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore India's most beloved travel destinations, from serene beaches to majestic mountains,
              ancient temples to vibrant cities.
            </p>
          </div>
          
          <FeaturedDestinations />
          
          <div className="text-center mt-12">
            <Link 
              to="/destinations" 
              className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
            >
              View all destinations
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-primary-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin size={28} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Handpicked Destinations</h3>
              <p className="text-gray-600">
                We carefully select the most breathtaking and culturally rich destinations across India for an unforgettable experience.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-secondary-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar size={28} className="text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customized Itineraries</h3>
              <p className="text-gray-600">
                Tailor your travel plan to match your preferences, whether you seek adventure, relaxation, or cultural immersion.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-accent-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Image size={28} className="text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Experiences</h3>
              <p className="text-gray-600">
                Go beyond tourist attractions and connect with local communities, traditions, and authentic Indian experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-secondary-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Hear from those who have experienced the magic of India with us.
            </p>
          </div>
          
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/15351656/pexels-photo-15351656/free-photo-of-the-taj-mahal-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.4)'
          }}
        ></div>
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Indian Adventure?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Let us help you create memories that will last a lifetime.
            Start planning your perfect Indian getaway today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/destinations" className="btn btn-primary px-8 py-3 text-lg">
              Browse Destinations
            </Link>
            <a href="#booking" className="btn btn-outline border-white text-white px-8 py-3 text-lg hover:bg-white/20">
              Book Your Trip
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;