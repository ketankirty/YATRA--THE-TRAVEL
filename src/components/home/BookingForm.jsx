import React, { useState } from 'react';
import { Calendar, MapPin, Search, Users } from 'lucide-react';

const BookingForm = () => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [budget, setBudget] = useState('any');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      destination,
      startDate,
      endDate,
      guests,
      budget
    });
    // In a real app, this would navigate to search results or booking page
  };

  return (
    <div>
      <h3 className="text-2xl font-heading font-semibold mb-6">Find Your Perfect Trip</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {/* Destination */}
          <div className="md:col-span-1">
            <label htmlFor="destination" className="label">Destination</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-500" />
              </div>
              <select
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="input pl-10 appearance-none bg-white"
                required
              >
                <option value="">Select Destination</option>
                <option value="kerala">Kerala</option>
                <option value="rajasthan">Rajasthan</option>
                <option value="goa">Goa</option>
                <option value="himachal">Himachal Pradesh</option>
                <option value="andaman">Andaman & Nicobar</option>
                <option value="uttarakhand">Uttarakhand</option>
                <option value="sikkim">Sikkim</option>
                <option value="kashmir">Kashmir</option>
                <option value="meghalaya">Meghalaya</option>
              </select>
            </div>
          </div>
          
          {/* Check-in date */}
          <div>
            <label htmlFor="startDate" className="label">Check-in Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-500" />
              </div>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input pl-10"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          {/* Check-out date */}
          <div>
            <label htmlFor="endDate" className="label">Check-out Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-500" />
              </div>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input pl-10"
                required
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          {/* Guests */}
          <div>
            <label htmlFor="guests" className="label">Guests</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users size={18} className="text-gray-500" />
              </div>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="input pl-10 appearance-none bg-white"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
                <option value={6}>6+ Guests</option>
              </select>
            </div>
          </div>
          
          {/* Budget */}
          <div>
            <label htmlFor="budget" className="label">Budget Range</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <select
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="input pl-10 appearance-none bg-white"
              >
                <option value="any">Any Budget</option>
                <option value="economy">Economy (Under ₹10,000)</option>
                <option value="standard">Standard (₹10,000 - ₹30,000)</option>
                <option value="premium">Premium (₹30,000 - ₹50,000)</option>
                <option value="luxury">Luxury (₹50,000+)</option>
              </select>
            </div>
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary py-3 w-full md:w-auto px-8 flex items-center justify-center">
          <Search size={18} className="mr-2" />
          Search Trips
        </button>
      </form>
    </div>
  );
};

export default BookingForm;