const express = require('express');
const router = express.Router();
// 👇 Add googleLogin right here inside these curly braces
const { registerUser, loginUser, googleLogin } = require('../controllers/authController');

// Map the routes to the controller functions
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);

module.exports = router;