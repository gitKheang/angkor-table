import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Home, CalendarDays, Bell, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const BottomTabs = () => {
  const { language } = useApp();
  const location = useLocation();

  const tabs = [
    { to: '/', icon: Home, label: language === 'km' ? 'ស្វែងរក' : 'Home' },
    { to: '/bookings', icon: CalendarDays, label: language === 'km' ? 'ការកក់' : 'Bookings' },
    { to: '/notifications', icon: Bell, label: language === 'km' ? 'សារ' : 'Alerts' },
    { to: '/profile', icon: User, label: language === 'km' ? 'គណនី' : 'Profile' },
  ];

  const hiddenPaths = ['/login', '/register', '/forgot-password'];
  if (hiddenPaths.includes(location.pathname)) return null;

  const isTabActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card">
      <div className="mx-auto flex max-w-[430px] items-center justify-around py-1.5 pb-2">
        {tabs.map((tab) => {
          const active = isTabActive(tab.to);
          return (
            <RouterNavLink
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 text-[11px] font-medium transition-colors ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span>{tab.label}</span>
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabs;
