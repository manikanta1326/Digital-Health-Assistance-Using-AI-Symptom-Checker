const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protectAdmin = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      // Decode user ID from the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user profile from database
      req.user = await User.findById(decoded.id).select("-password");

      // Verify if the account role is 'admin'
      if (req.user && req.user.role === "admin") {
        next(); // Authorization granted, proceed to the route
      } else {
        return res.status(403).json({ message: "Access Denied: Admin privileges required." });
      }
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed." });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no secure token found." });
  }
};