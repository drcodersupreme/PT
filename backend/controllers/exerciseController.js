const Exercise = require("../models/Exercise");
const { AppError, asyncHandler } = require("../middleware/errorMiddleware");

const normalizeListQuery = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => String(item).toLowerCase());
  return String(value)
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
};

const buildExerciseQuery = (query) => {
  const filters = { isActive: true };
  const search = query.q || query.search;
  const muscleGroups = normalizeListQuery(query.muscleGroup || query.muscle || query.primaryMuscle);
  const difficulties = normalizeListQuery(query.difficulty);
  const equipment = normalizeListQuery(query.equipment);

  if (search) {
    filters.$text = { $search: search };
  }

  if (muscleGroups.length) {
    filters.$or = [
      { muscleGroup: { $in: muscleGroups } },
      { primaryMuscle: { $in: muscleGroups } },
      { secondaryMuscles: { $in: muscleGroups } },
    ];
  }

  if (difficulties.length) {
    filters.difficulty = { $in: difficulties };
  }

  if (equipment.length) {
    filters.equipment = { $in: equipment };
  }

  return filters;
};

const listExercises = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 12, 1), 100);
  const skip = (page - 1) * limit;
  const filters = buildExerciseQuery(req.query);
  const sort = req.query.q || req.query.search ? { score: { $meta: "textScore" } } : { name: 1 };
  const projection = req.query.q || req.query.search ? { score: { $meta: "textScore" } } : {};

  const [exercises, total] = await Promise.all([
    Exercise.find(filters, projection).sort(sort).skip(skip).limit(limit),
    Exercise.countDocuments(filters),
  ]);

  res.status(200).json({
    success: true,
    count: exercises.length,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    exercises,
  });
};

const getExercises = asyncHandler(listExercises);

const getExerciseById = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findOne({ _id: req.params.id, isActive: true });

  if (!exercise) {
    throw new AppError("Exercise not found", 404);
  }

  res.status(200).json({
    success: true,
    exercise,
  });
});

const searchExercises = asyncHandler(async (req, res) => {
  if (!req.query.q) {
    throw new AppError("Search query parameter q is required", 400);
  }

  req.query.search = req.query.q;
  return listExercises(req, res);
});

const filterExercises = asyncHandler(async (req, res) => listExercises(req, res));

const createExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.create({
    ...req.body,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    exercise,
  });
});

const updateExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exercise) {
    throw new AppError("Exercise not found", 404);
  }

  res.status(200).json({
    success: true,
    exercise,
  });
});

const deleteExercise = asyncHandler(async (req, res) => {
  const exercise = await Exercise.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!exercise) {
    throw new AppError("Exercise not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Exercise archived",
  });
});

module.exports = {
  getExercises,
  getExerciseById,
  searchExercises,
  filterExercises,
  createExercise,
  updateExercise,
  deleteExercise,
};
