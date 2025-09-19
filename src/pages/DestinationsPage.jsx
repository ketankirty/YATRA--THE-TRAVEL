import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, X, Star } from 'lucide-react';
import { destinationData } from '../data/destinations';
import DestinationCard from '../components/destinations/DestinationCard';

const DestinationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [filteredDestinations, setFilteredDestinations] = useState(destinationData);
  
  const [filters, setFilters] = useState({
    region: searchParams.get('region') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 100000,
    rating: Number(searchParams.get('rating')) || 0,
    duration: searchParams.get('duration') || '',
    type: searchParams.get('type') || '',
  });

  useEffect(() => {
    const filtered = destinationData.filter((destination) => {
      // Search term filter
      const matchesSearch = 
        !searchTerm || 
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.region.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Region filter
      const matchesRegion = !filters.region || destination.region === filters.region;
      
      // Price filter
      const matchesPrice = 
        destination.price >= filters.minPrice && 
        destination.price <= filters.maxPrice;
      
      // Rating filter
      const matchesRating = destination.rating >= filters.rating;
      
      // Duration filter
      const matchesDuration = !filters.duration || destination.duration.includes(filters.duration);
      
      // Type filter
      const matchesType = !filters.type || destination.type === filters.type;
      
      return matchesSearch && matchesRegion && matchesPrice && matchesRating && matchesDuration && matchesType;
    });
    
    setFilteredDestinations(filtered);
  }, [searchTerm, filters]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchTerm) params.set('search', searchTerm);
    if (filters.region) params.set('region', filters.region);
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice < 100000) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.rating > 0) params.set('rating', filters.rating.toString());
    if (filters.duration) params.set('duration', filters.duration);
    if (filters.type) params.set('type', filters.type);
    
    navigate({ search: params.toString() }, { replace: true });
  }, [searchTerm, filters, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      region: '',
      minPrice: 0,
      maxPrice: 100000,
      rating: 0,
      duration: '',
      type: '',
    });
    setSearchTerm('');
  };

  const getUniqueRegions = () => {
    const regions = [...new Set(destinationData.map(dest => dest.region))];
    return regions.sort();
  };

  const getUniqueTypes = () => {
    const types = [...new Set(destinationData.map(dest => dest.type))];
    return types.sort();
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/15351666/pexels-photo-15351666/free-photo-of-jaipur-city-palace.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.7)'
          }}
        ></div>
        <div className="absolute inset-0 bg-secondary-900/40"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
            Discover the perfect getaway from our curated collection of Indian destinations.
          </p>
          
          {/* Search bar */}
          <form 
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations, regions, or experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pr-12 py-3 bg-white/90 backdrop-blur-sm border-transparent shadow-md"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-primary-600"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="container-custom py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Filters */}
          <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-heading font-semibold flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
              </h3>
              <button 
                onClick={resetFilters}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Reset All
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Region Filter */}
              <div>
                <h4 className="font-medium mb-2">Region</h4>
                <select
                  value={filters.region}
                  onChange={(e) => handleFilterChange('region', e.target.value)}
                  className="input"
                >
                  <option value="">All Regions</option>
                  {getUniqueRegions().map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-600">Minimum (₹)</label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="1000"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm font-medium">₹{filters.minPrice.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Maximum (₹)</label>
                    <input
                      type="range"
                      min="10000"
                      max="100000"
                      step="1000"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm font-medium">₹{filters.maxPrice.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
              
              {/* Rating Filter */}
              <div>
                <h4 className="font-medium mb-2">Minimum Rating</h4>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleFilterChange('rating', rating)}
                      className={`p-1 rounded ${filters.rating === rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      <Star size={20} className={filters.rating >= rating ? "fill-yellow-500" : ""} />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Type Filter */}
              <div>
                <h4 className="font-medium mb-2">Type</h4>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="input"
                >
                  <option value="">All Types</option>
                  {getUniqueTypes().map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Duration Filter */}
              <div>
                <h4 className="font-medium mb-2">Duration</h4>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="input"
                >
                  <option value="">Any Duration</option>
                  <option value="3 Days">3 Days</option>
                  <option value="5 Days">5 Days</option>
                  <option value="7 Days">7 Days</option>
                  <option value="10 Days">10 Days</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Destinations */}
          <div className="w-full md:w-3/4">
            {filteredDestinations.length > 0 ? (
              <>
                <div className="mb-6 flex flex-wrap items-center justify-between">
                  <h2 className="text-lg font-medium">{filteredDestinations.length} destinations found</h2>
                  
                  {/* Active filters */}
                  <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                    {filters.region && (
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {filters.region}
                        <button
                          onClick={() => handleFilterChange('region', '')}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    {filters.type && (
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                        {filters.type}
                        <button
                          onClick={() => handleFilterChange('type', '')}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    {filters.rating > 0 && (
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                        {filters.rating}+ 
                        <Star size={14} className="mx-1 fill-yellow-500 text-yellow-500" />
                        <button
                          onClick={() => handleFilterChange('rating', 0)}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    
                    {searchTerm && (
                      <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                        "{searchTerm}"
                        <button
                          onClick={() => setSearchTerm('')}
                          className="ml-1 text-gray-500 hover:text-gray-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDestinations.map((destination) => (
                    <DestinationCard 
                      key={destination.id} 
                      destination={destination} 
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria to find more options.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationsPage;