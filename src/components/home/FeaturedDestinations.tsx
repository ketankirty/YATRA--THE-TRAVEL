import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import { destinationData } from '../../data/destinations';

const FeaturedDestinations: React.FC = () => {
  // Get only the featured destinations (first 6)
  const featuredDestinations = destinationData.slice(0, 6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredDestinations.map((destination) => (
        <Link 
          key={destination.id} 
          to={`/destinations?id=${destination.id}`}
          className="card hover-lift group"
        >
          <div className="relative h-60 overflow-hidden">
            <img 
              src={destination.image} 
              alt={destination.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
              <div className="flex items-center text-sm">
                <MapPin size={16} className="mr-1" />
                <span>{destination.region}</span>
              </div>
            </div>
            
            {destination.featured && (
              <div className="absolute top-3 right-3 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                Featured
              </div>
            )}

            <div className="absolute top-3 left-3 flex items-center bg-white/90 backdrop-blur-sm text-yellow-500 text-sm font-medium px-2 py-1 rounded-full">
              <Star size={14} className="fill-yellow-500 mr-1" />
              <span>{destination.rating}</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-700">{destination.duration}</p>
              <p className="text-primary-600 font-bold">
                ₹{destination.price.toLocaleString('en-IN')}
                <span className="text-gray-500 text-sm font-normal"> /person</span>
              </p>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{destination.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeaturedDestinations;