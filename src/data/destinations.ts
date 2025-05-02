export interface Destination {
  id: string;
  name: string;
  region: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  rating: number;
  type: string;
  featured: boolean;
  group: boolean;
  groupSize?: number;
  discount: number;
}

export const destinationData: Destination[] = [
  {
    id: 'kerala-backwaters',
    name: 'Kerala Backwaters',
    region: 'Kerala',
    description: 'Experience the serene beauty of Kerala\'s backwaters on a traditional houseboat cruise through palm-fringed canals, lush paddy fields, and charming villages.',
    image: 'https://images.pexels.com/photos/7079776/pexels-photo-7079776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 25000,
    duration: '5 Days',
    rating: 4.8,
    type: 'Nature',
    featured: true,
    group: false,
    discount: 0
  },
  {
    id: 'rajasthan-heritage',
    name: 'Rajasthan Heritage Tour',
    region: 'Rajasthan',
    description: 'Explore the rich cultural heritage of Rajasthan through its magnificent palaces, imposing forts, and vibrant markets. Visit Jaipur, Udaipur, Jodhpur, and more.',
    image: 'https://images.pexels.com/photos/219906/pexels-photo-219906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 35000,
    duration: '7 Days',
    rating: 4.9,
    type: 'Cultural',
    featured: true,
    group: true,
    groupSize: 12,
    discount: 10
  },
  {
    id: 'goa-beaches',
    name: 'Goa Beach Retreat',
    region: 'Goa',
    description: 'Relax on the pristine beaches of Goa, enjoy water sports, savor delicious seafood, and experience the unique blend of Indian and Portuguese culture.',
    image: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 18000,
    duration: '5 Days',
    rating: 4.5,
    type: 'Beach',
    featured: true,
    group: true,
    groupSize: 8,
    discount: 0
  },
  {
    id: 'himachal-adventure',
    name: 'Himachal Adventure',
    region: 'Himachal Pradesh',
    description: 'Embark on an adventure-filled journey through the mountains of Himachal Pradesh. Trek, camp, and experience local culture in Manali, Dharamshala, and McLeod Ganj.',
    image: 'https://images.pexels.com/photos/13458334/pexels-photo-13458334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 28000,
    duration: '7 Days',
    rating: 4.7,
    type: 'Adventure',
    featured: false,
    group: true,
    groupSize: 10,
    discount: 5
  },
  {
    id: 'kashmir-paradise',
    name: 'Kashmir Paradise',
    region: 'Jammu & Kashmir',
    description: 'Discover why Kashmir is called "Paradise on Earth" with its stunning landscapes, Dal Lake, Mughal gardens, and the majestic Himalayas.',
    image: 'https://images.pexels.com/photos/11152428/pexels-photo-11152428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 32000,
    duration: '7 Days',
    rating: 4.9,
    type: 'Scenic',
    featured: true,
    group: false,
    discount: 0
  },
  {
    id: 'andaman-island-hopping',
    name: 'Andaman Island Hopping',
    region: 'Andaman & Nicobar',
    description: 'Explore the pristine beaches and crystal-clear waters of the Andaman Islands. Snorkel, dive, and island-hop in this tropical paradise.',
    image: 'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 40000,
    duration: '7 Days',
    rating: 4.8,
    type: 'Beach',
    featured: true,
    group: true,
    groupSize: 8,
    discount: 15
  },
  {
    id: 'varanasi-spiritual',
    name: 'Varanasi Spiritual Journey',
    region: 'Uttar Pradesh',
    description: 'Experience the spiritual essence of India in Varanasi, one of the world\'s oldest living cities. Witness the aarti ceremony on the banks of the Ganges.',
    image: 'https://images.pexels.com/photos/5458388/pexels-photo-5458388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 15000,
    duration: '3 Days',
    rating: 4.6,
    type: 'Cultural',
    featured: false,
    group: true,
    groupSize: 15,
    discount: 0
  },
  {
    id: 'northeast-explorer',
    name: 'Northeast Explorer',
    region: 'Assam',
    description: 'Discover the unexplored beauty of Northeast India. Visit Kaziranga National Park, Majuli Island, and experience the unique tribal cultures.',
    image: 'https://images.pexels.com/photos/6159152/pexels-photo-6159152.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 45000,
    duration: '10 Days',
    rating: 4.7,
    type: 'Wildlife',
    featured: false,
    group: true,
    groupSize: 6,
    discount: 0
  },
  {
    id: 'ladakh-adventure',
    name: 'Ladakh Adventure',
    region: 'Ladakh',
    description: 'Embark on the ultimate adventure in Ladakh\'s high-altitude desert. Visit monasteries, drive through mountain passes, and see the stunning Pangong Lake.',
    image: 'https://images.pexels.com/photos/4351050/pexels-photo-4351050.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 38000,
    duration: '7 Days',
    rating: 4.9,
    type: 'Adventure',
    featured: true,
    group: true,
    groupSize: 8,
    discount: 0
  },
  {
    id: 'golden-triangle',
    name: 'Golden Triangle Tour',
    region: 'Delhi',
    description: 'Explore India\'s three most visited cities - Delhi, Agra, and Jaipur. See the Taj Mahal, Red Fort, Amber Fort, and other iconic landmarks.',
    image: 'https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 22000,
    duration: '5 Days',
    rating: 4.5,
    type: 'Cultural',
    featured: false,
    group: true,
    groupSize: 15,
    discount: 10
  },
  {
    id: 'mysore-coorg',
    name: 'Mysore & Coorg',
    region: 'Karnataka',
    description: 'Experience the grandeur of Mysore Palace and the coffee plantations of Coorg. A perfect blend of history, nature, and culture.',
    image: 'https://images.pexels.com/photos/7341344/pexels-photo-7341344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 20000,
    duration: '5 Days',
    rating: 4.4,
    type: 'Nature',
    featured: false,
    group: false,
    discount: 0
  },
  {
    id: 'rishikesh-yoga',
    name: 'Rishikesh Yoga Retreat',
    region: 'Uttarakhand',
    description: 'Rejuvenate your mind, body, and soul with a yoga retreat in Rishikesh, the yoga capital of the world, nestled in the foothills of the Himalayas.',
    image: 'https://images.pexels.com/photos/4534092/pexels-photo-4534092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 30000,
    duration: '7 Days',
    rating: 4.8,
    type: 'Wellness',
    featured: true,
    group: true,
    groupSize: 12,
    discount: 5
  }
];