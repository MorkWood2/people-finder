const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');
  //check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, Authorization denied' });
  }
  //if there is a token we have to verify
  try {
    //token payload will be decoded variable
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //set user in payload to req.user
    //so we can access it inside route
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid ' });
  }
};
