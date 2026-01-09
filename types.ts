export interface User {
  id: string;
  name: string;
  avatar: string;
  isSuperHost: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  distance: string;
  dates: string;
  pricePerHour: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  category: string;
  isGuestFavorite: boolean;
  type: string; // e.g., "Industrial Loft", "Green Screen Studio"
  maxCrewSize: number;
  host: User;
  amenities: string[];
  description: string;
}

export interface Category {
  id: string;
  label: string;
  iconName: string;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  crewSize: number;
  instantBook: boolean;
}