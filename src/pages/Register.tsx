import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Register = () => {
  const navigate = useNavigate();
  const { language, setIsLoggedIn } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError(language === 'km' ? 'សូមបំពេញគ្រប់ចន្លោះ' : 'Please fill in all required fields');
      return;
    }
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2 shadow-card">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center -mt-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{language === 'km' ? 'បង្កើតគណនី' : 'Create Account'}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {language === 'km' ? 'ចុះឈ្មោះដើម org កក់តុ' : 'Sign up to start booking tables'}
          </p>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="text" placeholder={language === 'km' ? 'ឈ្មោះ' : 'Full Name'} value={name} onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="email" placeholder={language === 'km' ? 'អ៊ីមែល' : 'Email'} value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type="tel" placeholder={language === 'km' ? 'ទូរស័ព្ទ (ជម្រើស)' : 'Phone (optional)'} value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input type={showPw ? 'text' : 'password'} placeholder={language === 'km' ? 'ពាក្យសម្ងាត់' : 'Password'} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPw ? <EyeOff size={18} className="text-muted-foreground" /> : <Eye size={18} className="text-muted-foreground" />}
            </button>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3">
              <p className="text-xs text-destructive font-medium">{error}</p>
            </div>
          )}

          <button onClick={handleRegister} className="w-full rounded-xl gradient-hero py-3.5 text-sm font-bold text-primary-foreground shadow-elevated">
            {language === 'km' ? 'ចុះឈ្មោះ' : 'Sign Up'}
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {language === 'km' ? 'មានគណនីរួចហើយ? ' : 'Already have an account? '}
          <Link to="/login" className="text-primary font-semibold">
            {language === 'km' ? 'ចូល' : 'Sign In'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
