import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Facebook, Send, Heart, Navigation, Flame } from 'lucide-react';
import { restaurants } from '@/data/mockData';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isGuest } = useApp();
  const restaurant = restaurants.find((r) => r.id === id);
  const [activeTab, setActiveTab] = useState<'info' | 'menu' | 'location'>('info');
  const [menuFilter, setMenuFilter] = useState<string>('all');

  if (!restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Restaurant not found</p>
      </div>
    );
  }

  const name = language === 'km' ? restaurant.nameKh : restaurant.name;
  const desc = language === 'km' ? restaurant.descriptionKh : restaurant.description;
  const addr = language === 'km' ? restaurant.addressKh : restaurant.address;
  const lmk = language === 'km' ? restaurant.landmarkKh : restaurant.landmark;

  const openMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${restaurant.lat},${restaurant.lng}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero image */}
      <div className="relative">
        <img
          src={restaurant.photos[0]}
          alt={name}
          className="h-64 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 rounded-full bg-card/80 p-2 backdrop-blur-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <button className="absolute top-10 right-4 rounded-full bg-card/80 p-2 backdrop-blur-sm">
          <Heart size={20} className={restaurant.isFavorite ? 'fill-primary text-primary' : ''} />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-xl font-bold text-primary-foreground">{name}</h1>
          <div className="flex items-center gap-1 mt-1 text-primary-foreground/80 text-xs">
            <MapPin size={12} />
            <span>{lmk}</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        <button onClick={openMaps} className="flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-xs font-medium shadow-card">
          <Navigation size={14} className="text-primary" />
          {language === 'km' ? 'ទិសដៅ' : 'Directions'}
        </button>
        <a href={`tel:${restaurant.phone}`} className="flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-xs font-medium shadow-card">
          <Phone size={14} className="text-primary" />
          {language === 'km' ? 'ហៅទូរស័ព្ទ' : 'Call'}
        </a>
        {restaurant.facebookUrl && (
          <a href={restaurant.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-xs font-medium shadow-card">
            <Facebook size={14} className="text-primary" />
            Facebook
          </a>
        )}
        {restaurant.telegramUrl && (
          <a href={restaurant.telegramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full bg-card px-4 py-2 text-xs font-medium shadow-card">
            <Send size={14} className="text-primary" />
            Telegram
          </a>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border px-4">
        {(['info', 'menu', 'location'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
              activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'
            }`}
          >
            {tab === 'info' ? (language === 'km' ? 'ព័ត៌មាន' : 'Info')
              : tab === 'menu' ? (language === 'km' ? 'ម៉ឺនុយ' : 'Menu')
              : (language === 'km' ? 'ទីតាំង' : 'Location')}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-4 py-4 animate-fade-in">
        {activeTab === 'info' && (
          <div className="space-y-4">
            <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
            <div className="rounded-lg bg-card p-3 shadow-card space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-secondary" />
                <span className="font-medium">{language === 'km' ? 'ម៉ោងបើក' : 'Opening Hours'}</span>
              </div>
              {restaurant.openingHours.map((h, i) => (
                <div key={i} className="flex justify-between text-xs text-muted-foreground pl-6">
                  <span>{h.day}</span>
                  <span>{h.open} – {h.close}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between rounded-lg bg-card p-3 shadow-card">
              <span className="text-sm font-medium">{language === 'km' ? 'តម្លៃមធ្យម' : 'Average Price'}</span>
              <span className="text-sm font-semibold text-secondary">{restaurant.avgPriceUsd}</span>
            </div>
            {/* Photo gallery */}
            <div>
              <h3 className="text-sm font-semibold mb-2">{language === 'km' ? 'រូបភាព' : 'Photos'}</h3>
              <div className="flex gap-2 overflow-x-auto">
                {restaurant.photos.map((p, i) => (
                  <img key={i} src={p} alt="" className="h-28 w-36 flex-shrink-0 rounded-lg object-cover" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'menu' && (() => {
          const categories = ['all', ...Array.from(new Set(restaurant.menuItems.map(m => m.category)))];
          const filtered = menuFilter === 'all' ? restaurant.menuItems : restaurant.menuItems.filter(m => m.category === menuFilter);
          return (
            <div className="space-y-4">
              {/* Category filter chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMenuFilter(cat)}
                    className={`flex-shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      menuFilter === cat
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {cat === 'all' ? (language === 'km' ? 'ទាំងអស់' : 'All') : (language === 'km' ? restaurant.menuItems.find(m => m.category === cat)?.categoryKh || cat : cat)}
                  </button>
                ))}
              </div>

              {/* Menu items */}
              {filtered.map((item) => (
                <div key={item.id} className="flex gap-3 rounded-xl bg-card p-3 shadow-card">
                  <img
                    src={item.image}
                    alt={language === 'km' ? item.nameKh : item.name}
                    className="h-20 w-20 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold leading-tight">
                        {language === 'km' ? item.nameKh : item.name}
                      </h4>
                      {item.isPopular && (
                        <span className="flex items-center gap-0.5 flex-shrink-0 rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                          <Flame size={10} />
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                      {language === 'km' ? item.descriptionKh : item.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-secondary">{item.price}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {language === 'km' ? item.categoryKh : item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {activeTab === 'location' && (
          <div className="space-y-3">
            <div className="rounded-lg bg-card p-3 shadow-card space-y-2">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">{addr}</p>
                  <p className="text-xs text-muted-foreground mt-1">{lmk}</p>
                </div>
              </div>
            </div>
            <button
              onClick={openMaps}
              className="w-full rounded-lg bg-card p-4 shadow-card text-center"
            >
              <div className="rounded-lg bg-muted h-32 flex items-center justify-center mb-2">
                <MapPin size={32} className="text-primary" />
              </div>
              <span className="text-xs font-medium text-primary">
                {language === 'km' ? 'បើក Google Maps' : 'Open in Google Maps'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2">
        <div className="mx-auto max-w-[430px]">
          <button
            onClick={() => {
              if (isGuest) {
                navigate('/login');
              } else {
                navigate(`/book/${restaurant.id}`);
              }
            }}
            className="w-full rounded-xl gradient-hero py-3.5 text-sm font-bold text-primary-foreground shadow-elevated"
          >
            {isGuest
              ? (language === 'km' ? 'ចូលដើម្បីកក់' : 'Login to Book')
              : (language === 'km' ? 'កក់តុ' : 'Book Table')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
