import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { language, setIsLoggedIn } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError(language === 'km' ? 'សូមបំពេញគ្រប់ចន្លោះ' : 'Please fill in all fields');
      return;
    }
    // Mock login
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-12 pb-4">
        <button onClick={() => navigate('/')} className="rounded-full bg-card p-2 shadow-card">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center -mt-16">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">{language === 'km' ? 'ស្វាគមន៍មកវិញ' : 'Welcome Back'}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {language === 'km' ? 'ចូលទៅគណនីរបស់អ្នក' : 'Sign in to your account'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder={language === 'km' ? 'អ៊ីមែល' : 'Email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPw ? 'text' : 'password'}
              placeholder={language === 'km' ? 'ពាក្យសម្ងាត់' : 'Password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-input bg-card pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPw ? <EyeOff size={18} className="text-muted-foreground" /> : <Eye size={18} className="text-muted-foreground" />}
            </button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-primary font-medium">
              {language === 'km' ? 'ភ្លេចពាក្យសម្ងាត់?' : 'Forgot Password?'}
            </Link>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3">
              <p className="text-xs text-destructive font-medium">{error}</p>
            </div>
          )}

          <button onClick={handleLogin} className="w-full rounded-xl gradient-hero py-3.5 text-sm font-bold text-primary-foreground shadow-elevated">
            {language === 'km' ? 'ចូល' : 'Sign In'}
          </button>

          <button onClick={() => { navigate('/'); }} className="w-full rounded-xl bg-card py-3 text-sm font-medium text-foreground shadow-card">
            {language === 'km' ? 'បន្តជាភ្ញៀវ' : 'Continue as Guest'}
          </button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          {language === 'km' ? 'មិនមានគណនីមែនទេ? ' : "Don't have an account? "}
          <Link to="/register" className="text-primary font-semibold">
            {language === 'km' ? 'ចុះឈ្មោះ' : 'Sign Up'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
