import { useNavigate } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import type { Restaurant } from '@/types';
import { useApp } from '@/context/AppContext';

interface Props {
  restaurant: Restaurant;
  onToggleFav?: (id: string) => void;
}

const RestaurantCard = ({ restaurant, onToggleFav }: Props) => {
  const navigate = useNavigate();
  const { language } = useApp();
  const name = language === 'km' ? restaurant.nameKh : restaurant.name;
  const landmark = language === 'km' ? restaurant.landmarkKh : restaurant.landmark;

  return (
    <div
      className="flex gap-3 rounded-lg bg-card p-3 shadow-card animate-fade-in cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
    >
      <img
        src={restaurant.photos[0]}
        alt={name}
        className="h-24 w-24 rounded-md object-cover flex-shrink-0"
      />
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm leading-tight truncate">{name}</h3>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFav?.(restaurant.id); }}
              className="flex-shrink-0 mt-0.5"
            >
              <Heart
                size={18}
                className={restaurant.isFavorite ? 'fill-primary text-primary' : 'text-muted-foreground'}
              />
            </button>
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <MapPin size={12} />
            <span className="truncate">{landmark}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
              restaurant.isOpenNow
                ? 'bg-success/10 text-success'
                : 'bg-destructive/10 text-destructive'
            }`}>
              {restaurant.isOpenNow ? (language === 'km' ? 'បើកឥឡូវ' : 'Open') : (language === 'km' ? 'បិទ' : 'Closed')}
            </span>
            <span className="text-[11px] text-muted-foreground">{restaurant.priceRange}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/book/${restaurant.id}`); }}
            className="rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground"
          >
            {language === 'km' ? 'កក់' : 'Book'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
