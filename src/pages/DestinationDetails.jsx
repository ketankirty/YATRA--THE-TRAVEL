import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Star, Clock, Info, Camera, Coffee, Map, DollarSign } from 'lucide-react';
import { destinationData } from '../data/destinations';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);

  const destination = destinationData.find(d => d.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Destination not found</h2>
          <button 
            onClick={() => navigate('/destinations')}
            className="btn btn-primary"
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = async () => {
    setLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // In a real app, this would be an API call to your backend
      const response = await fetch('https://bolt.new/setup/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId: destination.id,
          date: selectedDate,
          guests,
          amount: destination.price * guests
        }),
      });

      const session = await response.json();
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{destination.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin size={20} className="mr-2" />
                {destination.region}
              </div>
              <div className="flex items-center">
                <Star size={20} className="mr-2 fill-yellow-500 text-yellow-500" />
                {destination.rating} Rating
              </div>
              <div className="flex items-center">
                <Clock size={20} className="mr-2" />
                {destination.duration}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-600">{destination.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock size={24} className="mx-auto mb-2 text-primary-500" />
                  <p className="font-medium">{destination.duration}</p>
                  <p className="text-sm text-gray-500">Duration</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users size={24} className="mx-auto mb-2 text-primary-500" />
                  <p className="font-medium">
                    {destination.group ? `Up to ${destination.groupSize}` : 'Private'}
                  </p>
                  <p className="text-sm text-gray-500">Group Size</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Map size={24} className="mx-auto mb-2 text-primary-500" />
                  <p className="font-medium">{destination.type}</p>
                  <p className="text-sm text-gray-500">Tour Type</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Coffee size={24} className="mx-auto mb-2 text-primary-500" />
                  <p className="font-medium">Included</p>
                  <p className="text-sm text-gray-500">Meals & Stay</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Tour Highlights</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Info size={20} className="mr-2 text-primary-500 flex-shrink-0 mt-1" />
                  <span>Expert local guides who know the region inside out</span>
                </li>
                <li className="flex items-start">
                  <Camera size={20} className="mr-2 text-primary-500 flex-shrink-0 mt-1" />
                  <span>Visit the most photogenic spots and hidden gems</span>
                </li>
                <li className="flex items-start">
                  <Coffee size={20} className="mr-2 text-primary-500 flex-shrink-0 mt-1" />
                  <span>Authentic local cuisine and comfortable accommodations</span>
                </li>
                <li className="flex items-start">
                  <Users size={20} className="mr-2 text-primary-500 flex-shrink-0 mt-1" />
                  <span>Small groups ensure personalized attention</span>
                </li>
              </ul>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={`Gallery ${i}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-3xl font-bold text-primary-600">
                    ₹{destination.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-gray-500">/person</span>
                </div>
                {destination.discount > 0 && (
                  <span className="bg-success-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                    {destination.discount}% OFF
                  </span>
                )}
              </div>

              <form className="space-y-4">
                <div>
                  <label className="label">Select Date</label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="input pl-10"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Number of Guests</label>
                  <div className="relative">
                    <Users size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="input pl-10"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Price ({guests} guests)</span>
                    <span>₹{(destination.price * guests).toLocaleString('en-IN')}</span>
                  </div>
                  {destination.discount > 0 && (
                    <div className="flex justify-between mb-2 text-success-500">
                      <span>Discount</span>
                      <span>-₹{((destination.price * guests * destination.discount) / 100).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>₹{(destination.price * guests * (1 - destination.discount / 100)).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleBooking}
                  disabled={!selectedDate || loading}
                  className="btn btn-primary w-full py-3 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign size={20} className="mr-2" />
                      Book Now
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center mb-2">
                  <Info size={16} className="mr-2" />
                  Free cancellation up to 48 hours before the tour
                </p>
                <p className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  Instant confirmation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;