import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-black font-sans">
      
      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 tracking-wider uppercase">
          OMG Urave Gym
        </h1>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-gray-300 hover:text-white font-medium transition-colors"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-lg font-medium transition-all"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-4xl mx-auto px-6 pt-20 pb-20 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold tracking-wide">
          🚀 Your New Digital Logbook
        </div>
        <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
          Track Every Rep. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">
            Smash Every PR.
          </span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Ditch the messy spreadsheets and notes apps. OMG Urave Gym is a premium, distraction-free tracker built for serious lifters to visualize their volume and progressive overload.
        </p>
        <button 
          onClick={() => navigate('/register')}
          className="bg-linear-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold py-4 px-10 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transform hover:-translate-y-1 transition-all duration-300 text-lg uppercase tracking-wide"
        >
          Start Tracking for Free
        </button>
      </header>

      {/* "Why Choose This App" Features Section */}
      <section className="bg-white/5 border-y border-white/10 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16 tracking-wide uppercase">Why Choose This App?</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="text-emerald-400 text-4xl mb-4">📱</div>
              <h4 className="text-xl font-bold mb-3">Mobile First</h4>
              <p className="text-gray-400 leading-relaxed">
                Built specifically for the gym floor. Log your sets, weights, and reps in seconds between sets without pinching and zooming.
              </p>
            </div>

            <div className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="text-emerald-400 text-4xl mb-4">📈</div>
              <h4 className="text-xl font-bold mb-3">Volume Graphs</h4>
              <p className="text-gray-400 leading-relaxed">
                Watch your gains grow. Our dynamic charts calculate your total volume (kg × reps) automatically so you can see your progressive overload.
              </p>
            </div>

            <div className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
              <div className="text-emerald-400 text-4xl mb-4">⭐</div>
              <h4 className="text-xl font-bold mb-3">PR Tracking</h4>
              <p className="text-gray-400 leading-relaxed">
                Hit a new personal record? Tag it with a single tap. Your PRs light up in gold so you can celebrate your heaviest lifts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW: HOW IT WORKS SECTION --- */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16 tracking-wide uppercase text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">How It Works</h3>
          
          <div className="relative border-l border-emerald-500/30 ml-4 md:ml-0 md:border-none space-y-12 md:space-y-0 md:grid md:grid-cols-3 md:gap-10">
            
            {/* Step 1 */}
            <div className="relative pl-8 md:pl-0 md:text-center">
              <div className="absolute -left-4.25 top-0 md:relative md:left-auto md:mb-6 w-8 h-8 bg-[#050505] border-2 border-emerald-500 rounded-full flex items-center justify-center font-bold text-emerald-400 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.4)]">1</div>
              <h4 className="text-xl font-bold mb-3 text-white">Select Your Split</h4>
              <p className="text-gray-400 leading-relaxed">Create a free account and choose your workout split for the day. Push, Pull, Legs, or Full Body—we support it all.</p>
            </div>

            {/* Step 2 */}
            <div className="relative pl-8 md:pl-0 md:text-center">
              <div className="absolute-left-4.25 top-0 md:relative md:left-auto md:mb-6 w-8 h-8 bg-[#050505] border-2 border-emerald-500 rounded-full flex items-center justify-center font-bold text-emerald-400 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.4)]">2</div>
              <h4 className="text-xl font-bold mb-3 text-white">Log the Weights</h4>
              <p className="text-gray-400 leading-relaxed">Add your exercises and log your sets. Did you hit a new max? Click the PR checkbox to highlight that specific set in gold.</p>
            </div>

            {/* Step 3 */}
            <div className="relative pl-8 md:pl-0 md:text-center">
              <div className="absolute -left-4.25 top-0 md:relative md:left-auto md:mb-6 w-8 h-8 bg-[#050505] border-2 border-emerald-500 rounded-full flex items-center justify-center font-bold text-emerald-400 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.4)]">3</div>
              <h4 className="text-xl font-bold mb-3 text-white">Track Your Gains</h4>
              <p className="text-gray-400 leading-relaxed">Hit save and watch your Dashboard instantly calculate your total workout volume and chart your progress over time.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-white/5 border-t border-white/10 px-6 py-20 text-center">
        <h3 className="text-3xl font-bold mb-8">Ready to hit the iron?</h3>
        <button 
          onClick={() => navigate('/login')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-10 py-4 rounded-xl font-bold transition-all uppercase tracking-wide shadow-lg"
        >
          Enter Logbook
        </button>
      </footer>
    </div>
  );
}

export default Home;