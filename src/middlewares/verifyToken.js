const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({
      error: true,
      auth: false,
      message: 'No token provided.',
    });

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({
      error: true,
      auth: false,
      message: 'Invalid token.',
    });
  }
}

module.exports = verifyToken;