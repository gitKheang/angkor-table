import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, CalendarDays, Clock, Users, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { language } = useApp();

  if (!state) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">No booking data</p>
      </div>
    );
  }

  const { restaurantName, restaurantPhoto, date, time, guests, specialRequest, tableNumber } = state;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 pb-20">
      <div className="w-full max-w-sm animate-fade-in">
        {/* Success icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="rounded-full bg-success/10 p-4 mb-3">
            <CheckCircle size={48} className="text-success" />
          </div>
          <h1 className="text-lg font-bold text-center">
            {language === 'km' ? 'ការកក់បានជោគជ័យ!' : 'Booking Successful!'}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'km' ? 'រង់ចាំការបញ្ជាក់ពីភោជនីយដ្ឋាន' : 'Pending restaurant confirmation'}
          </p>
        </div>

        {/* Booking details */}
        <div className="rounded-xl bg-card p-4 shadow-elevated space-y-4">
          <div className="flex items-center gap-3">
            <img src={restaurantPhoto} alt="" className="h-14 w-14 rounded-lg object-cover" />
            <div>
              <h2 className="font-semibold text-sm">{restaurantName}</h2>
              <span className="inline-flex items-center rounded-full bg-warning/10 px-2 py-0.5 text-[10px] font-medium text-warning mt-1">
                {language === 'km' ? 'រង់ចាំ' : 'Pending'}
              </span>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="space-y-3">
            {tableNumber && (
              <div className="flex items-center gap-3 text-sm">
                <div className="rounded-lg bg-primary/10 p-2">
                  <span className="text-xs font-bold text-primary">{tableNumber}</span>
                </div>
                <span className="text-muted-foreground">{language === 'km' ? 'លេខតុ' : 'Table Number'}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <CalendarDays size={16} className="text-primary" />
              <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-primary" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Users size={16} className="text-primary" />
              <span>{guests} {language === 'km' ? 'ភ្ញៀវ' : 'Guests'}</span>
            </div>
            {specialRequest && (
              <div className="rounded-lg bg-muted p-2.5">
                <p className="text-xs text-muted-foreground">"{specialRequest}"</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => navigate('/bookings')}
            className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground"
          >
            {language === 'km' ? 'មើលការកក់របស់ខ្ញុំ' : 'View My Bookings'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-xl bg-card py-3 text-sm font-semibold text-foreground shadow-card"
          >
            {language === 'km' ? 'ត្រលប់ទៅទំព័រដើម' : 'Back to Home'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
