const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true // Prevents duplicate accounts
  },
  password: { 
    type: String, 
    required: true 
  },
  // Setting up default macros that the user can update later
  macroGoals: {
    protein: { type: Number, default: 150 },
    carbs: { type: Number, default: 200 },
    fats: { type: Number, default: 60 }
  }
}, { 
  timestamps: true // Automatically adds 'createdAt' and 'updatedAt' dates
});

module.exports = mongoose.model('User', userSchema);