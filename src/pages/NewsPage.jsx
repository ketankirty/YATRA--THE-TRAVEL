import React, { useState } from 'react';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'Top 10 Hidden Beaches in Goa That Tourists Don\'t Know About',
    excerpt: 'Discover secluded paradise beaches in Goa that are off the typical tourist trail and offer pristine sands and crystal clear waters.',
    content: '',
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Priya Sharma',
    date: 'June 15, 2025',
    category: 'Destinations',
    tags: ['Goa', 'Beaches', 'Off-beat']
  },
  {
    id: '2',
    title: 'A Culinary Journey Through Kerala: Must-Try Traditional Dishes',
    excerpt: 'Embark on a gastronomic adventure through God\'s Own Country and explore the rich flavors of authentic Kerala cuisine.',
    content: '',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Rahul Menon',
    date: 'May 28, 2025',
    category: 'Food & Culture',
    tags: ['Kerala', 'Food', 'Culture']
  },
  {
    id: '3',
    title: 'Sustainable Tourism Initiatives in the Himalayas: How Travelers Can Help',
    excerpt: 'Learn about conservation efforts in the Himalayan region and how responsible tourism practices can help preserve this fragile ecosystem.',
    content: '',
    image: 'https://images.pexels.com/photos/3756744/pexels-photo-3756744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Vikram Singh',
    date: 'May 10, 2025',
    category: 'Responsible Travel',
    tags: ['Himalayas', 'Sustainability', 'Eco-Tourism']
  },
  {
    id: '4',
    title: 'Upcoming Festivals in India: Plan Your Cultural Adventure',
    excerpt: 'A comprehensive guide to India\'s vibrant festivals in the coming months and how to experience them like a local.',
    content: '',
    image: 'https://images.pexels.com/photos/5409751/pexels-photo-5409751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Arjun Patel',
    date: 'April 22, 2025',
    category: 'Events',
    tags: ['Festivals', 'Culture', 'Events']
  },
  {
    id: '5',
    title: 'Rajasthan Through a Photographer\'s Lens: Capturing the Desert State',
    excerpt: 'Professional travel photographer shares tips for capturing the vivid colors, architectural wonders, and desert landscapes of Rajasthan.',
    content: '',
    image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Meera Shah',
    date: 'April 5, 2025',
    category: 'Photography',
    tags: ['Rajasthan', 'Photography', 'Travel Tips']
  },
  {
    id: '6',
    title: 'Monsoon Travel in India: Best Destinations to Visit During the Rainy Season',
    excerpt: 'Discover the lush green landscapes and magical atmosphere of India during the monsoon season, with recommendations for the best places to visit.',
    content: '',
    image: 'https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    author: 'Sandeep Kumar',
    date: 'March 18, 2025',
    category: 'Destinations',
    tags: ['Monsoon', 'Travel Tips', 'Weather']
  }
];

const categories = [
  'Destinations', 
  'Food & Culture', 
  'Responsible Travel', 
  'Events', 
  'Photography', 
  'Travel Tips'
];

const allTags = [
  'Goa', 'Beaches', 'Off-beat', 'Kerala', 'Food', 'Culture', 
  'Himalayas', 'Sustainability', 'Eco-Tourism', 'Festivals', 
  'Events', 'Rajasthan', 'Photography', 'Travel Tips', 'Monsoon', 'Weather'
];

const NewsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/19454349/pexels-photo-19454349/free-photo-of-sunset-in-jaisalmer-rajasthan-india.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
            filter: 'brightness(0.7)'
          }}
        ></div>
        <div className="absolute inset-0 bg-secondary-900/50"></div>
        
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Travel News & Blog
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto">
            Insights, guides, and stories from across incredible India
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pr-12 py-3"
                  />
                  <button 
                    className="absolute right-0 top-0 h-full px-4 text-gray-600 hover:text-primary-600"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </div>
              
              {/* Featured Post */}
              {filteredPosts.length > 0 && (
                <div className="mb-10">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-80">
                      <img 
                        src={filteredPosts[0].image} 
                        alt={filteredPosts[0].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar size={16} className="mr-1" />
                        <span className="mr-4">{filteredPosts[0].date}</span>
                        <User size={16} className="mr-1" />
                        <span>{filteredPosts[0].author}</span>
                      </div>
                      <h2 className="text-2xl font-bold mb-3">{filteredPosts[0].title}</h2>
                      <p className="text-gray-600 mb-4">{filteredPosts[0].excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {filteredPosts[0].tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={`/blog/${filteredPosts[0].id}`} 
                        className="text-primary-600 font-medium inline-flex items-center hover:text-primary-700"
                      >
                        Read more
                        <ArrowRight size={16} className="ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Blog Posts */}
              {filteredPosts.length > 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.slice(1).map(post => (
                    <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover-lift">
                      <div className="relative h-48">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <Calendar size={14} className="mr-1" />
                          <span className="mr-3">{post.date}</span>
                          <User size={14} className="mr-1" />
                          <span>{post.author}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                        <a 
                          href={`/blog/${post.id}`} 
                          className="text-primary-600 text-sm font-medium inline-flex items-center hover:text-primary-700"
                        >
                          Read more
                          <ArrowRight size={14} className="ml-1" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria to find more options.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('');
                      setSelectedTags([]);
                    }}
                    className="btn btn-primary"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : null}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory('')}
                      className={`w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 ${!selectedCategory ? 'font-medium text-primary-600' : 'text-gray-700'}`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category}>
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-2 py-1 rounded-md hover:bg-gray-100 ${selectedCategory === category ? 'font-medium text-primary-600' : 'text-gray-700'}`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Tags */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Tag size={18} className="mr-2 text-primary-500" />
                  <h3 className="text-xl font-bold">Popular Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedTags.includes(tag) 
                          ? 'bg-primary-500 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-primary-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 mb-4">
                  Get the latest travel tips, destination guides, and exclusive offers delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="input"
                    required
                  />
                  <button type="submit" className="btn btn-primary w-full">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;