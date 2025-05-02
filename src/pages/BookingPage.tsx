import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, CreditCard, Check } from 'lucide-react';
import { destinationData } from '../data/destinations';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDestination, setSelectedDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const selectedDestinationData = destinationData.find(d => d.id === selectedDestination);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // In a real app, this would be an API call to your backend
      const response = await fetch('https://bolt.new/setup/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinationId: selectedDestination,
          startDate,
          endDate,
          guests,
          amount: selectedDestinationData ? selectedDestinationData.price * guests : 0
        }),
      });

      const session = await response.json();
      
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      setShowThankYou(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You for Choosing Yatra!</h1>
          <p className="text-gray-600 mb-8">Your booking has been confirmed. Get ready for an amazing journey!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Book Your Tour</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="label">Select Destination</label>
                <div className="relative">
                  <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="input pl-10"
                    required
                  >
                    <option value="">Choose a destination</option>
                    {destinationData.map(dest => (
                      <option key={dest.id} value={dest.id}>{dest.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Start Date</label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="input pl-10"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">End Date</label>
                  <div className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="input pl-10"
                      min={startDate || new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
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

              {selectedDestinationData && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Price per person</span>
                    <span>₹{selectedDestinationData.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Total ({guests} guests)</span>
                    <span>₹{(selectedDestinationData.price * guests).toLocaleString('en-IN')}</span>
                  </div>
                  {selectedDestinationData.discount > 0 && (
                    <div className="flex justify-between mb-2 text-success-500">
                      <span>Discount ({selectedDestinationData.discount}%)</span>
                      <span>-₹{((selectedDestinationData.price * guests * selectedDestinationData.discount) / 100).toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Final Price</span>
                    <span>₹{(selectedDestinationData.price * guests * (1 - selectedDestinationData.discount / 100)).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !selectedDestination}
                className="btn btn-primary w-full py-3 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} className="mr-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;