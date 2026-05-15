const Exercise = require("../models/Exercise");
const Progress = require("../models/Progress");
const WorkoutPlan = require("../models/WorkoutPlan");
const { AppError, asyncHandler } = require("../middleware/errorMiddleware");
const { generateWorkoutPlan } = require("../utils/workoutGenerator");

const WEEK_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getOrCreateProgress = (userId) =>
  Progress.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId } },
    { new: true, upsert: true }
  );

const getTodayName = () => WEEK_DAYS[new Date().getDay()];

const parseTargetReps = (target = "") => {
  const match = String(target).match(/\d+/);
  return match ? Number(match[0]) : 0;
};

const getExerciseMatch = (sessionExercises, log, index) => {
  if (log.sessionExerciseId) return sessionExercises.id(log.sessionExerciseId);

  return (
    sessionExercises.find((item) => String(item.exercise || "") === String(log.exercise || "")) ||
    sessionExercises.find((item) => item.name === log.name) ||
    sessionExercises[index]
  );
};

const buildDefaultSets = (exercise) =>
  Array.from({ length: exercise.plannedSets || 0 }, (_, index) => ({
    setNumber: index + 1,
    reps: parseTargetReps(exercise.plannedReps),
    weight: 0,
    completed: true,
  }));

const calculateSessionVolume = (session) =>
  session.exercises.reduce(
    (total, exercise) =>
      total +
      exercise.sets.reduce((setTotal, set) => setTotal + (Number(set.weight) || 0) * (Number(set.reps) || 0), 0),
    0
  );

const estimateOneRepMax = (weight, reps) => Math.round(Number(weight) * (1 + Number(reps) / 30));

const updateStrengthRecords = (progress, session) => {
  session.exercises.forEach((exercise) => {
    exercise.sets.forEach((set) => {
      const weight = Number(set.weight) || 0;
      const reps = Number(set.reps) || 0;

      if (!weight || !reps) return;

      const estimatedOneRepMax = estimateOneRepMax(weight, reps);
      const entry = {
        exercise: exercise.exercise,
        exerciseName: exercise.name,
        bestWeight: weight,
        bestReps: reps,
        estimatedOneRepMax,
        volume: weight * reps,
        date: session.completedAt,
      };

      progress.strengthProgress.push(entry);

      const existingRecord = progress.personalRecords.find(
        (record) =>
          String(record.exercise || "") === String(exercise.exercise || "") ||
          record.exerciseName === exercise.name
      );

      if (!existingRecord || estimatedOneRepMax > (existingRecord.estimatedOneRepMax || 0)) {
        if (existingRecord) {
          existingRecord.weight = weight;
          existingRecord.reps = reps;
          existingRecord.estimatedOneRepMax = estimatedOneRepMax;
          existingRecord.achievedAt = session.completedAt;
        } else {
          progress.personalRecords.push({
            exercise: exercise.exercise,
            exerciseName: exercise.name,
            weight,
            reps,
            estimatedOneRepMax,
            achievedAt: session.completedAt,
          });
        }
      }
    });
  });
};

const getWeekStart = (date) => {
  const weekStart = new Date(date);
  const day = weekStart.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  weekStart.setUTCDate(weekStart.getUTCDate() + diff);
  weekStart.setUTCHours(0, 0, 0, 0);
  return weekStart;
};

const updateWeeklyStats = (progress, session, volume) => {
  const weekStart = getWeekStart(session.completedAt);
  const stat = progress.weeklyStats.find(
    (item) => item.weekStart && item.weekStart.toISOString() === weekStart.toISOString()
  );

  if (stat) {
    stat.workoutsCompleted += 1;
    stat.totalDurationMinutes += session.durationMinutes || 0;
    stat.caloriesBurned += session.caloriesBurned || 0;
    stat.totalVolume += volume;
  } else {
    progress.weeklyStats.push({
      weekStart,
      workoutsCompleted: 1,
      totalDurationMinutes: session.durationMinutes || 0,
      caloriesBurned: session.caloriesBurned || 0,
      totalVolume: volume,
    });
  }
};

const generatePlan = asyncHandler(async (req, res) => {
  const exercises = await Exercise.find({ isActive: true });

  if (!exercises.length) {
    throw new AppError("No exercises available. Run npm run seed first.", 422);
  }

  const planPayload = generateWorkoutPlan({
    user: req.user,
    exercises,
    overrides: req.body,
  });

  await WorkoutPlan.updateMany({ user: req.user._id, status: "active" }, { status: "archived" });
  const workoutPlan = await WorkoutPlan.create(planPayload);

  res.status(201).json({
    success: true,
    workoutPlan,
  });
});

