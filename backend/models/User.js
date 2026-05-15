const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const workoutPreferencesSchema = new mongoose.Schema(
  {
    workoutDaysPerWeek: {
      type: Number,
      min: 1,
      max: 7,
      default: 3,
    },
    preferredDays: {
      type: [String],
      default: [],
    },
    sessionDuration: {
      type: Number,
      min: 15,
      max: 180,
      default: 45,
    },
    equipment: {
      type: [String],
      default: ["bodyweight"],
      set: (items) => items.map((item) => String(item).toLowerCase()),
    },
    preferredMuscleGroups: {
      type: [String],
      default: [],
    },
    avoidExercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
  },
  { _id: false }
);

const aiContextSchema = new mongoose.Schema(
  {
    injuries: {
      type: [String],
      default: [],
    },
    limitations: {
      type: [String],
      default: [],
    },
    formCheckOptIn: {
      type: Boolean,
      default: false,
    },
    recommendationTags: {
      type: [String],
      default: [],
    },
    lastRecommendationAt: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    age: {
      type: Number,
      min: 13,
      max: 100,
    },
    height: {
      type: Number,
      min: 90,
      max: 250,
    },
    weight: {
      type: Number,
      min: 25,
      max: 350,
    },
    gender: {
      type: String,
      enum: ["male", "female", "non_binary", "prefer_not_to_say", "other"],
    },
    fitnessGoal: {
      type: String,
      enum: ["lose_weight", "build_muscle", "strength", "endurance", "general_fitness"],
      default: "general_fitness",
    },
    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    workoutPreferences: {
      type: workoutPreferencesSchema,
      default: () => ({}),
    },
    favoriteExercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
    ],
    aiContext: {
      type: aiContextSchema,
      default: () => ({}),
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: Date,
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.matchPassword = function matchPassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
