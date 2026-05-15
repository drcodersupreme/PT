const mongoose = require("mongoose");
const { AppError } = require("./errorMiddleware");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedExperienceLevels = ["beginner", "intermediate", "advanced"];
const allowedGoals = ["lose_weight", "build_muscle", "strength", "endurance", "general_fitness"];
const allowedDifficulties = ["beginner", "intermediate", "advanced"];

const collectErrors = (rules, body) =>
  rules.reduce((errors, rule) => {
    const message = rule.validate(body);
    return message ? [...errors, { field: rule.field, message }] : errors;
  }, []);

const runValidation = (rules) => (req, res, next) => {
  const errors = collectErrors(rules, req.body);

  if (errors.length) {
    return next(new AppError("Validation failed", 400, errors));
  }

  next();
};

const isNumberInRange = (value, min, max) => {
  if (value === undefined || value === null || value === "") return true;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue >= min && numberValue <= max;
};

const validateObjectId = (paramName = "id") => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[paramName])) {
    return next(new AppError(`Invalid ${paramName}`, 400));
  }

  next();
};

const validateRegister = runValidation([
  {
    field: "name",
    validate: ({ name }) => (!name || name.trim().length < 2 ? "Name must be at least 2 characters" : null),
  },
  {
    field: "email",
    validate: ({ email }) => (!emailRegex.test(String(email || "").toLowerCase()) ? "Valid email is required" : null),
  },
  {
    field: "password",
    validate: ({ password }) => (!password || password.length < 8 ? "Password must be at least 8 characters" : null),
  },
  {
    field: "age",
    validate: ({ age }) => (!isNumberInRange(age, 13, 100) ? "Age must be between 13 and 100" : null),
  },
  {
    field: "height",
    validate: ({ height }) => (!isNumberInRange(height, 90, 250) ? "Height must be between 90cm and 250cm" : null),
  },
  {
    field: "weight",
    validate: ({ weight }) => (!isNumberInRange(weight, 25, 350) ? "Weight must be between 25kg and 350kg" : null),
  },
]);

const validateLogin = runValidation([
  {
    field: "email",
    validate: ({ email }) => (!emailRegex.test(String(email || "").toLowerCase()) ? "Valid email is required" : null),
  },
  {
    field: "password",
    validate: ({ password }) => (!password ? "Password is required" : null),
  },
]);

const validateUserUpdate = runValidation([
  {
    field: "email",
    validate: ({ email }) => (email && !emailRegex.test(String(email).toLowerCase()) ? "Valid email is required" : null),
  },
  {
    field: "experienceLevel",
    validate: ({ experienceLevel }) =>
      experienceLevel && !allowedExperienceLevels.includes(experienceLevel)
        ? `Experience level must be one of: ${allowedExperienceLevels.join(", ")}`
        : null,
  },
  {
    field: "fitnessGoal",
    validate: ({ fitnessGoal }) =>
      fitnessGoal && !allowedGoals.includes(fitnessGoal) ? `Fitness goal must be one of: ${allowedGoals.join(", ")}` : null,
  },
]);

const validateExercise = runValidation([
  {
    field: "name",
    validate: ({ name }) => (!name || name.trim().length < 2 ? "Exercise name is required" : null),
  },
  {
    field: "description",
    validate: ({ description }) =>
      !description || description.trim().length < 10 ? "Description must be at least 10 characters" : null,
  },
  {
    field: "primaryMuscle",
    validate: ({ primaryMuscle }) => (!primaryMuscle ? "Primary muscle is required" : null),
  },
  {
    field: "difficulty",
    validate: ({ difficulty }) =>
      !allowedDifficulties.includes(difficulty) ? `Difficulty must be one of: ${allowedDifficulties.join(", ")}` : null,
  },
  {
    field: "equipment",
    validate: ({ equipment }) => (!Array.isArray(equipment) || equipment.length === 0 ? "At least one equipment option is required" : null),
  },
]);

const validateWorkoutGeneration = runValidation([
  {
    field: "goal",
    validate: ({ goal }) => (goal && !allowedGoals.includes(goal) ? `Goal must be one of: ${allowedGoals.join(", ")}` : null),
  },
  {
    field: "experienceLevel",
    validate: ({ experienceLevel }) =>
      experienceLevel && !allowedExperienceLevels.includes(experienceLevel)
        ? `Experience level must be one of: ${allowedExperienceLevels.join(", ")}`
        : null,
  },
  {
    field: "workoutDays",
    validate: ({ workoutDays }) =>
      workoutDays !== undefined && (!Number.isInteger(Number(workoutDays)) || Number(workoutDays) < 1 || Number(workoutDays) > 7)
        ? "Workout days must be a number between 1 and 7"
        : null,
  },
]);

const validateProgressUpdate = runValidation([
  {
    field: "bodyWeight",
    validate: ({ bodyWeight }) => (!isNumberInRange(bodyWeight, 25, 350) ? "Body weight must be between 25kg and 350kg" : null),
  },
]);

module.exports = {
  validateObjectId,
  validateRegister,
  validateLogin,
  validateUserUpdate,
  validateExercise,
  validateWorkoutGeneration,
  validateProgressUpdate,
};
