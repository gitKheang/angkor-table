import { useState } from 'react';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { restaurants as mockRestaurants, filterChips } from '@/data/mockData';
import RestaurantCard from '@/components/RestaurantCard';
import { useApp } from '@/context/AppContext';

const Home = () => {
  const { language } = useApp();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [restaurantList, setRestaurantList] = useState(mockRestaurants);

  const filtered = restaurantList.filter((r) => {
    const matchSearch =
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.nameKh.includes(search) ||
      r.address.toLowerCase().includes(search.toLowerCase()) ||
      r.landmark.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      !activeFilter ||
      (activeFilter === 'open' ? r.isOpenNow : r.categories.includes(activeFilter));

    return matchSearch && matchFilter;
  });

  const toggleFav = (id: string) => {
    setRestaurantList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="gradient-hero px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-bold text-primary-foreground font-khmer">
              {language === 'km' ? 'អង្គរ រីសើវ' : 'Angkor Reserve'}
            </h1>
            <div className="flex items-center gap-1 mt-0.5 text-primary-foreground/80 text-xs">
              <MapPin size={12} />
              <span>{language === 'km' ? 'ភ្នំពេញ' : 'Phnom Penh'}</span>
            </div>
          </div>
          <button className="rounded-full bg-primary-foreground/20 p-2">
            <SlidersHorizontal size={18} className="text-primary-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={language === 'km' ? 'ស្វែងរកភោជនីយដ្ឋាន...' : 'Search restaurant, area...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-card pl-10 pr-4 py-3 text-sm shadow-card placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
        {filterChips.map((chip) => (
          <button
            key={chip.value}
            onClick={() => setActiveFilter(activeFilter === chip.value ? null : chip.value)}
            className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeFilter === chip.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground shadow-card'
            }`}
          >
            {language === 'km' ? chip.labelKh : chip.label}
          </button>
        ))}
      </div>

      {/* Restaurant list */}
      <div className="flex flex-col gap-3 px-4">
        <h2 className="text-sm font-semibold text-muted-foreground">
          {language === 'km' ? `${filtered.length} ភោជនីយដ្ឋាន` : `${filtered.length} Restaurants`}
        </h2>
        {filtered.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} onToggleFav={toggleFav} />
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">
            {language === 'km' ? 'រកមិនឃើញភោជនីយដ្ឋាន' : 'No restaurants found'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
