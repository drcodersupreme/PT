const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AppError, asyncHandler } = require("./errorMiddleware");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    throw new AppError("Authentication token required", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user || !user.isActive) {
    throw new AppError("User not found or inactive", 401);
  }

  req.user = user;
  next();
});

const admin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(new AppError("Admin access required", 403));
  }

  next();
};

module.exports = {
  protect,
  admin,
};
