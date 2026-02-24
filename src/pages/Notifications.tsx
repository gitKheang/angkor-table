import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';
import { notifications as mockNotifications } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const typeIcons = {
  confirmation: CheckCircle,
  update: Clock,
  cancellation: XCircle,
  reminder: AlertCircle,
};

const typeColors = {
  confirmation: 'text-success',
  update: 'text-warning',
  cancellation: 'text-destructive',
  reminder: 'text-secondary',
};

const Notifications = () => {
  const { language, isGuest } = useApp();
  const navigate = useNavigate();

  if (isGuest) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 pb-20">
        <Bell size={48} className="text-muted-foreground mb-4" />
        <h2 className="font-semibold mb-1">{language === 'km' ? 'ចូលដើម្បីមើលសារ' : 'Login to View Notifications'}</h2>
        <p className="text-sm text-muted-foreground text-center mb-4">
          {language === 'km' ? 'អ្នកត្រូវចូលដើម្បីមើលសារ' : 'You need to be logged in to see notifications'}
        </p>
        <button onClick={() => navigate('/login')} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
          {language === 'km' ? 'ចូល' : 'Login'}
        </button>
      </div>
    );
  }

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{language === 'km' ? 'សារជូនដំណឹង' : 'Notifications'}</h1>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="px-4 space-y-2">
        {mockNotifications.map((notif) => {
          const Icon = typeIcons[notif.type];
          const color = typeColors[notif.type];
          return (
            <div
              key={notif.id}
              className={`rounded-lg p-3 shadow-card animate-fade-in ${
                notif.read ? 'bg-card' : 'bg-card border-l-[3px] border-primary'
              }`}
            >
              <div className="flex gap-3">
                <Icon size={20} className={`${color} flex-shrink-0 mt-0.5`} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">
                    {language === 'km' ? notif.titleKh : notif.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {language === 'km' ? notif.messageKh : notif.message}
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-1.5 block">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {!notif.read && (
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notifications;
