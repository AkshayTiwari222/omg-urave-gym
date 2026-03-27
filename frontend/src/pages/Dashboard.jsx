import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. IMPORT RECHARTS
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
    if (!window.confirm('Are you sure you want to delete this workout?')) return;
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

  // 2. THE MATH: Calculate Total Volume for the Graph
  // We sort the workouts chronologically, then multiply (Weight x Reps) for every single set.
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
        // Format date to look clean (e.g., "Mar 24")
        date: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        volume: totalVolume,
        split: workout.splitType
      };
    });

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Navigation Bar */}
      <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300 hype-font tracking-wider">
            OMG Urave Gym
          </h1>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded transition-colors text-sm uppercase tracking-wide font-semibold">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-6 mt-6">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <h2 className="text-3xl font-bold hype-font">Your Logbook</h2>
          <button 
            onClick={() => navigate('/log-workout')}
            className="w-full sm:w-auto bg-linear-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold py-4 sm:py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transform hover:-translate-y-1 transition-all duration-300 hype-font text-lg uppercase tracking-wide"
          >
            + Log Session
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-4 mb-6">{error}</div>}
        
        {isLoading ? (
          <div className="text-center text-emerald-400 mt-12 hype-font animate-pulse text-xl">Loading your gains...</div>
        ) : workouts.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 text-center text-gray-400 border border-white/10 border-dashed">
            <p className="text-xl hype-font mb-2">No workouts logged yet.</p>
            <p>Time to hit the iron!</p>
          </div>
        ) : (
          <>
            {/* 3. THE GRAPH: Volume Progression */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 mb-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-400 mb-6 hype-font uppercase tracking-wide">Volume Progression (kg)</h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.6}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} tickMargin={10} />
                    <YAxis stroke="#4b5563" tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(value) => `${value}kg`} width={60} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '0.75rem', color: '#fff' }}
                      itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                      labelStyle={{ color: '#9ca3af', marginBottom: '4px' }}
                    />
                    <Area type="monotone" dataKey="volume" name="Total Volume" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorVolume)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Workouts List */}
            <div className="space-y-6">
              {workouts.map((workout) => (
                <div key={workout._id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-300 shadow-xl">
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-5">
                    <h3 className="text-2xl font-bold text-emerald-400 hype-font uppercase tracking-wide">
                      {workout.splitType} Day
                    </h3>
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400 text-sm font-medium">
                        {new Date(workout.date).toLocaleDateString()}
                      </span>
                      <button 
                        onClick={() => handleDelete(workout._id)}
                        className="text-red-500/70 hover:text-red-400 hover:bg-red-500/10 p-2 rounded transition-colors text-xs font-bold uppercase tracking-wider"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {/* Exercises Array */}
                  <div className="space-y-5">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="bg-black/30 rounded-xl p-5 border border-white/5">
                        <h4 className="font-semibold text-lg mb-3 tracking-wide">{exercise.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
                          {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex} className={`bg-black/50 rounded-lg p-3 text-center transition-all ${
                              set.isPR 
                                ? 'ring-2 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)] bg-linear-to-b from-amber-500/10 to-black/50' 
                                : 'border border-white/5'
                            }`}>
                              <span className="block text-xs text-gray-500 mb-1 font-semibold tracking-wider">SET {setIndex + 1}</span>
                              <span className="font-bold text-lg text-white">{set.weight}kg × {set.reps}</span>
                              {set.isPR && (
                                <div className="mt-2 inline-flex items-center gap-1 bg-amber-400/20 text-amber-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-inner">
                                  <span>⭐ PR</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;