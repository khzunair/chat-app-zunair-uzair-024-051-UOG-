const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');


module.exports = async  function(req,res,next){
    // Get token from header
    const token = req.header('x-auth-token');

     // Check token
  if (!token) {
    return res.status(401).json({ msg: 'AUTHORIZATION DENIED' });
  }
    // verify Token
    try {
        // Verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
    
        // Check if user is verified
        const user = await User.findById(decoded.user.id);
        if (!user) {
          return res.status(401).json({ msg: 'User not found' });
        }
    
    
        req.user = decoded.user;
        next();
      } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      }
}