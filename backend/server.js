const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Loads the variables from .env
const connectDB = require('./config/db'); // Imports your connection function

// 1. Connect to the database
connectDB(); 

const app = express();

// 2. Middlewares
app.use(cors());
app.use(express.json()); // Allows us to accept JSON data in the body
//routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workouts', require('./routes/workoutRoutes'));

// 3. Basic Test Route
app.get('/', (req, res) => {
  res.send('Gym Tracker API is running!');
});

// 4. Start the Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});