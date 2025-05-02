import React from 'react';
import { MapPin, Award, Users, Shield, Clock, Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/15913452/pexels-photo-15913452/free-photo-of-food-stall-in-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.7)'
          }}
        ></div>
        <div className="absolute inset-0 bg-secondary-900/50"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Yatra
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Your trusted partner in exploring the wonders of India
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2018, Yatra began with a simple mission: to help travelers experience the true essence of India beyond the typical tourist trails. Our journey started when our founders, avid travelers themselves, realized that most tourism focused on famous landmarks while missing the rich cultural tapestry that makes India truly special.
              </p>
              <p className="text-gray-700 mb-4">
                We began by curating experiences in just three states, focusing on authentic local interactions, hidden gems, and sustainable practices. Today, we've grown to cover all of India's diverse regions, but our core philosophy remains unchanged – travel should transform, educate, and create meaningful connections.
              </p>
              <p className="text-gray-700">
                Every itinerary we create is thoughtfully designed to balance must-see attractions with off-the-beaten-path discoveries, ensuring our travelers experience both the iconic India from postcards and the real India that locals cherish.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/18074597/pexels-photo-18074597/free-photo-of-the-golden-temple-in-amritsar-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Golden Temple in Amritsar" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 w-2/3 bg-white p-4 rounded-lg shadow-lg">
                <p className="italic text-gray-700">
                  "India has the ability to make you fall in love with the chaos, the colors, and the contradictions. Our mission is to guide you through this beautiful maze."
                </p>
                <p className="font-medium mt-2">— Arjun & Meera, Founders</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do, from planning itineraries to selecting partners and training our guides.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-primary-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Heart size={24} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
              <p className="text-gray-600">
                We believe in showcasing the real India, beyond the tourist veneer. Our experiences connect travelers with genuine local culture, traditions, and people.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-secondary-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Shield size={24} className="text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Responsibility</h3>
              <p className="text-gray-600">
                We are committed to responsible tourism that respects local communities, preserves cultural heritage, and minimizes environmental impact.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-accent-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users size={24} className="text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
              <p className="text-gray-600">
                We design our experiences to be accessible and welcoming to all travelers, respecting diverse needs, abilities, and perspectives.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-primary-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award size={24} className="text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from meticulously planned itineraries to responsive customer support.
              </p>
            </div>
            
            {/* Value 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-secondary-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <MapPin size={24} className="text-secondary-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Local Impact</h3>
              <p className="text-gray-600">
                We believe tourism should benefit local communities. We partner with local businesses and contribute to community development initiatives.
              </p>
            </div>
            
            {/* Value 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover-lift">
              <div className="bg-accent-50 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Clock size={24} className="text-accent-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalization</h3>
              <p className="text-gray-600">
                We recognize that each traveler is unique. Our itineraries are customizable to match your interests, pace, and travel style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our diverse team of travel experts is passionate about creating unforgettable experiences across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="relative mb-4 mx-auto w-48 h-48 overflow-hidden rounded-full">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Arjun Mehta" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Arjun Mehta</h3>
              <p className="text-primary-600 mb-2">Co-Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                With 15+ years in travel and a deep love for Indian heritage, Arjun leads our vision for authentic tourism.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="text-center">
              <div className="relative mb-4 mx-auto w-48 h-48 overflow-hidden rounded-full">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Meera Shah" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Meera Shah</h3>
              <p className="text-primary-600 mb-2">Co-Founder & Creative Director</p>
              <p className="text-gray-600 text-sm">
                Former travel writer and photographer, Meera ensures our experiences capture the true essence of each destination.
              </p>
            </div>
            
            {/* Team Member 3 */}
            <div className="text-center">
              <div className="relative mb-4 mx-auto w-48 h-48 overflow-hidden rounded-full">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Vikram Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Vikram Singh</h3>
              <p className="text-primary-600 mb-2">Head of Operations</p>
              <p className="text-gray-600 text-sm">
                Logistics expert who ensures every tour runs smoothly, from transportation to accommodations.
              </p>
            </div>
            
            {/* Team Member 4 */}
            <div className="text-center">
              <div className="relative mb-4 mx-auto w-48 h-48 overflow-hidden rounded-full">
                <img 
                  src="https://images.pexels.com/photos/732425/pexels-photo-732425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Priya Sharma" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Priya Sharma</h3>
              <p className="text-primary-600 mb-2">Customer Experience Manager</p>
              <p className="text-gray-600 text-sm">
                Dedicated to making your journey perfect, Priya and her team provide 24/7 support to all travelers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore India with Us?</h2>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied travelers who have discovered the magic of India through our carefully crafted experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#booking" className="btn btn-primary px-8 py-3">
              Plan Your Trip
            </a>
            <a href="/contact" className="btn btn-outline px-8 py-3">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;