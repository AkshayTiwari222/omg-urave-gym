const Workout = require('../models/Workout');

// @desc    Create a new workout log
// @route   POST /api/workouts
// @access  Private (Requires Token)
const createWorkout = async (req, res) => {
  try {
    const { splitType, exercises } = req.body;

    // Notice we are using `req.user._id` here! 
    // This comes directly from our authMiddleware. We don't trust the frontend to tell us who the user is.
    const workout = await Workout.create({
      userId: req.user._id,
      splitType,
      exercises
    });

    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all workouts for the logged-in user
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
  try {
    // Fetch only the workouts that match the logged-in user's ID
    const workouts = await Workout.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Delete a workout
// @route   DELETE /api/workouts/:id
// @access  Private
const deleteWorkout = async (req, res) => {
  try {
    // 1. Find the workout by the ID passed in the URL
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    // 2. SECURITY CHECK: Ensure the logged-in user matches the workout's owner
    // req.user.id comes from our authMiddleware!
    if (workout.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this' });
    }

    // 3. Delete it from the database
    await workout.deleteOne();

    // 4. Send back the ID so the frontend knows which one was removed
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createWorkout, getWorkouts, deleteWorkout };