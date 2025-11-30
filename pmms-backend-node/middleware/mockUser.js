// Development-only middleware to bypass authentication
// This creates a mock user so the app works without login during development

const mongoose = require('mongoose');

const mockUser = (req, res, next) => {
  // Create a consistent mock user ID for development
  const mockUserId = '000000000000000000000001'; // Valid MongoDB ObjectId format
  
  req.user = {
    id: mockUserId,
    _id: new mongoose.Types.ObjectId(mockUserId),
    name: 'Dev User',
    email: 'dev@test.com'
  };
  
  next();
};

module.exports = mockUser;
