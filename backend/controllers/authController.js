const Progress = require("../models/Progress");
const User = require("../models/User");
const { AppError, asyncHandler } = require("../middleware/errorMiddleware");
const generateToken = require("../utils/generateToken");

const normalizeWorkoutPreferences = (body) => {
  const preferences = body.workoutPreferences || {};
  const preferredDays = preferences.preferredDays || body.days || [];
  const equipment = preferences.equipment || body.equipment || [];
  const sessionDuration = preferences.sessionDuration || body.duration;
  const workoutDaysPerWeek = preferences.workoutDaysPerWeek || body.workoutDays || preferredDays.length || undefined;

  return {
    ...preferences,
    ...(preferredDays.length && { preferredDays }),
    ...(equipment.length && { equipment }),
    ...(sessionDuration && { sessionDuration: Number(sessionDuration) }),
    ...(workoutDaysPerWeek && { workoutDaysPerWeek: Number(workoutDaysPerWeek) }),
  };
};

const sendAuthResponse = (res, statusCode, user) => {
  res.status(statusCode).json({
    success: true,
    token: generateToken(user._id),
    user,
  });
};

const register = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    age,
    height,
    weight,
    gender,
    fitnessGoal,
    goal,
    experienceLevel,
    experience,
    aiContext,
  } = req.body;

  const existingUser = await User.findOne({ email: String(email).toLowerCase() });
  if (existingUser) {
    throw new AppError("Email is already registered", 409);
  }

  const user = await User.create({
    name,
    email,
    password,
    age,
    height,
    weight,
    gender,
    fitnessGoal: fitnessGoal || goal,
    experienceLevel: experienceLevel || experience,
    workoutPreferences: normalizeWorkoutPreferences(req.body),
    aiContext,
  });

  await Progress.create({ user: user._id });

  sendAuthResponse(res, 201, user);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: String(email).toLowerCase() }).select("+password");

  if (!user || !(await user.matchPassword(password))) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("This account is inactive", 403);
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  sendAuthResponse(res, 200, user);
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favoriteExercises");

  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = {
  register,
  login,
  getProfile,
};