const getMyPlan = asyncHandler(async (req, res) => {
  const workoutPlan = await WorkoutPlan.findOne({ user: req.user._id, status: "active" })
    .sort({ createdAt: -1 })
    .populate("weeklySchedule.exercises.exercise");

  if (!workoutPlan) {
    throw new AppError("No active workout plan found", 404);
  }

  res.status(200).json({
    success: true,
    workoutPlan,
  });
});

const startWorkout = asyncHandler(async (req, res) => {
  const workoutPlan = req.body.workoutPlanId
    ? await WorkoutPlan.findOne({ _id: req.body.workoutPlanId, user: req.user._id })
    : await WorkoutPlan.findOne({ user: req.user._id, status: "active" }).sort({ createdAt: -1 });

  if (!workoutPlan) {
    throw new AppError("Workout plan not found", 404);
  }

  const requestedDay = req.body.workoutDayId
    ? workoutPlan.weeklySchedule.id(req.body.workoutDayId)
    : workoutPlan.weeklySchedule.find((day) => day.dayOfWeek === (req.body.dayOfWeek || getTodayName()));

  const workoutDay = requestedDay && !requestedDay.isRest
    ? requestedDay
    : workoutPlan.weeklySchedule.find((day) => !day.isRest);

  if (!workoutDay || workoutDay.isRest) {
    throw new AppError("No workout day available to start", 422);
  }

  const progress = await getOrCreateProgress(req.user._id);

  progress.workoutSessions.push({
    workoutPlan: workoutPlan._id,
    workoutDayId: workoutDay._id,
    workoutName: workoutDay.name,
    dayOfWeek: workoutDay.dayOfWeek,
    status: "started",
    startedAt: new Date(),
    exercises: workoutDay.exercises.map((exercise) => ({
      exercise: exercise.exercise,
      name: exercise.name,
      plannedSets: exercise.sets,
      plannedReps: exercise.reps,
      plannedRestSeconds: exercise.restSeconds,
      sets: [],
      completed: false,
    })),
  });

  const session = progress.workoutSessions[progress.workoutSessions.length - 1];
  await progress.save();

  res.status(201).json({
    success: true,
    session,
  });
});

const completeWorkout = asyncHandler(async (req, res) => {
  const { sessionId, exercises = [], durationMinutes, caloriesBurned, notes } = req.body;

  if (!sessionId) {
    throw new AppError("sessionId is required", 400);
  }

  const progress = await getOrCreateProgress(req.user._id);
  const session = progress.workoutSessions.id(sessionId);

  if (!session) {
    throw new AppError("Workout session not found", 404);
  }

  const wasCompleted = session.status === "completed";

  if (exercises.length) {
    exercises.forEach((exerciseLog, index) => {
      const target = getExerciseMatch(session.exercises, exerciseLog, index);
      if (!target) return;

      target.sets = exerciseLog.sets || buildDefaultSets(target);
      target.completed = exerciseLog.completed !== undefined ? exerciseLog.completed : true;
    });
  } else {
    session.exercises.forEach((exercise) => {
      exercise.sets = buildDefaultSets(exercise);
      exercise.completed = true;
    });
  }

  session.status = "completed";
  session.completedAt = req.body.completedAt ? new Date(req.body.completedAt) : new Date();
  session.durationMinutes =
    Number(durationMinutes) ||
    Math.max(Math.round((session.completedAt.getTime() - session.startedAt.getTime()) / 60000), 1);
  session.caloriesBurned = Number(caloriesBurned) || session.caloriesBurned || Math.round(session.durationMinutes * 7);
  session.notes = notes || session.notes;

  if (!wasCompleted) {
    const volume = calculateSessionVolume(session);
    updateStrengthRecords(progress, session);
    updateWeeklyStats(progress, session, volume);
  }

  progress.recalculateStreak();
  await progress.save();

  res.status(200).json({
    success: true,
    session,
    streak: progress.streak,
    personalRecords: progress.personalRecords,
  });
});

const getWorkoutHistory = asyncHandler(async (req, res) => {
  const progress = await getOrCreateProgress(req.user._id);
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const sessions = progress.workoutSessions
    .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
    .slice(0, limit);

  res.status(200).json({
    success: true,
    count: sessions.length,
    sessions,
  });
});

module.exports = {
  generatePlan,
  getMyPlan,
  startWorkout,
  completeWorkout,
  getWorkoutHistory,
};
