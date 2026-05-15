const Progress = require("../models/Progress");
const { asyncHandler } = require("../middleware/errorMiddleware");

const getOrCreateProgress = (userId) =>
  Progress.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId } },
    { new: true, upsert: true }
  );

const getWeightTrend = (entries) => {
  if (entries.length < 2) return 0;

  const sorted = [...entries].sort((a, b) => new Date(a.date) - new Date(b.date));
  return Number((sorted[sorted.length - 1].weight - sorted[0].weight).toFixed(1));
};

const calculateTotalVolume = (sessions) =>
  sessions.reduce(
    (sessionTotal, session) =>
      sessionTotal +
      session.exercises.reduce(
        (exerciseTotal, exercise) =>
          exerciseTotal +
          exercise.sets.reduce((setTotal, set) => setTotal + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0),
        0
      ),
    0
  );

const updateProgress = asyncHandler(async (req, res) => {
  const progress = await getOrCreateProgress(req.user._id);

  if (req.body.bodyWeight) {
    progress.bodyWeightEntries.push({
      weight: Number(req.body.bodyWeight),
      date: req.body.date ? new Date(req.body.date) : new Date(),
      notes: req.body.notes,
    });
  }

  if (Array.isArray(req.body.strengthProgress)) {
    req.body.strengthProgress.forEach((entry) => progress.strengthProgress.push(entry));
  }

  if (Array.isArray(req.body.personalRecords)) {
    req.body.personalRecords.forEach((entry) => progress.personalRecords.push(entry));
  }

  await progress.save();

  res.status(200).json({
    success: true,
    progress,
  });
});

const getProgressHistory = asyncHandler(async (req, res) => {
  const progress = await getOrCreateProgress(req.user._id);
  const limit = Math.min(Number(req.query.limit) || 50, 200);
  const sortDesc = (items, field) => [...items].sort((a, b) => new Date(b[field]) - new Date(a[field])).slice(0, limit);

  res.status(200).json({
    success: true,
    history: {
      bodyWeightEntries: sortDesc(progress.bodyWeightEntries, "date"),
      strengthProgress: sortDesc(progress.strengthProgress, "date"),
      workoutSessions: sortDesc(progress.workoutSessions, "startedAt"),
      personalRecords: sortDesc(progress.personalRecords, "achievedAt"),
    },
  });
});

const getProgressStats = asyncHandler(async (req, res) => {
  const progress = await getOrCreateProgress(req.user._id);
  const completedSessions = progress.workoutSessions.filter((session) => session.status === "completed");
  const sortedSessions = [...completedSessions].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  const lastSixWeights = [...progress.bodyWeightEntries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-6);

  progress.recalculateStreak();
  await progress.save();

  res.status(200).json({
    success: true,
    stats: {
      totalWorkouts: completedSessions.length,
      totalDurationMinutes: completedSessions.reduce((total, session) => total + (session.durationMinutes || 0), 0),
      totalCaloriesBurned: completedSessions.reduce((total, session) => total + (session.caloriesBurned || 0), 0),
      totalVolume: calculateTotalVolume(completedSessions),
      currentStreak: progress.streak.current,
      bestStreak: progress.streak.best,
      weightTrend: getWeightTrend(lastSixWeights),
      personalRecords: progress.personalRecords,
      weeklyStats: [...progress.weeklyStats].sort((a, b) => new Date(b.weekStart) - new Date(a.weekStart)).slice(0, 12),
      recentActivities: sortedSessions.slice(0, 5),
    },
  });
});

module.exports = {
  updateProgress,
  getProgressHistory,
  getProgressStats,
};
