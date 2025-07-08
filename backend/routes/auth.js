const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth'); 
const authLimiter = require('../middleware/rateLimit');
//const redisClient = require('../utils/redisClient');
const blacklist = require('../utils/tokenBlacklist');

router.post('/login', authLimiter, login);

router.post('/register', register);


// Logout route: Blacklist the token
router.post('/logout', authMiddleware, async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (token) {
            await blacklist.add(token); // Add token to blacklist
        }
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Logout failed' });
    }
});

module.exports = router;