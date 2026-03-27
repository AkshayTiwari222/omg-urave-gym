import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google'; // Import the Google Button

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- STANDARD EMAIL LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://omg-urave-gym.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW: GOOGLE LOGIN SUCCESS HANDLER ---
  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Send the Google token to your Render backend
      const response = await fetch('https://omg-urave-gym.onrender.com/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Google login failed');

      // Save YOUR custom token and go to dashboard
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-emerald-400 mb-8 tracking-wide uppercase">Welcome Back</h2>
        
        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-center">{error}</div>}

        {/* --- GOOGLE BUTTON --- */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google login was closed or failed')}
            theme="filled_black"
            shape="rectangular"
            size="large"
            text="continue_with"
          />
        </div>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-700"></div>
          <span className="px-4 text-gray-500 text-sm font-medium uppercase tracking-wider">Or email</span>
          <div className="flex-1 border-t border-gray-700"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm font-medium">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-lg transition-colors disabled:opacity-50 tracking-wide uppercase"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account? <button onClick={() => navigate('/register')} className="text-emerald-400 hover:text-emerald-300 transition-colors">Sign up</button>
        </p>
      </div>
    </div>
  );
}

export default Login;