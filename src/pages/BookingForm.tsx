import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, CalendarDays, Clock, Users, MessageSquare } from 'lucide-react';
import { restaurants } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useApp();
  const restaurant = restaurants.find((r) => r.id === id);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [request, setRequest] = useState('');
  const [error, setError] = useState('');

  if (!restaurant) {
    return <div className="flex min-h-screen items-center justify-center"><p>Not found</p></div>;
  }

  const name = language === 'km' ? restaurant.nameKh : restaurant.name;

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM',
  ];

  const handleSubmit = () => {
    setError('');
    if (!date) { setError(language === 'km' ? 'សូមជ្រើសរើសកាលបរិច្ឆេទ' : 'Please select a date'); return; }
    if (!time) { setError(language === 'km' ? 'សូមជ្រើសរើសម៉ោង' : 'Please select a time'); return; }
    if (guests < 1) { setError(language === 'km' ? 'ភ្ញៀវមិនអាច ០ បានទេ' : 'Guests cannot be 0'); return; }

    const selectedDate = new Date(date + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError(language === 'km' ? 'មិនអាចកក់ក្នុងអតីតកាលបានទេ' : 'Cannot book in the past');
      return;
    }

    navigate('/booking-confirmation', {
      state: {
        restaurantName: name,
        restaurantPhoto: restaurant.photos[0],
        date,
        time,
        guests,
        specialRequest: request,
        tableNumber: `T-${Math.floor(Math.random() * 20) + 1}`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2 shadow-card">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-base font-bold">{language === 'km' ? 'កក់តុ' : 'Book Table'}</h1>
          <p className="text-xs text-muted-foreground">{name}</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Date */}
        <div className="rounded-lg bg-card p-4 shadow-card">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <CalendarDays size={16} className="text-primary" />
            {language === 'km' ? 'កាលបរិច្ឆេទ' : 'Date'}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Time */}
        <div className="rounded-lg bg-card p-4 shadow-card">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Clock size={16} className="text-primary" />
            {language === 'km' ? 'ម៉ោង' : 'Time'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setTime(slot)}
                className={`rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                  time === slot
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Guests */}
        <div className="rounded-lg bg-card p-4 shadow-card">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Users size={16} className="text-primary" />
            {language === 'km' ? 'ចំនួនភ្ញៀវ' : 'Guests'}
          </label>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="rounded-full bg-muted p-2"
            >
              <Minus size={18} />
            </button>
            <span className="text-2xl font-bold w-8 text-center">{guests}</span>
            <button
              onClick={() => setGuests(Math.min(20, guests + 1))}
              className="rounded-full bg-muted p-2"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Special request */}
        <div className="rounded-lg bg-card p-4 shadow-card">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <MessageSquare size={16} className="text-primary" />
            {language === 'km' ? 'សំណើពិសេស' : 'Special Request'}
          </label>
          <textarea
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            placeholder={language === 'km' ? 'ឧ. ខួបកំណើត, នៅជិតបង្អួច, កៅអីទារក' : 'e.g. Birthday, Near window, High chair'}
            maxLength={500}
            rows={3}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm resize-none placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Policy */}
        <div className="rounded-lg bg-secondary/30 p-3">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            {language === 'km'
              ? '🕐 ការលុបចោលឥតគិតថ្លៃរហូតដល់ ២ ម៉ោងមុនពេលកក់។ គ្មានវត្តមានក្រោយ ៣០ នាទី។'
              : '🕐 Free cancellation up to 2 hours before booking. No-show after 30 minutes.'}
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-3">
            <p className="text-xs text-destructive font-medium">{error}</p>
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl gradient-hero py-3.5 text-sm font-bold text-primary-foreground shadow-elevated"
        >
          {language === 'km' ? 'បញ្ជាក់ការកក់' : 'Confirm Reservation'}
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
