const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // process.env allows us to access the variables in the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the server if the database connection fails
  }
};

module.exports = connectDB;