import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogWorkout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. The Form State
  const [splitType, setSplitType] = useState('Push');
  const [exercises, setExercises] = useState([
    { name: '', sets: [{ reps: '', weight: '', isPR: false }] }
  ]);

  // --- Helper Functions for Dynamic Form ---

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: [{ reps: '', weight: '', isPR: false }] }]);
  };

  const addSet = (exerciseIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets.push({ reps: '', weight: '', isPR: false });
    setExercises(updatedExercises);
  };

  const updateExerciseName = (text, exerciseIndex) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].name = text;
    setExercises(updatedExercises);
  };

  const updateSet = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(updatedExercises);
  };

  // --- Submit Logic ---
  
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
        // We send exactly what your Mongoose Schema expects
        body: JSON.stringify({ splitType, exercises })
      });

      if (!response.ok) throw new Error('Failed to save workout');

      // Success! Go back to the dashboard to see the new data
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-emerald-400">Log New Session</h2>
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white">
            Cancel
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Split Type Selector */}
          <div>
            <label className="block text-gray-400 font-medium mb-2">Workout Split</label>
            <select 
              value={splitType} 
              onChange={(e) => setSplitType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
              <option value="Legs">Legs</option>
              <option value="Upper">Upper</option>
              <option value="Lower">Lower</option>
              <option value="Full Body">Full Body</option>
              <option value="Cardio">Cardio</option>
            </select>
          </div>

          {/* Dynamic Exercises List */}
          <div className="space-y-6">
            {exercises.map((exercise, exIndex) => (
              <div key={exIndex} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <input 
                  type="text" 
                  placeholder="Exercise Name (e.g., Squat)" 
                  value={exercise.name}
                  onChange={(e) => updateExerciseName(e.target.value, exIndex)}
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white mb-4 focus:outline-none focus:border-emerald-500"
                  required
                />

                {/* Sets for this specific exercise */}
                <div className="space-y-3">
                  {exercise.sets.map((set, setIndex) => (
                    <div key={setIndex} className="flex gap-4 items-center">
                      <span className="text-gray-500 font-medium w-12">Set {setIndex + 1}</span>
                      <input 
                        type="number" 
                        placeholder="Weight (kg)" 
                        value={set.weight}
                        onChange={(e) => updateSet(exIndex, setIndex, 'weight', Number(e.target.value))}
                        className="w-24 bg-gray-800 border border-gray-600 rounded p-2 text-white"
                        required
                      />
                      <input 
                        type="number" 
                        placeholder="Reps" 
                        value={set.reps}
                        onChange={(e) => updateSet(exIndex, setIndex, 'reps', Number(e.target.value))}
                        className="w-24 bg-gray-800 border border-gray-600 rounded p-2 text-white"
                        required
                      />
                      <label className="flex items-center gap-2 text-sm text-amber-400 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={set.isPR}
                          onChange={(e) => updateSet(exIndex, setIndex, 'isPR', e.target.checked)}
                          className="accent-amber-400 w-4 h-4"
                        />
                        PR?
                      </label>
                    </div>
                  ))}
                </div>

                <button 
                  type="button" 
                  onClick={() => addSet(exIndex)}
                  className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                >
                  + Add Set
                </button>
              </div>
            ))}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col gap-4 pt-4 border-t border-gray-700">
            <button 
              type="button" 
              onClick={addExercise}
              className="w-full border-2 border-dashed border-gray-600 text-gray-400 hover:border-emerald-500 hover:text-emerald-400 rounded-lg p-3 transition-colors"
            >
              + Add Another Exercise
            </button>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-50 text-lg"
            >
              {isLoading ? 'Saving...' : 'Save Workout'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default LogWorkout;