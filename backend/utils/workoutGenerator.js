const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DAY_ALIASES = {
  mon: "Monday",
  monday: "Monday",
  tue: "Tuesday",
  tuesday: "Tuesday",
  wed: "Wednesday",
  wednesday: "Wednesday",
  thu: "Thursday",
  thursday: "Thursday",
  fri: "Friday",
  friday: "Friday",
  sat: "Saturday",
  saturday: "Saturday",
  sun: "Sunday",
  sunday: "Sunday",
};

const SPLIT_CONFIG = {
  beginner_full_body: {
    label: "Beginner Full Body",
    cycle: [
      { name: "Full Body Strength", focus: ["chest", "back", "legs", "shoulders", "core"] },
      { name: "Full Body Conditioning", focus: ["legs", "back", "chest", "arms", "core"] },
      { name: "Full Body Hypertrophy", focus: ["chest", "legs", "back", "shoulders", "arms"] },
    ],
  },
  upper_lower: {
    label: "Upper Lower",
    cycle: [
      { name: "Upper Body", focus: ["chest", "back", "shoulders", "arms"] },
      { name: "Lower Body", focus: ["legs", "core"] },
      { name: "Upper Strength", focus: ["back", "chest", "shoulders", "arms"] },
      { name: "Lower Strength", focus: ["legs", "core"] },
    ],
  },
  push_pull_legs: {
    label: "Push Pull Legs",
    cycle: [
      { name: "Push Day", focus: ["chest", "shoulders", "arms"] },
      { name: "Pull Day", focus: ["back", "arms"] },
      { name: "Leg Day", focus: ["legs", "core"] },
      { name: "Push Hypertrophy", focus: ["chest", "shoulders", "arms"] },
      { name: "Pull Hypertrophy", focus: ["back", "arms"] },
      { name: "Lower Body", focus: ["legs", "core"] },
    ],
  },
  bro_split: {
    label: "Bro Split",
    cycle: [
      { name: "Chest Day", focus: ["chest"] },
      { name: "Back Day", focus: ["back"] },
      { name: "Leg Day", focus: ["legs"] },
      { name: "Shoulder Day", focus: ["shoulders"] },
      { name: "Arms and Core", focus: ["arms", "core"] },
    ],
  },
};

const EXPERIENCE_DIFFICULTY = {
  beginner: ["beginner"],
  intermediate: ["beginner", "intermediate"],
  advanced: ["beginner", "intermediate", "advanced"],
};

const normalizeString = (value) => String(value || "").trim().toLowerCase();

const normalizeEquipment = (equipment = []) => {
  const normalized = [...new Set(equipment.map(normalizeString).filter(Boolean))];

  if (!normalized.length || normalized.includes("none")) {
    return ["bodyweight"];
  }

  return [...new Set([...normalized, "bodyweight"])];
};

const normalizePreferredDays = (preferredDays = [], daysPerWeek = 3) => {
  const mapped = preferredDays
    .map((day) => DAY_ALIASES[normalizeString(day)])
    .filter(Boolean);

  if (mapped.length) {
    return [...new Set(mapped)].slice(0, daysPerWeek);
  }

  if (daysPerWeek <= 2) return ["Monday", "Thursday"].slice(0, daysPerWeek);
  if (daysPerWeek === 3) return ["Monday", "Wednesday", "Friday"];
  if (daysPerWeek === 4) return ["Monday", "Tuesday", "Thursday", "Saturday"];
  if (daysPerWeek === 5) return ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday"];
  if (daysPerWeek === 6) return ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return WEEK_DAYS;
};

const chooseSplitType = ({ goal, experienceLevel, daysPerWeek }) => {
  if (experienceLevel === "beginner" || daysPerWeek <= 3) return "beginner_full_body";
  if (daysPerWeek === 4) return "upper_lower";
  if (daysPerWeek === 5 && goal === "build_muscle" && experienceLevel === "advanced") return "bro_split";
  return "push_pull_legs";
};

const getExerciseId = (exercise) => exercise._id || exercise.id;

const matchesEquipment = (exercise, equipment) => {
  const exerciseEquipment = (exercise.equipment || []).map(normalizeString);
  return exerciseEquipment.some((item) => equipment.includes(item));
};

