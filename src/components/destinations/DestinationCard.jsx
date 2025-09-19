import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Calendar } from 'lucide-react';

const DestinationCard = ({ destination }) => {
  return (
    <div className="card hover-lift">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
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
        
        {destination.discount > 0 && (
          <div className="absolute top-3 right-3 bg-success-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {destination.discount}% OFF
          </div>
        )}

        <div className="absolute top-3 left-3 flex items-center bg-white/90 backdrop-blur-sm text-yellow-500 text-sm font-medium px-2 py-1 rounded-full">
          <Star size={14} className="fill-yellow-500 mr-1" />
          <span>{destination.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="inline-flex items-center text-gray-600 text-sm">
            <Calendar size={16} className="mr-1" />
            {destination.duration}
          </span>
          <span className="inline-flex items-center text-gray-600 text-sm">
            <Users size={16} className="mr-1" />
            {destination.group ? `Group (${destination.groupSize})` : 'Private'}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{destination.description}</p>
        
        <div className="flex justify-between items-center pt-3 border-t">
          <div>
            <span className="text-primary-600 font-bold text-lg">₹{destination.price.toLocaleString('en-IN')}</span>
            <span className="text-gray-500 text-sm">/person</span>
          </div>
          <Link 
            to={`/destination/${destination.id}`}
            className="btn btn-primary py-1.5 px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;