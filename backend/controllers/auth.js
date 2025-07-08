const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name,username, password,email } = req.body;
    // Validate all required fields
    if (!name || !username || !password || !email) {
      return res.status(400).json({ 
        success: false,
        message: 'All fields (name, username, email, password) are required' 
      });
    }
  
    try {
      // Check for existing user by both username AND email
      const existingUser = await User.findOne({ 
        $or: [{ username }, { email }] 
      });
      
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this username or email already exists'
        });
      }
  
      // Create and save user (password auto-hashed via pre-save hook)
      const user = new User({ name, username, password, email });
      await user.save();
  
      // Create token
      const payload = { userId: user.id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Return response without password
      const userResponse = user.toObject();
      delete userResponse.password;
  
      res.status(201).json({ 
        success: true,
        token,
        user: userResponse
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ 
        success: false,
        message: 'Server error during registration' 
      });
    }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password required'
    });
  }
  try {
    const user = await User.findOne({ username });
    //if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials', attemptsLeft: req.rateLimit.remaining });

    const isMatch = await bcrypt.compare(password, user.password);
    //if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials', });
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials', attemptsLeft: req.rateLimit.remaining });
    if (user.isBlocked) {
      return res.status(403).json({success: false, message: "Your account is blocked. Please contact support." });
    }
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ success: true,token });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      
    });
  }
};