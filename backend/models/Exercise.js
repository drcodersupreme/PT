const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    sets: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    reps: {
      type: String,
      required: true,
      trim: true,
    },
    restSeconds: {
      type: Number,
      min: 15,
      max: 600,
      default: 90,
    },
  },
  { _id: false }
);

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Exercise name is required"],
      trim: true,
      unique: true,
      maxlength: 120,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: 1200,
    },
    primaryMuscle: {
      type: String,
      required: [true, "Primary muscle is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    muscleGroup: {
      type: String,
      required: [true, "Muscle group is required"],
      lowercase: true,
      trim: true,
      index: true,
    },
    secondaryMuscles: {
      type: [String],
      default: [],
      set: (items) => items.map((item) => String(item).toLowerCase()),
    },
    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      required: true,
      index: true,
    },
    equipment: {
      type: [String],
      required: true,
      set: (items) => items.map((item) => String(item).toLowerCase()),
      index: true,
    },
    videoUrl: {
      type: String,
      trim: true,
      default: "",
    },
    instructions: {
      type: [String],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "At least one instruction is required",
      },
    },
    commonMistakes: {
      type: [String],
      default: [],
    },
    breathingTechnique: {
      inhale: {
        type: String,
        default: "",
      },
      exhale: {
        type: String,
        default: "",
      },
      notes: {
        type: String,
        default: "",
      },
    },
    setsAndRepsRecommendation: {
      beginner: recommendationSchema,
      intermediate: recommendationSchema,
      advanced: recommendationSchema,
    },
    caloriesPerMinute: {
      type: Number,
      min: 1,
      max: 25,
      default: 6,
    },
    tags: {
      type: [String],
      default: [],
      set: (items) => items.map((item) => String(item).toLowerCase()),
    },
    aiMetadata: {
      formCheckPoints: {
        type: [String],
        default: [],
      },
      poseDetectionKeypoints: {
        type: [String],
        default: [],
      },
      recommendationContext: {
        type: String,
        default: "",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

exerciseSchema.index({
  name: "text",
  description: "text",
  primaryMuscle: "text",
  muscleGroup: "text",
  secondaryMuscles: "text",
  tags: "text",
});

module.exports = mongoose.model("Exercise", exerciseSchema);
