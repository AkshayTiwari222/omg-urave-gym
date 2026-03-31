import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Smartphone, LineChart, Trophy, ArrowRight, UserPlus, LogIn } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-black font-sans relative overflow-hidden">
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[30%] h-[30%] bg-teal-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Glass Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl flex justify-between items-center"
      >
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 hype-font tracking-wider uppercase">
          OMG Urave
        </h1>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 text-gray-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide"
          >
            <LogIn size={16} /> <span className="hidden sm:inline">Log In</span>
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm uppercase tracking-wide"
          >
            <UserPlus size={16} /> Sign Up
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl mx-auto px-6 pt-40 pb-20 text-center z-10"
      >
        <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          🚀 Your New Digital Logbook
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-6 tracking-tight leading-[1.1] hype-font">
          Track Every Rep. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">
            Smash Every PR.
          </span>
        </motion.h2>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Ditch the messy spreadsheets and notes apps. <strong className="text-white font-semibold">OMG Urave Gym</strong> is a premium, distraction-free tracker built for serious lifters to visualize their volume and progressive overload.
        </motion.p>
        
        <motion.div variants={itemVariants}>
          <button 
            onClick={() => navigate('/register')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold py-4 px-10 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] transform hover:-translate-y-1 transition-all duration-300 text-lg uppercase tracking-wide overflow-hidden"
          >
            <span className="relative z-10">Start Tracking Free</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </button>
        </motion.div>
      </motion.header>

      {/* Features Section */}
      <section className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-md py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-widest uppercase hype-font text-gray-200"
          >
            Why Choose This App?
          </motion.h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Display Cards */}
            {[
              { icon: <Smartphone className="text-emerald-400 w-8 h-8" />, title: "Mobile First", desc: "Built specifically for the gym floor. Log your sets, weights, and reps in seconds between sets without pinching and zooming." },
              { icon: <LineChart className="text-teal-400 w-8 h-8" />, title: "Volume Graphs", desc: "Watch your gains grow. Our dynamic charts calculate your total volume (kg × reps) automatically so you can visualize progressive overload." },
              { icon: <Trophy className="text-amber-400 w-8 h-8" />, title: "PR Tracking", desc: "Hit a new personal record? Tag it with a single tap. Your PRs light up in gold so you can celebrate your heaviest lifts." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-emerald-500/40 hover:bg-white/10 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="bg-black/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-white/5 group-hover:border-emerald-500/30 transition-colors">
                  {feature.icon}
                </div>
                <h4 className="text-2xl font-bold mb-3 hype-font tracking-wide">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="relative border-t border-white/5 px-6 py-24 text-center z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-emerald-600/10 rounded-t-full blur-[100px] pointer-events-none" />
        <h3 className="text-4xl md:text-5xl font-bold mb-10 hype-font uppercase tracking-tight text-white drop-shadow-lg">
          Ready to hit the iron?
        </h3>
        <button 
          onClick={() => navigate('/login')}
          className="group relative inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-emerald-500/50 text-white px-12 py-5 rounded-xl font-bold transition-all uppercase tracking-widest shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transform hover:-translate-y-1"
        >
          Enter Logbook
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </footer>
    </div>
  );
}

export default Home;