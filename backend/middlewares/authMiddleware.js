const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if the headers contain an authorization token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract the token from the header (Format is usually "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token against your secret key in the .env file
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Fetch the user from the database using the ID packed inside the token
      // The .select('-password') ensures we don't accidentally pass the hashed password forward
      req.user = await User.findById(decoded.id).select('-password');

      // 5. The user is legit! Move on to the actual controller function
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // 6. If there's no token at all, reject them immediately
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };