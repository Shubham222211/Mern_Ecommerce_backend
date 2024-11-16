const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // 

  if (!token) {
    return res.status(401).json({ msg: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ msg: "Invalid token, authorization denied" });
  }
};

module.exports = authMiddleware;
