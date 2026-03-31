import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Plus, Trash2, Dumbbell, Activity } from 'lucide-react';

function LogWorkout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [splitType, setSplitType] = useState('Push');
  const [exercises, setExercises] = useState([
    { name: '', sets: [{ reps: '', weight: '', isPR: false }] }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ reps: '', weight: '', isPR: false }] }]);
  };

  const removeExercise = (index) => {
    const updated = [...exercises];
    updated.splice(index, 1);
    setExercises(updated);
  };

  const addSet = (exerciseIndex) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets.push({ reps: '', weight: '', isPR: false });
    setExercises(updated);
  };

  const removeSet = (exerciseIndex, setIndex) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(updated);
  };

  const updateExerciseName = (text, exerciseIndex) => {
    const updated = [...exercises];
    updated[exerciseIndex].name = text;
    setExercises(updated);
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const updated = [...exercises];
    updated[exerciseIndex].sets[setIndex][field] = value;
    setExercises(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not logged in');

      const response = await fetch('https://omg-urave-gym.onrender.com/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ splitType, exercises })
      });

      if (!response.ok) throw new Error('Failed to save workout');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-x-hidden pb-32">
      {/* Background Glow */}
      <div className="fixed top-0 left-[-10%] w-[60%] h-[40%] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Top App Bar */}
      <nav className="sticky top-0 left-0 right-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 pt-safe">
        <div className="px-4 py-3 flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="p-2 -ml-2 text-gray-400 active:text-white transition-colors active:scale-95"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 hype-font uppercase tracking-widest flex-1">
            Log Session
          </h2>
        </div>
      </nav>

      <div className="w-full max-w-lg mx-auto p-4 pt-6">
        
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 backdrop-blur-sm text-sm font-medium">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Split Type Selector */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-4">
            <label className="flex items-center gap-2 text-gray-300 font-bold mb-3 uppercase tracking-widest text-xs">
              <Activity size={16} className="text-emerald-500" /> Workout Split
            </label>
            <div className="relative">
              <select 
                value={splitType} 
                onChange={(e) => setSplitType(e.target.value)}
                className="w-full bg-black/60 border border-white/5 rounded-xl px-4 py-3.5 text-white font-bold focus:outline-none focus:ring-1 focus:ring-emerald-500/50 appearance-none shadow-inner text-base"
              >
                {['Push', 'Pull', 'Legs', 'Upper', 'Lower', 'Full Body', 'Cardio'].map(split => (
                  <option key={split} value={split}>{split}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-emerald-500">
                ▼
              </div>
            </div>
          </div>

          {/* Dynamic Exercises List */}
          <div className="space-y-6">
            <AnimatePresence>
              {exercises.map((exercise, exIndex) => (
                <motion.div 
                  key={`ex-${exIndex}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#111] border border-white/5 rounded-3xl p-4 shadow-lg overflow-hidden relative"
                >
                  <div className="flex justify-between items-center mb-5 gap-2">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Dumbbell size={16} className="text-emerald-500/50" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Exercise (e.g. Squat)" 
                        value={exercise.name}
                        onChange={(e) => updateExerciseName(e.target.value, exIndex)}
                        className="w-full bg-black/60 border border-white/5 rounded-xl py-3.5 pl-10 pr-4 text-white font-bold placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all text-base"
                        required
                      />
                    </div>
                    {exercises.length > 1 && (
                      <button 
                        type="button" 
                        onClick={() => removeExercise(exIndex)}
                        className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-500 rounded-xl active:bg-red-500/20 active:scale-95 transition-all flex-shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence>
                      {exercise.sets.map((set, setIndex) => (
                        <motion.div 
                          key={`set-${exIndex}-${setIndex}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="flex gap-2 items-center bg-black/40 p-2 rounded-xl border border-white/5"
                        >
                          <span className="text-gray-500 font-bold w-6 text-center text-xs ml-1">
                            {setIndex + 1}
                          </span>
                          
                          <input 
                            type="number"
                            inputMode="decimal"
                            placeholder="kg" 
                            value={set.weight}
                            onChange={(e) => updateSet(exIndex, setIndex, 'weight', Number(e.target.value))}
                            className="flex-1 min-w-0 bg-white/5 border border-white/5 rounded-lg h-11 text-white font-bold focus:outline-none focus:bg-white/10 transition-all text-center placeholder-gray-600 text-base"
                            required
                          />
                          
                          <span className="text-gray-600 font-bold px-1">×</span>

                          <input 
                            type="number"
                            inputMode="numeric"
                            placeholder="Reps" 
                            value={set.reps}
                            onChange={(e) => updateSet(exIndex, setIndex, 'reps', Number(e.target.value))}
                            className="flex-1 min-w-0 bg-white/5 border border-white/5 rounded-lg h-11 text-white font-bold focus:outline-none focus:bg-white/10 transition-all text-center placeholder-gray-600 text-base"
                            required
                          />
                          
                          <label className={`w-12 h-11 flex items-center justify-center rounded-lg cursor-pointer shrink-0 transition-colors border ${
                            set.isPR 
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                              : 'bg-white/5 border-transparent text-gray-500 active:bg-white/10'
                          }`}>
                            <input 
                              type="checkbox" 
                              checked={set.isPR}
                              onChange={(e) => updateSet(exIndex, setIndex, 'isPR', e.target.checked)}
                              className="hidden"
                            />
                            <span className="font-bold text-xs uppercase">PR</span>
                          </label>

                          <button 
                            type="button" 
                            onClick={() => removeSet(exIndex, setIndex)}
                            className="w-10 h-11 flex items-center justify-center text-gray-500 active:text-red-400 active:bg-red-500/10 rounded-lg transition-colors shrink-0"
                          >
                            <Trash2 size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => addSet(exIndex)}
                    className="mt-4 w-full h-12 bg-emerald-500/10 active:bg-emerald-500/20 text-emerald-400 rounded-xl font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add Set
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button 
            type="button" 
            onClick={addExercise}
            className="w-full h-14 border border-dashed border-gray-600 text-gray-400 active:bg-white/5 rounded-2xl transition-colors font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mb-safe"
          >
            <Plus size={18} /> Add Exercise
          </button>

          {/* Sticky Save Bar Anchored to Bottom */}
          <div className="fixed bottom-0 inset-x-0 p-4 pb-safe bg-[#050505]/95 backdrop-blur-2xl border-t border-white/10 z-50">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full max-w-lg mx-auto bg-gradient-to-r from-emerald-500 to-teal-400 text-black font-extrabold h-14 rounded-full transition-transform active:scale-[0.98] disabled:opacity-50 text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 hype-font uppercase tracking-widest"
            >
              <Save size={20} />
              <span>{isLoading ? 'Saving...' : 'Save Workout'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LogWorkout;