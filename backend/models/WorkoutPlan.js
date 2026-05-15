const mongoose = require("mongoose");

const workoutExerciseSchema = new mongoose.Schema(
  {
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
    name: {
      type: String,
      required: true,
    },
    primaryMuscle: {
      type: String,
      required: true,
    },
    equipment: {
      type: [String],
      default: [],
    },
    sets: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    reps: {
      type: String,
      required: true,
    },
    restSeconds: {
      type: Number,
      min: 15,
      max: 600,
      default: 90,
    },
    tempo: {
      type: String,
      default: "controlled",
    },
    notes: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const workoutDaySchema = new mongoose.Schema(
  {
    dayOfWeek: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    focus: {
      type: [String],
      default: [],
    },
    isRest: {
      type: Boolean,
      default: false,
    },
    estimatedDurationMinutes: {
      type: Number,
      default: 0,
    },
    estimatedCalories: {
      type: Number,
      default: 0,
    },
    exercises: {
      type: [workoutExerciseSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const workoutPlanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    splitType: {
      type: String,
      enum: ["push_pull_legs", "bro_split", "upper_lower", "beginner_full_body"],
      required: true,
      index: true,
    },
    goal: {
      type: String,
      enum: ["lose_weight", "build_muscle", "strength", "endurance", "general_fitness"],
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
    },
    daysPerWeek: {
      type: Number,
      min: 1,
      max: 7,
      required: true,
    },
    equipment: {
      type: [String],
      default: [],
    },
    sessionDuration: {
      type: Number,
      min: 15,
      max: 180,
      default: 45,
    },
    weeklySchedule: {
      type: [workoutDaySchema],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
      index: true,
    },
    aiMetadata: {
      generationSource: {
        type: String,
        enum: ["rule_based", "ai_assisted"],
        default: "rule_based",
      },
      personalizationInputs: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
      },
      futureRecommendationNotes: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true }
);

workoutPlanSchema.index({ user: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
