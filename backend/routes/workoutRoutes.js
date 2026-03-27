const { createWorkout, getWorkouts, deleteWorkout } = require('../controllers/workoutController');
const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');

// By chaining .get and .post, we keep the code clean. 
// Notice how `protect` sits right before the controller functions!
router.route('/')
  .get(protect, getWorkouts)
  .post(protect, createWorkout);
  // --- ADD THIS NEW BLOCK ---
// The :id acts as a variable that Express grabs from the URL
router.route('/:id')
  .delete(protect, deleteWorkout);

module.exports = router;