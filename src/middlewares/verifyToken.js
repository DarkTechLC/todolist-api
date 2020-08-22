const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({
      auth: false,
      message: 'No token provided.',
    });

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        auth: false,
        message: 'Invalid token.',
      });

    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;