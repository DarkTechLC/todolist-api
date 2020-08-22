const jwt = require('jsonwebtoken');

// Tokens expires in 2 days by default
const generateTokenByTheID = (id, timeToExpires = 172800) => jwt.sign(
  { id }, process.env.SECRET, { expiresIn: timeToExpires }
);

module.exports = generateTokenByTheID;