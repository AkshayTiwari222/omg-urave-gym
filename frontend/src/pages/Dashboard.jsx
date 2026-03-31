import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Trash2, Calendar, Dumbbell, Plus, Trophy, LayoutDashboard, User } from 'lucide-react';

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://omg-urave-gym.onrender.com/api/workouts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            throw new Error('Session expired. Please log in again.');
          }
          throw new Error('Failed to fetch workouts');
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, [navigate]);

  const handleDelete = async (workoutId) => {
    if (!window.confirm('Delete this workout?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://omg-urave-gym.onrender.com/api/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete workout');
      setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const chartData = [...workouts]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(workout => {
      let totalVolume = 0;
      workout.exercises.forEach(ex => {
        ex.sets.forEach(set => {
          totalVolume += (set.weight * set.reps);
        });
      });
      return {
        date: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        volume: totalVolume,
        split: workout.splitType
      };
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-x-hidden pb-24">
      
      {/* Dynamic Background Glows for Phone Center */}
      <div className="fixed top-20 right-[-30%] w-[80%] h-[30%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Simplified Top App Bar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="px-4 py-3 flex justify-center items-center">
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 hype-font tracking-widest uppercase">
            OMG Urave
          </h1>
        </div>
      </nav>

      {/* Main Content Area optimized for thumbs */}
      <main className="px-4 mt-20 relative z-10 w-full max-w-lg mx-auto">
        
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-2xl p-4 mb-6 backdrop-blur-sm text-sm">
            {error}
          </motion.div>
        )}
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="animate-pulse bg-white/5 h-64 rounded-3xl border border-white/5" />
            <div className="animate-pulse bg-white/5 h-40 rounded-3xl border border-white/5" />
            <div className="animate-pulse bg-white/5 h-40 rounded-3xl border border-white/5" />
          </div>
        ) : workouts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="mt-12 bg-white/5 backdrop-blur-md rounded-3xl p-10 text-center text-gray-400 border border-white/10 shadow-2xl"
          >
            <Dumbbell className="w-16 h-16 mx-auto mb-6 text-emerald-500/50" />
            <p className="text-2xl hype-font mb-3 text-white">No gains yet.</p>
            <p className="text-gray-500 text-sm">Tap the + button to log your first session.</p>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            
            {/* Edge-to-Edge Style Graph Card */}
            <motion.div variants={itemVariants} className="bg-[#111] border border-white/5 rounded-[32px] p-5 mb-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <LineChart className="text-emerald-400 w-5 h-5" />
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Volume (kg)</h3>
              </div>
              <div className="h-56 w-full relative z-10 -ml-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'Inter' }} tickMargin={12} axisLine={false} tickLine={false} />
                    <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 10, fontFamily: 'Inter' }} tickFormatter={(value) => `${value}`} width={40} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{ stroke: 'rgba(16,185,129,0.3)', strokeWidth: 2 }}
                      contentStyle={{ backgroundColor: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '1rem', color: '#fff', fontSize: '12px', padding: '10px' }}
                      itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                      labelStyle={{ color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.05em' }}
                    />
                    <Area type="monotone" dataKey="volume" name="Vol" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Mobile-Optimized Workouts List */}
            <div className="space-y-4">
              <AnimatePresence>
                {workouts.map((workout) => (
                  <motion.div 
                    key={workout._id} 
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9, height: 0 }}
                    className="bg-[#111] border border-white/5 rounded-3xl p-5 shadow-lg active:scale-[0.98] transition-transform duration-200"
                  >
                    
                    {/* Compact Header */}
                    <div className="flex justify-between items-start mb-5">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/10 text-emerald-400 p-2.5 rounded-2xl">
                          <Dumbbell size={20} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white hype-font uppercase tracking-wide leading-none">
                            {workout.splitType}
                          </h3>
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-1.5 font-medium">
                            <Calendar size={12} /> 
                            {new Date(workout.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      
                      {/* Swipeable Large Delete Target */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(workout._id); }}
                        className="p-3 text-gray-500 active:text-red-400 active:bg-red-500/10 rounded-full transition-colors flex items-center justify-center -mr-2 -mt-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {/* Compact Exercises Grid */}
                    <div className="space-y-3">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="bg-black/40 rounded-2xl p-3 border border-white/5">
                          <h4 className="font-bold text-sm text-emerald-50 mb-2 truncate">{exercise.name}</h4>
                          <div className="flex flex-wrap gap-2">
                            {exercise.sets.map((set, setIndex) => (
                              <div key={setIndex} className={`relative rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 ${
                                set.isPR 
                                  ? 'bg-amber-500/15 border border-amber-500/30 text-amber-100' 
                                  : 'bg-white/5 border border-white/5 text-gray-200'
                              }`}>
                                <span className="font-bold text-xs whitespace-nowrap">
                                  {set.weight}<span className="text-gray-500 font-normal mx-0.5">×</span>{set.reps}
                                </span>
                                {set.isPR && <Trophy size={10} className="text-amber-500" />}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </main>

      {/* Massive Floating Action Button (FAB) for thumbs */}
      <motion.button
        onClick={() => navigate('/log-workout')}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-5 z-50 w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.5)] active:shadow-none transition-shadow"
      >
        <Plus size={32} />
      </motion.button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#09090b]/90 backdrop-blur-2xl border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center px-2 py-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center p-2 text-emerald-400 w-16 active:scale-95 transition-transform"
          >
            <LayoutDashboard size={24} className="mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Dash</span>
          </button>
          
          {/* Invisible placeholder for FAB spacing */}
          <div className="w-16 h-12"></div>
          
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center p-2 text-gray-500 active:text-red-400 w-16 active:scale-95 transition-transform"
          >
            <User size={24} className="mb-1" />
            <span className="text-[10px] uppercase font-bold tracking-widest">Logout</span>
          </button>
        </div>
      </nav>

    </div>
  );
}

// Inline linechart icon for the graph card since I forgot to import it at the top
const LineChart = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
);

export default Dashboard;