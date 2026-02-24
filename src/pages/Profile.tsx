import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronRight, Globe, LogOut, User } from 'lucide-react';
import { userProfile } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

const Profile = () => {
  const { language, setLanguage, isLoggedIn, setIsLoggedIn, isGuest } = useApp();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(userProfile);

  if (isGuest) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 pb-20">
        <User size={48} className="text-muted-foreground mb-4" />
        <h2 className="font-semibold mb-1">{language === 'km' ? 'ចូលគណនីរបស់អ្នក' : 'Login to Your Account'}</h2>
        <p className="text-sm text-muted-foreground text-center mb-4">
          {language === 'km' ? 'ចូលដើម្បីគ្រប់គ្រងគណនីរបស់អ្នក' : 'Login to manage your account'}
        </p>
        <button onClick={() => navigate('/login')} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
          {language === 'km' ? 'ចូល' : 'Login'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="gradient-hero px-4 pt-12 pb-8">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold text-primary-foreground">
              {profile.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 rounded-full bg-card p-1.5 shadow-card">
              <Camera size={14} className="text-primary" />
            </button>
          </div>
          <h2 className="mt-3 text-base font-bold text-primary-foreground">{profile.name}</h2>
          <p className="text-xs text-primary-foreground/70">{profile.email}</p>
        </div>
      </div>

      <div className="px-4 -mt-4 space-y-3">
        {/* Profile info */}
        <div className="rounded-xl bg-card p-4 shadow-card space-y-4">
          <h3 className="font-semibold text-sm">{language === 'km' ? 'ព័ត៌មានផ្ទាល់ខ្លួន' : 'Personal Info'}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{language === 'km' ? 'ឈ្មោះ' : 'Name'}</span>
              <span className="text-sm font-medium">{profile.name}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{language === 'km' ? 'អ៊ីមែល' : 'Email'}</span>
              <span className="text-sm font-medium">{profile.email}</span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{language === 'km' ? 'ទូរស័ព្ទ' : 'Phone'}</span>
              <span className="text-sm font-medium">{profile.phone}</span>
            </div>
          </div>
        </div>

        {/* Language toggle */}
        <div className="rounded-xl bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-primary" />
              <span className="text-sm font-medium">{language === 'km' ? 'ភាសា' : 'Language'}</span>
            </div>
            <div className="flex rounded-lg bg-muted p-0.5">
              <button
                onClick={() => setLanguage('en')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  language === 'en' ? 'bg-card shadow-sm' : ''
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('km')}
                className={`rounded-md px-3 py-1.5 text-xs font-medium font-khmer transition-colors ${
                  language === 'km' ? 'bg-card shadow-sm' : ''
                }`}
              >
                ខ្មែរ
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => { setIsLoggedIn(false); navigate('/'); }}
          className="flex w-full items-center justify-between rounded-xl bg-card p-4 shadow-card"
        >
          <div className="flex items-center gap-2">
            <LogOut size={18} className="text-destructive" />
            <span className="text-sm font-medium text-destructive">
              {language === 'km' ? 'ចាកចេញ' : 'Logout'}
            </span>
          </div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
