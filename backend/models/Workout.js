const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  // This links every workout to a specific User's ID
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User' 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  splitType: { 
    type: String, 
    required: true,
    enum: ['Push', 'Pull', 'Legs', 'Upper', 'Lower', 'Full Body', 'Cardio'] 
  },
  // An array of exercise objects
  exercises: [{
    name: { type: String, required: true },
    // Each exercise has an array of sets
    sets: [{
      reps: { type: Number, required: true },
      weight: { type: Number, required: true },
      isPR: { type: Boolean, default: false } // Fun feature for tracking Personal Records!
    }]
  }]
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Workout', workoutSchema);