const jwt = require("jsonwebtoken");

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.Token;

    if (!token) {
      throw new Error("Access Denied: No Token Provided");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next(); // Continue to the route handler
  } catch (err) {
    next(err)
  }
};

module.exports = authMiddleware;
