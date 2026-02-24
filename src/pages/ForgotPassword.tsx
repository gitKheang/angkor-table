import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (email.trim()) setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="px-4 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="rounded-full bg-card p-2 shadow-card">
          <ArrowLeft size={20} />
        </button>
      </div>

      <div className="flex-1 px-6 flex flex-col justify-center -mt-16">
        {sent ? (
          <div className="text-center">
            <div className="rounded-full bg-success/10 w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <Mail size={28} className="text-success" />
            </div>
            <h1 className="text-xl font-bold mb-2">{language === 'km' ? 'ពិនិត្យអ៊ីមែលរបស់អ្នក' : 'Check Your Email'}</h1>
            <p className="text-sm text-muted-foreground mb-6">
              {language === 'km' ? 'យើងបានផ្ញើតំណកំណត់ពាក្យសម្ងាត់ឡើងវិញ' : 'We sent a password reset link to your email'}
            </p>
            <button onClick={() => navigate('/login')} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
              {language === 'km' ? 'ត្រលប់ទៅចូល' : 'Back to Login'}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{language === 'km' ? 'ភ្លេចពាក្យសម្ងាត់' : 'Forgot Password'}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {language === 'km' ? 'បញ្ចូលអ៊ីមែលរបស់អ្នកដើម្បីកំណត់ឡើងវិញ' : 'Enter your email to reset your password'}
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="email" placeholder={language === 'km' ? 'អ៊ីមែល' : 'Email'} value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <button onClick={handleSubmit} className="w-full rounded-xl gradient-hero py-3.5 text-sm font-bold text-primary-foreground shadow-elevated">
                {language === 'km' ? 'ផ្ញើតំណកំណត់ឡើងវិញ' : 'Send Reset Link'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
