import { Property, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'all', label: 'All Spaces', iconName: 'LayoutGrid' },
  { id: 'studio', label: 'Pro Studios', iconName: 'Camera' },
  { id: 'industrial', label: 'Industrial', iconName: 'Factory' },
  { id: 'podcast', label: 'Podcast', iconName: 'Mic' },
  { id: 'rooftop', label: 'Rooftop', iconName: 'Sun' },
  { id: 'apartment', label: 'Lifestyle', iconName: 'Home' },
  { id: 'greenscreen', label: 'Green Screen', iconName: 'Square' },
  { id: 'warehouse', label: 'Warehouse', iconName: 'Container' },
  { id: 'mansion', label: 'Luxury', iconName: 'Gem' },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Sunlit Industrial Loft in Downtown',
    location: 'Arts District, LA',
    distance: '2 miles away',
    dates: 'Available now',
    pricePerHour: 75,
    rating: 4.98,
    reviewsCount: 124,
    images: [
      'https://picsum.photos/800/600?random=1',
      'https://picsum.photos/800/600?random=11',
      'https://picsum.photos/800/600?random=12'
    ],
    category: 'industrial',
    isGuestFavorite: true,
    type: 'Daylight Studio',
    maxCrewSize: 15,
    host: { id: 'h1', name: 'Sarah', avatar: 'https://picsum.photos/50/50?random=101', isSuperHost: true },
    amenities: ['Natural Light', 'Cargo Elevator', 'Makeup Station', 'Wifi'],
    description: 'A 2000sq ft industrial loft with south-facing windows. Perfect for fashion shoots, interviews, and music videos. Features original brick walls and concrete floors.'
  },
  {
    id: '2',
    title: 'Soundproof Podcast Haven',
    location: 'Brooklyn, NY',
    distance: '5 miles away',
    dates: 'Oct 23 - 28',
    pricePerHour: 45,
    rating: 4.85,
    reviewsCount: 89,
    images: [
      'https://picsum.photos/800/600?random=2',
      'https://picsum.photos/800/600?random=21'
    ],
    category: 'podcast',
    isGuestFavorite: false,
    type: 'Recording Studio',
    maxCrewSize: 4,
    host: { id: 'h2', name: 'Marcus', avatar: 'https://picsum.photos/50/50?random=102', isSuperHost: false },
    amenities: ['Shure SM7Bs', 'Rodecaster Pro', 'Acoustic Treatment', 'RGB Lighting'],
    description: 'Turn-key podcast studio equipped with industry standard gear. Just bring your SD card. Includes a lounge area for guests.'
  },
  {
    id: '3',
    title: 'Cyberpunk Neon Warehouse',
    location: 'East London, UK',
    distance: '10 miles away',
    dates: 'Nov 1 - 5',
    pricePerHour: 150,
    rating: 4.92,
    reviewsCount: 210,
    images: [
      'https://picsum.photos/800/600?random=3',
      'https://picsum.photos/800/600?random=31'
    ],
    category: 'warehouse',
    isGuestFavorite: true,
    type: 'Production Set',
    maxCrewSize: 50,
    host: { id: 'h3', name: 'Studio X', avatar: 'https://picsum.photos/50/50?random=103', isSuperHost: true },
    amenities: ['3 Phase Power', 'DMX Lighting', 'Haze Machine', 'Vehicle Access'],
    description: 'Gritty, cinematic warehouse space pre-rigged with programmable neon tubes. Ideal for music videos and car commercials.'
  },
  {
    id: '4',
    title: 'Mid-Century Modern Home',
    location: 'Palm Springs, CA',
    distance: '120 miles away',
    dates: 'Available next week',
    pricePerHour: 200,
    rating: 5.0,
    reviewsCount: 45,
    images: [
      'https://picsum.photos/800/600?random=4',
      'https://picsum.photos/800/600?random=41'
    ],
    category: 'mansion',
    isGuestFavorite: true,
    type: 'Lifestyle Home',
    maxCrewSize: 20,
    host: { id: 'h4', name: 'Elena', avatar: 'https://picsum.photos/50/50?random=104', isSuperHost: true },
    amenities: ['Pool', 'Vintage Furniture', 'Desert View', 'Full Kitchen'],
    description: 'Authentic 1960s architecture. Featured in multiple architectural digests. Great for lifestyle photography and high-end commercials.'
  },
  {
    id: '5',
    title: 'Infinity Cyclorama Studio',
    location: 'Culver City, CA',
    distance: '3 miles away',
    dates: 'Available now',
    pricePerHour: 90,
    rating: 4.75,
    reviewsCount: 32,
    images: [
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=51'
    ],
    category: 'studio',
    isGuestFavorite: false,
    type: 'Photo Studio',
    maxCrewSize: 12,
    host: { id: 'h5', name: 'David', avatar: 'https://picsum.photos/50/50?random=105', isSuperHost: false },
    amenities: ['2 Wall Cyc', 'Profoto Lighting', 'Grip Package', 'Steamer'],
    description: 'Clean white space with a 2-wall hard cyclorama. Grip package included in the rental price.'
  },
  {
    id: '6',
    title: 'Urban Rooftop with Skyline',
    location: 'Chicago, IL',
    distance: 'City Center',
    dates: 'Jun 10 - 15',
    pricePerHour: 120,
    rating: 4.88,
    reviewsCount: 156,
    images: [
      'https://picsum.photos/800/600?random=6',
      'https://picsum.photos/800/600?random=61'
    ],
    category: 'rooftop',
    isGuestFavorite: true,
    type: 'Outdoor Set',
    maxCrewSize: 25,
    host: { id: 'h6', name: 'Mike', avatar: 'https://picsum.photos/50/50?random=106', isSuperHost: true },
    amenities: ['Panoramic View', 'Power Outlets', 'Freight Elevator', 'Restrooms'],
    description: 'Unobstructed skyline views. Golden hour here is unmatched. Easy access via freight elevator.'
  },
   {
    id: '7',
    title: 'Green Screen VFX Stage',
    location: 'Burbank, CA',
    distance: 'Studio District',
    dates: 'Available now',
    pricePerHour: 110,
    rating: 4.6,
    reviewsCount: 18,
    images: [
      'https://picsum.photos/800/600?random=7',
      'https://picsum.photos/800/600?random=71'
    ],
    category: 'greenscreen',
    isGuestFavorite: false,
    type: 'VFX Studio',
    maxCrewSize: 15,
    host: { id: 'h7', name: 'VFX Co', avatar: 'https://picsum.photos/50/50?random=107', isSuperHost: false },
    amenities: ['Pre-lit Green Screen', 'Motion Capture Ready', 'Quiet AC'],
    description: 'Professional grade green screen cyclorama. Pre-lit with Kino Flos. Ideally for chroma key work.'
  },
  {
    id: '8',
    title: 'Bohemian Artist Apartment',
    location: 'Paris, France',
    distance: 'Le Marais',
    dates: 'Aug 1 - 30',
    pricePerHour: 250,
    rating: 4.95,
    reviewsCount: 340,
    images: [
      'https://picsum.photos/800/600?random=8',
      'https://picsum.photos/800/600?random=81'
    ],
    category: 'apartment',
    isGuestFavorite: true,
    type: 'Lifestyle',
    maxCrewSize: 8,
    host: { id: 'h8', name: 'Amelie', avatar: 'https://picsum.photos/50/50?random=108', isSuperHost: true },
    amenities: ['High Ceilings', 'Parquet Floors', 'Antique Decor'],
    description: 'A classic Parisian apartment with stunning light and texture. Very strictly limited crew size.'
  }
];