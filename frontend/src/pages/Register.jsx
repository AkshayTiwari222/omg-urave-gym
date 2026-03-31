import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ArrowLeft } from 'lucide-react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://omg-urave-gym.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden text-white font-sans">
      {/* Background glow */}
      <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm bg-[#111]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-6 sm:p-8 shadow-2xl relative z-10"
      >
        <button 
          onClick={() => navigate('/')}
          className="absolute top-5 left-5 text-gray-500 active:text-white transition-colors p-2 active:bg-white/5 rounded-full"
        >
          <ArrowLeft size={20} />
        </button>

        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mt-8 mb-6 hype-font tracking-widest uppercase">
          Create Account
        </h2>
        
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-6 text-center text-sm font-medium">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                <User size={18} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/60 border border-white/5 rounded-xl h-14 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium text-base"
                placeholder="Full Name"
                required 
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-white/5 rounded-xl h-14 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium text-base"
                placeholder="Email Address"
                required 
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/60 border border-white/5 rounded-xl h-14 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all font-medium text-base"
                placeholder="Password"
                required 
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold h-14 rounded-xl transition-transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-widest flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
          >
            <span>{isLoading ? 'Wait...' : 'Sign Up'}</span>
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-sm font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-400 font-bold active:text-emerald-300 transition-colors p-2 -m-2">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Register;