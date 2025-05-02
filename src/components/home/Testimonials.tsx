import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    text: 'My trip to Rajasthan was absolutely magical! The desert safari and the palace tour were highlights. The guides were knowledgeable, and the accommodations were perfect. Will definitely book again!'
  },
  {
    id: 2,
    name: 'Arjun Patel',
    location: 'Bangalore',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 4,
    text: 'The Kerala backwaters tour exceeded my expectations. The houseboat stay was peaceful and the food was delicious. I would have liked a bit more time at some locations, but overall it was a wonderful experience.'
  },
  {
    id: 3,
    name: 'Meera Reddy',
    location: 'Hyderabad',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    text: 'Our family trip to Himachal Pradesh was perfect! The snow-capped mountains, cozy stays, and adventure activities kept everyone happy. The team was responsive and helpful throughout our journey.'
  },
  {
    id: 4,
    name: 'Vikram Singh',
    location: 'Delhi',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    rating: 5,
    text: 'The Andaman Islands trip was the best decision ever! Crystal clear waters, pristine beaches, and the scuba diving experience was unreal. The entire trip was well-organized from start to finish.'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const nextTestimonial = () => {
    setDirection('right');
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection('left');
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div 
        className="bg-white rounded-xl shadow-md p-8 md:p-10 relative overflow-hidden"
        key={activeTestimonial.id}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary-100 rounded-bl-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-100 rounded-tr-full opacity-70"></div>
        
        <div 
          className={`relative z-10 animate-fadeIn ${
            direction === 'left' ? 'origin-left' : 'origin-right'
          }`}
        >
          <div className="flex items-center mb-6">
            <img 
              src={activeTestimonial.avatar} 
              alt={activeTestimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div className="ml-4">
              <h4 className="text-lg font-semibold">{activeTestimonial.name}</h4>
              <p className="text-gray-500">{activeTestimonial.location}</p>
              <div className="flex items-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < activeTestimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <blockquote className="text-gray-700 text-lg italic relative py-2">
            <span className="absolute top-0 left-0 text-6xl text-primary-200">"</span>
            <p className="relative z-10 pl-6">{activeTestimonial.text}</p>
            <span className="absolute bottom-0 right-0 text-6xl text-primary-200">"</span>
          </blockquote>
        </div>
        
        <div className="flex justify-between items-center mt-8">
          <div className="text-sm text-gray-500">
            {activeIndex + 1} of {testimonials.length}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;