const matchesDifficulty = (exercise, experienceLevel) => {
  const allowed = EXPERIENCE_DIFFICULTY[experienceLevel] || EXPERIENCE_DIFFICULTY.beginner;
  return allowed.includes(normalizeString(exercise.difficulty));
};

const getRecommendation = (exercise, experienceLevel, goal) => {
  const recommendations = exercise.setsAndRepsRecommendation || {};
  const base = recommendations[experienceLevel] || recommendations.intermediate || recommendations.beginner || {
    sets: experienceLevel === "advanced" ? 4 : 3,
    reps: "8-12",
    restSeconds: 90,
  };

  if (goal === "strength") {
    return {
      sets: Math.min((base.sets || 3) + 1, 6),
      reps: "3-6",
      restSeconds: Math.max(base.restSeconds || 90, 150),
    };
  }

  if (goal === "endurance" || goal === "lose_weight") {
    return {
      sets: Math.max(base.sets || 3, 3),
      reps: "12-20",
      restSeconds: Math.min(base.restSeconds || 75, 75),
    };
  }

  return base;
};

const getExerciseLimit = (sessionDuration) => {
  if (sessionDuration <= 30) return 4;
  if (sessionDuration <= 45) return 5;
  if (sessionDuration <= 60) return 6;
  return 8;
};

const sortCandidates = (focus) => (a, b) => {
  const aPrimaryIndex = focus.indexOf(normalizeString(a.muscleGroup || a.primaryMuscle));
  const bPrimaryIndex = focus.indexOf(normalizeString(b.muscleGroup || b.primaryMuscle));

  if (aPrimaryIndex !== bPrimaryIndex) return aPrimaryIndex - bPrimaryIndex;

  const aCompound = (a.tags || []).includes("compound") ? 0 : 1;
  const bCompound = (b.tags || []).includes("compound") ? 0 : 1;
  return aCompound - bCompound;
};

const selectExercisesForDay = ({ exercises, focus, equipment, experienceLevel, goal, sessionDuration }) => {
  const limit = getExerciseLimit(sessionDuration);
  const focusSet = new Set(focus.map(normalizeString));

  const candidates = exercises
    .filter((exercise) => exercise.isActive !== false)
    .filter((exercise) => focusSet.has(normalizeString(exercise.muscleGroup || exercise.primaryMuscle)))
    .filter((exercise) => matchesEquipment(exercise, equipment))
    .filter((exercise) => matchesDifficulty(exercise, experienceLevel))
    .sort(sortCandidates(focus));

  const selected = [];
  const usedMuscles = new Set();

  for (const candidate of candidates) {
    const muscle = normalizeString(candidate.muscleGroup || candidate.primaryMuscle);

    if (!usedMuscles.has(muscle) || selected.length >= focus.length) {
      selected.push(candidate);
      usedMuscles.add(muscle);
    }

    if (selected.length >= limit) break;
  }

  for (const candidate of candidates) {
    if (selected.length >= limit) break;
    if (!selected.some((exercise) => String(getExerciseId(exercise)) === String(getExerciseId(candidate)))) {
      selected.push(candidate);
    }
  }

  return selected.map((exercise, index) => {
    const recommendation = getRecommendation(exercise, experienceLevel, goal);

    return {
      exercise: getExerciseId(exercise),
      name: exercise.name,
      primaryMuscle: exercise.primaryMuscle,
      equipment: exercise.equipment || [],
      sets: recommendation.sets,
      reps: recommendation.reps,
      restSeconds: recommendation.restSeconds,
      tempo: goal === "strength" ? "explosive concentric, controlled eccentric" : "controlled",
      notes: buildExerciseNote(goal, experienceLevel),
      order: index + 1,
    };
  });
};

const buildExerciseNote = (goal, experienceLevel) => {
  if (experienceLevel === "beginner") return "Prioritize clean technique before adding load.";
  if (goal === "strength") return "Use heavier loads while keeping two reps in reserve on most sets.";
  if (goal === "lose_weight") return "Keep transitions crisp and stay within the prescribed rest period.";
  return "Use a challenging load and finish each set with controlled form.";
};

