const Exercise = require("../models/Exercise");
const User = require("../models/User");
const { AppError, asyncHandler } = require("../middleware/errorMiddleware");

const allowedProfileFields = [
  "name",
  "email",
  "age",
  "height",
  "weight",
  "gender",
  "fitnessGoal",
  "experienceLevel",
  "aiContext",
];

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favoriteExercises");

  res.status(200).json({
    success: true,
    user,
  });
});

const updateCurrentUser = asyncHandler(async (req, res) => {
  const updates = {};

  allowedProfileFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  if (req.body.goal && !updates.fitnessGoal) updates.fitnessGoal = req.body.goal;
  if (req.body.experience && !updates.experienceLevel) updates.experienceLevel = req.body.experience;

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).populate("favoriteExercises");

  res.status(200).json({
    success: true,
    user,
  });
});

const updateWorkoutPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const currentPreferences = user.workoutPreferences.toObject?.() || user.workoutPreferences || {};

  user.workoutPreferences = {
    ...currentPreferences,
    ...req.body,
  };

  await user.save();

  res.status(200).json({
    success: true,
    workoutPreferences: user.workoutPreferences,
  });
});

const toggleFavoriteExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findById(req.params.exerciseId);

  if (!exercise || !exercise.isActive) {
    throw new AppError("Exercise not found", 404);
  }

  const user = await User.findById(req.user._id);
  const exerciseId = String(exercise._id);
  const exists = user.favoriteExercises.some((id) => String(id) === exerciseId);

  user.favoriteExercises = exists
    ? user.favoriteExercises.filter((id) => String(id) !== exerciseId)
    : [...user.favoriteExercises, exercise._id];

  await user.save();
  await user.populate("favoriteExercises");

  res.status(200).json({
    success: true,
    isFavorite: !exists,
    favoriteExercises: user.favoriteExercises,
  });
});

const getFavoriteExercises = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("favoriteExercises");

  res.status(200).json({
    success: true,
    count: user.favoriteExercises.length,
    exercises: user.favoriteExercises,
  });
});

module.exports = {
  getCurrentUser,
  updateCurrentUser,
  updateWorkoutPreferences,
  toggleFavoriteExercise,
  getFavoriteExercises,
};
