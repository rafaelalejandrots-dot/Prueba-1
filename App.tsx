import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Globe, Menu, UserCircle, Map, Heart, Star, 
  ChevronRight, ChevronLeft, Share, X, SlidersHorizontal,
  Camera, Mic, Sun, Home, Factory, Container, Square, Gem, LayoutGrid
} from 'lucide-react';
import { CATEGORIES, MOCK_PROPERTIES } from './constants';
import { Property, Category } from './types';

// --- Sub-components ---

const IconMap: Record<string, React.FC<any>> = {
  Camera, Mic, Sun, Home, Factory, Container, Square, Gem, LayoutGrid
};

const Header = ({ 
  isScrolled, 
  onSearchClick 
}: { 
  isScrolled: boolean; 
  onSearchClick: () => void;
}) => {
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled ? 'shadow-sm pb-4' : 'pb-6'}`}>
      <div className="max-w-[1760px] mx-auto px-6 xl:px-20 pt-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1 flex items-center gap-2 text-brand cursor-pointer">
          <div className="w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white">
            <Camera size={18} strokeWidth={2.5} />
          </div>
          <span className="text-brand font-bold text-xl hidden md:block tracking-tight">LensScout</span>
        </div>

        {/* Search Pill - Transforms based on scroll */}
        <div className="flex-1 flex justify-center">
          <button 
            onClick={onSearchClick}
            className={`flex items-center border border-neutral-300 rounded-full shadow-floating hover:shadow-md transition-shadow cursor-pointer ${isScrolled ? 'py-2.5 pl-4 pr-2' : 'py-3 pl-6 pr-2'}`}
          >
            <div className="flex items-center divide-x divide-neutral-300 text-sm">
              <span className="px-4 font-medium text-neutral-800 truncate max-w-[100px] md:max-w-none">Any location</span>
              <span className="px-4 font-medium text-neutral-800 hidden sm:block">Any week</span>
              <span className={`px-4 text-neutral-500 hidden sm:block ${isScrolled ? '' : ''}`}>Add crew</span>
            </div>
            <div className="bg-brand text-white p-2.5 rounded-full ml-2">
              <Search size={16} strokeWidth={3} />
            </div>
          </button>
        </div>

        {/* User Menu */}
        <div className="flex-1 flex justify-end items-center gap-2">
          <div className="hidden md:block font-medium text-sm px-4 py-3 hover:bg-neutral-100 rounded-full cursor-pointer transition">
            List your space
          </div>
          <div className="hidden md:block px-3 py-3 hover:bg-neutral-100 rounded-full cursor-pointer transition">
            <Globe size={18} />
          </div>
          <div className="flex items-center gap-3 border border-neutral-300 rounded-full p-1 pl-3 hover:shadow-md transition cursor-pointer ml-1">
            <Menu size={18} />
            <UserCircle size={30} className="text-neutral-500" fill="#717171" color="white" />
          </div>
        </div>
      </div>
    </header>
  );
};

const CategoryFilter = ({ 
  selectedCategory, 
  onSelect 
}: { 
  selectedCategory: string; 
  onSelect: (id: string) => void;
}) => {
  return (
    <div className="sticky top-[80px] pt-4 bg-white z-40 shadow-sm md:shadow-none">
      <div className="max-w-[1760px] mx-auto px-6 xl:px-20">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-4">
          {CATEGORIES.map((cat) => {
            const Icon = IconMap[cat.iconName] || LayoutGrid;
            const isSelected = selectedCategory === cat.id;
            return (
              <button 
                key={cat.id}
                onClick={() => onSelect(cat.id)}
                className={`flex flex-col items-center gap-2 min-w-[64px] cursor-pointer group transition-all opacity-70 hover:opacity-100 ${isSelected ? 'opacity-100' : ''}`}
              >
                <Icon 
                  size={24} 
                  className={`transition-all ${isSelected ? 'text-neutral-800 stroke-[2.5px]' : 'text-neutral-500 group-hover:text-neutral-800'}`} 
                />
                <span className={`text-xs whitespace-nowrap pb-2 border-b-2 transition-all ${isSelected ? 'font-medium text-neutral-800 border-neutral-800' : 'text-neutral-500 border-transparent group-hover:border-neutral-300'}`}>
                  {cat.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
};

const ListingCard: React.FC<{ property: Property; onClick: () => void }> = ({ property, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div 
      className="group flex flex-col gap-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative aspect-[20/19] overflow-hidden rounded-xl bg-neutral-200">
        <img 
          src={property.images[currentImageIndex]} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Guest Favorite Badge */}
        {property.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white/95 px-3 py-1 rounded-full shadow-md backdrop-blur-sm z-10">
            <span className="text-xs font-bold text-neutral-800">Guest favorite</span>
          </div>
        )}

        {/* Favorite Button */}
        <button className="absolute top-3 right-3 text-white hover:scale-110 transition z-10">
          <Heart size={24} className="fill-black/50 stroke-white" />
        </button>

        {/* Navigation Arrows (Visible on Hover) */}
        {isHovered && property.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white hover:scale-105 transition z-10"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-1.5 rounded-full shadow-md hover:bg-white hover:scale-105 transition z-10"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {property.images.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} 
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-neutral-800 truncate pr-2">{property.location}</h3>
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-neutral-800" />
            <span className="text-sm font-light text-neutral-800">{property.rating}</span>
          </div>
        </div>
        <p className="text-neutral-500 text-sm">{property.type}</p>
        <p className="text-neutral-500 text-sm">{property.dates}</p>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="font-semibold text-neutral-800">${property.pricePerHour}</span>
          <span className="text-neutral-800 text-sm">hour</span>
        </div>
      </div>
    </div>
  );
};

const PropertyModal = ({ property, onClose }: { property: Property; onClose: () => void }) => {
  if (!property) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-800/50 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-2/3 h-64 md:h-full overflow-y-auto bg-neutral-100 no-scrollbar">
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="col-span-1 md:col-span-2 aspect-video rounded-lg overflow-hidden">
               <img src={property.images[0]} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt="main" />
            </div>
             {property.images.slice(1).map((img, i) => (
               <div key={i} className="aspect-video rounded-lg overflow-hidden">
                 <img src={img} className="w-full h-full object-cover hover:scale-105 transition duration-700" alt={`gallery-${i}`} />
               </div>
             ))}
          </div>
          
          <div className="p-8 md:p-12 max-w-3xl mx-auto">
             <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-2">{property.title}</h1>
                  <p className="text-neutral-800 text-lg">{property.location} • {property.maxCrewSize} crew max</p>
                </div>
             </div>

             <div className="flex items-center gap-4 py-6 border-t border-b border-neutral-200 my-6">
                <img src={property.host.avatar} className="w-12 h-12 rounded-full object-cover" alt={property.host.name} />
                <div>
                  <p className="font-semibold text-neutral-800">Hosted by {property.host.name}</p>
                  <p className="text-neutral-500 text-sm">{property.host.isSuperHost ? 'Superhost • 3 years hosting' : 'Host'}</p>
                </div>
             </div>

             <div className="mb-8">
               <h3 className="text-xl font-semibold mb-4">About this space</h3>
               <p className="text-neutral-600 leading-relaxed">{property.description}</p>
             </div>

             <div className="mb-8">
               <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
               <div className="grid grid-cols-2 gap-4">
                 {property.amenities.map(am => (
                   <div key={am} className="flex items-center gap-3 text-neutral-700">
                     <div className="w-2 h-2 bg-brand rounded-full"></div>
                     {am}
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>

        {/* Sticky Booking Sidebar */}
        <div className="w-full md:w-1/3 bg-white border-l border-neutral-200 p-6 md:p-8 flex flex-col justify-between shadow-xl z-10">
           <div>
              <div className="flex justify-between items-end mb-6">
                 <div>
                   <span className="text-2xl font-bold">${property.pricePerHour}</span>
                   <span className="text-neutral-600"> / hour</span>
                 </div>
                 <div className="flex items-center gap-1 text-sm font-medium">
                    <Star size={14} className="fill-neutral-800" />
                    {property.rating} · <span className="text-neutral-500 underline">{property.reviewsCount} reviews</span>
                 </div>
              </div>

              <div className="border border-neutral-400 rounded-xl mb-4">
                 <div className="grid grid-cols-2 border-b border-neutral-400">
                    <div className="p-3 border-r border-neutral-400">
                      <label className="text-[10px] uppercase font-bold text-neutral-800 block">Date</label>
                      <span className="text-sm text-neutral-600">Select Date</span>
                    </div>
                    <div className="p-3">
                      <label className="text-[10px] uppercase font-bold text-neutral-800 block">Time</label>
                      <span className="text-sm text-neutral-600">10:00 AM - 6:00 PM</span>
                    </div>
                 </div>
                 <div className="p-3">
                    <label className="text-[10px] uppercase font-bold text-neutral-800 block">Crew Size</label>
                    <span className="text-sm text-neutral-600">5 people</span>
                 </div>
              </div>

              <button className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-3.5 rounded-lg transition transform active:scale-95 mb-4">
                Reserve
              </button>
              
              <p className="text-center text-xs text-neutral-500 mb-6">You won't be charged yet</p>

              <div className="space-y-3 text-neutral-600 text-sm">
                 <div className="flex justify-between">
                   <span className="underline">${property.pricePerHour} x 8 hours</span>
                   <span>${property.pricePerHour * 8}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="underline">Cleaning fee</span>
                   <span>$60</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="underline">Service fee</span>
                   <span>$45</span>
                 </div>
              </div>
           </div>

           <div className="border-t border-neutral-200 pt-4 mt-4 flex justify-between font-bold text-lg text-neutral-800">
              <span>Total</span>
              <span>${property.pricePerHour * 8 + 105}</span>
           </div>
        </div>

      </div>
    </div>
  );
};

const MobileNav = () => (
  <div className="fixed bottom-0 w-full bg-white border-t border-neutral-200 md:hidden flex justify-around py-3 z-50 pb-6 text-xs font-medium text-neutral-500">
     <div className="flex flex-col items-center gap-1 text-brand">
       <Search size={24} />
       <span>Explore</span>
     </div>
     <div className="flex flex-col items-center gap-1 hover:text-neutral-800">
       <Heart size={24} />
       <span>Wishlists</span>
     </div>
     <div className="flex flex-col items-center gap-1 hover:text-neutral-800">
       <Map size={24} />
       <span>Trips</span>
     </div>
     <div className="flex flex-col items-center gap-1 hover:text-neutral-800">
       <UserCircle size={24} />
       <span>Profile</span>
     </div>
  </div>
);

const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-neutral-100 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-white p-4 flex items-center gap-4 border-b border-neutral-200">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-neutral-100 border border-neutral-200">
          <X size={20} />
        </button>
        <input 
          type="text" 
          placeholder="Where to next?" 
          className="flex-1 text-lg font-medium outline-none placeholder:text-neutral-400"
          autoFocus 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xs font-bold text-neutral-500 uppercase mb-4">Recent searches</h3>
        <div className="flex items-center gap-4 text-neutral-600 mb-4 p-2 hover:bg-white rounded-lg cursor-pointer">
           <div className="bg-neutral-200 p-3 rounded-xl">
             <Factory size={20} />
           </div>
           <div>
             <p className="font-medium text-neutral-800">Industrial Warehouses</p>
             <p className="text-xs">Los Angeles · Next Week</p>
           </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProperties = useMemo(() => {
    if (selectedCategory === 'all') return MOCK_PROPERTIES;
    return MOCK_PROPERTIES.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-white text-neutral-800 font-sans pb-20 md:pb-0">
      
      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Main Header */}
      <Header 
        isScrolled={isScrolled} 
        onSearchClick={() => setIsSearchOpen(true)}
      />

      {/* Category Filter Bar - Pushes content down properly */}
      <div className="pt-24 md:pt-28">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelect={setSelectedCategory} 
        />
      </div>

      {/* Listings Grid */}
      <main className="max-w-[1760px] mx-auto px-6 xl:px-20 py-6">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10">
            {filteredProperties.map(property => (
              <ListingCard 
                key={property.id} 
                property={property} 
                onClick={() => setSelectedProperty(property)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
             <div className="bg-neutral-100 p-6 rounded-full mb-4">
               <Camera size={48} className="text-neutral-400" />
             </div>
             <h3 className="text-lg font-bold mb-2">No spaces found</h3>
             <p className="text-neutral-500 max-w-sm">Try selecting a different category or clearing your filters to see more results.</p>
             <button 
               onClick={() => setSelectedCategory('all')}
               className="mt-6 px-6 py-3 border border-neutral-800 text-neutral-800 font-medium rounded-lg hover:bg-neutral-50 transition"
              >
               Clear all filters
             </button>
          </div>
        )}
      </main>

      {/* Floating Map Toggle Button (Mobile/Desktop) */}
      <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-30">
        <button className="bg-neutral-800 hover:scale-105 hover:shadow-xl text-white px-5 py-3.5 rounded-full shadow-lg flex items-center gap-2 font-medium transition-all duration-300">
          <span>Show map</span>
          <Map size={18} />
        </button>
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyModal 
          property={selectedProperty} 
          onClose={() => setSelectedProperty(null)} 
        />
      )}

      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Simple Footer */}
      <footer className="hidden md:block border-t border-neutral-200 bg-neutral-100 mt-12">
        <div className="max-w-[1760px] mx-auto px-20 py-8 text-sm text-neutral-500 flex justify-between">
           <div className="flex gap-4">
             <span>© 2024 LensScout, Inc.</span>
             <span className="hover:underline cursor-pointer">Privacy</span>
             <span className="hover:underline cursor-pointer">Terms</span>
           </div>
           <div className="flex gap-4 font-semibold text-neutral-800">
              <span className="flex items-center gap-1 cursor-pointer"><Globe size={16}/> English (US)</span>
              <span className="cursor-pointer">$ USD</span>
           </div>
        </div>
      </footer>
    </div>
  );
}

export default App;