const estimateDuration = (exerciseItems) => {
  const seconds = exerciseItems.reduce((total, item) => {
    const workSeconds = item.sets * 45;
    const restSeconds = Math.max(item.sets - 1, 0) * item.restSeconds;
    const transitionSeconds = 90;
    return total + workSeconds + restSeconds + transitionSeconds;
  }, 0);

  return Math.max(Math.round(seconds / 60), exerciseItems.length ? 20 : 0);
};

const estimateCalories = ({ exerciseItems, exerciseDocs, durationMinutes, userWeight, goal }) => {
  const docsById = new Map(exerciseDocs.map((exercise) => [String(getExerciseId(exercise)), exercise]));
  const averageCaloriesPerMinute =
    exerciseItems.reduce((total, item) => {
      const doc = docsById.get(String(item.exercise));
      return total + (doc?.caloriesPerMinute || 6);
    }, 0) / Math.max(exerciseItems.length, 1);

  const weightFactor = userWeight ? Number(userWeight) / 75 : 1;
  const goalFactor = goal === "lose_weight" || goal === "endurance" ? 1.15 : 1;

  return Math.round(averageCaloriesPerMinute * durationMinutes * weightFactor * goalFactor);
};

const buildRestDay = (dayOfWeek) => ({
  dayOfWeek,
  name: "Rest Day",
  focus: ["recovery"],
  isRest: true,
  estimatedDurationMinutes: 0,
  estimatedCalories: 0,
  exercises: [],
});

const generateWorkoutPlan = ({ user, exercises, overrides = {} }) => {
  const experienceLevel = overrides.experienceLevel || user.experienceLevel || "beginner";
  const goal = overrides.goal || user.fitnessGoal || "general_fitness";
  const workoutDays = Number(overrides.workoutDays || user.workoutPreferences?.workoutDaysPerWeek || 3);
  const daysPerWeek = Math.min(Math.max(workoutDays, 1), 7);
  const sessionDuration = Number(overrides.sessionDuration || user.workoutPreferences?.sessionDuration || 45);
  const equipment = normalizeEquipment(overrides.equipment || user.workoutPreferences?.equipment || []);
  const selectedDays = normalizePreferredDays(overrides.preferredDays || user.workoutPreferences?.preferredDays || [], daysPerWeek);
  const splitType = overrides.splitType || chooseSplitType({ goal, experienceLevel, daysPerWeek });
  const split = SPLIT_CONFIG[splitType];
  let workoutIndex = 0;

  const weeklySchedule = WEEK_DAYS.map((dayOfWeek) => {
    if (!selectedDays.includes(dayOfWeek)) {
      return buildRestDay(dayOfWeek);
    }

    const template = split.cycle[workoutIndex % split.cycle.length];
    workoutIndex += 1;

    const exerciseItems = selectExercisesForDay({
      exercises,
      focus: template.focus,
      equipment,
      experienceLevel,
      goal,
      sessionDuration,
    });

    const estimatedDurationMinutes = Math.min(sessionDuration, estimateDuration(exerciseItems));

    return {
      dayOfWeek,
      name: template.name,
      focus: template.focus,
      isRest: false,
      estimatedDurationMinutes,
      estimatedCalories: estimateCalories({
        exerciseItems,
        exerciseDocs: exercises,
        durationMinutes: estimatedDurationMinutes,
        userWeight: user.weight,
        goal,
      }),
      exercises: exerciseItems,
    };
  });

  return {
    user: user._id,
    name: `${split.label} - ${formatGoal(goal)}`,
    splitType,
    goal,
    experienceLevel,
    daysPerWeek,
    equipment,
    sessionDuration,
    weeklySchedule,
    status: "active",
    aiMetadata: {
      generationSource: "rule_based",
      personalizationInputs: {
        goal,
        experienceLevel,
        daysPerWeek,
        equipment,
        selectedDays,
        injuries: user.aiContext?.injuries || [],
        limitations: user.aiContext?.limitations || [],
      },
      futureRecommendationNotes: [
        "Replace rule_based generation with AI ranking when model service is connected.",
        "Use completed workout sessions and form-check results as future recommendation signals.",
      ],
    },
  };
};

const formatGoal = (goal) =>
  String(goal || "general_fitness")
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

module.exports = {
  generateWorkoutPlan,
  estimateCalories,
  normalizeEquipment,
};
