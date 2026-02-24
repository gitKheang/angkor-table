import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarDays, Clock, Users, ChevronRight } from 'lucide-react';
import { bookings as mockBookings } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { useApp } from '@/context/AppContext';
import type { Booking } from '@/types';

const Bookings = () => {
  const { language, isGuest } = useApp();
  const navigate = useNavigate();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  if (isGuest) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 pb-20">
        <CalendarDays size={48} className="text-muted-foreground mb-4" />
        <h2 className="font-semibold mb-1">{language === 'km' ? 'ចូលដើម្បីមើលការកក់' : 'Login to View Bookings'}</h2>
        <p className="text-sm text-muted-foreground text-center mb-4">
          {language === 'km' ? 'អ្នកត្រូវចូលដើម្បីមើលការកក់របស់អ្នក' : 'You need to be logged in to see your bookings'}
        </p>
        <button onClick={() => navigate('/login')} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
          {language === 'km' ? 'ចូល' : 'Login'}
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const upcoming = mockBookings.filter((b) => b.date >= today && b.status !== 'cancelled');
  const past = mockBookings.filter((b) => b.date < today || b.status === 'cancelled');

  const displayList = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-lg font-bold">{language === 'km' ? 'ការកក់របស់ខ្ញុំ' : 'My Bookings'}</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-4 mb-4">
        {(['upcoming', 'past'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
              tab === t ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground shadow-card'
            }`}
          >
            {t === 'upcoming'
              ? (language === 'km' ? 'នាពេលខាងមុខ' : 'Upcoming')
              : (language === 'km' ? 'កន្លងមក' : 'Past')}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-3">
        {displayList.length === 0 && (
          <div className="py-16 text-center text-muted-foreground text-sm">
            {language === 'km' ? 'មិនមានការកក់' : 'No bookings'}
          </div>
        )}
        {displayList.map((booking) => (
          <BookingCard key={booking.id} booking={booking} language={language} />
        ))}
      </div>
    </div>
  );
};

const BookingCard = ({ booking, language }: { booking: Booking; language: 'en' | 'km' }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg bg-card p-3 shadow-card animate-fade-in">
      <div className="flex gap-3">
        <img src={booking.restaurantPhoto} alt="" className="h-16 w-16 rounded-md object-cover" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-sm truncate">{booking.restaurantName}</h3>
            <StatusBadge status={booking.status} />
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CalendarDays size={12} />{booking.date}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{booking.time}</span>
            <span className="flex items-center gap-1"><Users size={12} />{booking.guests}</span>
          </div>
          {booking.tableNumber && (
            <span className="inline-block mt-1.5 text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {booking.tableNumber}
            </span>
          )}
        </div>
      </div>

      {(booking.status === 'confirmed' || booking.status === 'pending') && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          <button
            onClick={() => navigate(`/book/${booking.restaurantId}`)}
            className="flex-1 rounded-lg bg-muted py-2 text-xs font-medium"
          >
            {language === 'km' ? 'កែប្រែ' : 'Modify'}
          </button>
          <button className="flex-1 rounded-lg bg-destructive/10 py-2 text-xs font-medium text-destructive">
            {language === 'km' ? 'លុបចោល' : 'Cancel'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Bookings;
