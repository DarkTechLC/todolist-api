const jwt = require('jsonwebtoken');

// Tokens expires in 1 day by default
const generateTokenByTheID = (id, timeToExpires = 86400) => {
  return jwt.sign(
    { id },
    process.env.SECRET,
    { expiresIn: timeToExpires }
  );
}

module.exports = generateTokenByTheID;