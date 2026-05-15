const mongoose = require("mongoose");

const setLogSchema = new mongoose.Schema(
  {
    setNumber: Number,
    reps: Number,
    weight: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: true,
    },
    rpe: {
      type: Number,
      min: 1,
      max: 10,
    },
    notes: String,
  },
  { _id: false }
);

const sessionExerciseSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
    name: String,
    plannedSets: Number,
    plannedReps: String,
    plannedRestSeconds: Number,
    sets: {
      type: [setLogSchema],
      default: [],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true }
);

const workoutSessionSchema = new mongoose.Schema(
  {
    workoutPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutPlan",
    },
    workoutDayId: mongoose.Schema.Types.ObjectId,
    workoutName: String,
    dayOfWeek: String,
    status: {
      type: String,
      enum: ["started", "completed", "abandoned"],
      default: "started",
      index: true,
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: Date,
    durationMinutes: {
      type: Number,
      default: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    exercises: {
      type: [sessionExerciseSchema],
      default: [],
    },
    notes: String,
  },
  { _id: true }
);

const bodyWeightEntrySchema = new mongoose.Schema(
  {
    weight: {
      type: Number,
      required: true,
      min: 25,
      max: 350,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  },
  { _id: true }
);

const strengthProgressSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
    exerciseName: String,
    bestWeight: Number,
    bestReps: Number,
    estimatedOneRepMax: Number,
    volume: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const personalRecordSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
    exerciseName: String,
    weight: Number,
    reps: Number,
    estimatedOneRepMax: Number,
    achievedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);

const weeklyStatSchema = new mongoose.Schema(
  {
    weekStart: Date,
    workoutsCompleted: {
      type: Number,
      default: 0,
    },
    totalDurationMinutes: {
      type: Number,
      default: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    totalVolume: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    bodyWeightEntries: {
      type: [bodyWeightEntrySchema],
      default: [],
    },
    strengthProgress: {
      type: [strengthProgressSchema],
      default: [],
    },
    workoutSessions: {
      type: [workoutSessionSchema],
      default: [],
    },
    streak: {
      current: {
        type: Number,
        default: 0,
      },
      best: {
        type: Number,
        default: 0,
      },
      lastWorkoutDate: Date,
    },
    personalRecords: {
      type: [personalRecordSchema],
      default: [],
    },
    weeklyStats: {
      type: [weeklyStatSchema],
      default: [],
    },
  },
  { timestamps: true }
);

progressSchema.methods.recalculateStreak = function recalculateStreak() {
  const completedDays = [
    ...new Set(
      this.workoutSessions
        .filter((session) => session.status === "completed" && session.completedAt)
        .map((session) => session.completedAt.toISOString().slice(0, 10))
    ),
  ].sort((a, b) => new Date(b) - new Date(a));

  if (!completedDays.length) {
    this.streak.current = 0;
    this.streak.lastWorkoutDate = undefined;
    return this.streak;
  }

  let current = 1;
  let cursor = new Date(`${completedDays[0]}T00:00:00.000Z`);

  for (let index = 1; index < completedDays.length; index += 1) {
    const expected = new Date(cursor);
    expected.setUTCDate(expected.getUTCDate() - 1);

    if (completedDays[index] !== expected.toISOString().slice(0, 10)) break;

    current += 1;
    cursor = expected;
  }

  this.streak.current = current;
  this.streak.best = Math.max(this.streak.best || 0, current);
  this.streak.lastWorkoutDate = new Date(`${completedDays[0]}T00:00:00.000Z`);

  return this.streak;
};

module.exports = mongoose.model("Progress", progressSchema);
