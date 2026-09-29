const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const header = req.header("Authorization");
    if (!header) return res.status(401).json({ message: "No token provided" });

    const token = header.startsWith("Bearer ") ? header.slice(7) : header;
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
