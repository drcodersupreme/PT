const buildFitnessAiContext = ({ user, progress, workoutPlan }) => ({
  user: {
    id: user._id,
    fitnessGoal: user.fitnessGoal,
    experienceLevel: user.experienceLevel,
    workoutPreferences: user.workoutPreferences,
    aiContext: user.aiContext,
  },
  progress: progress
    ? {
        streak: progress.streak,
        recentSessions: progress.workoutSessions.slice(-10),
        bodyWeightTrend: progress.bodyWeightEntries.slice(-10),
        personalRecords: progress.personalRecords,
      }
    : null,
  workoutPlan: workoutPlan
    ? {
        id: workoutPlan._id,
        splitType: workoutPlan.splitType,
        goal: workoutPlan.goal,
        weeklySchedule: workoutPlan.weeklySchedule,
      }
    : null,
});

const getPersonalizedRecommendation = async () => {
  return {
    source: "placeholder",
    message: "AI recommendation service is not connected yet.",
    nextStep: "Connect an LLM or ML service here and pass buildFitnessAiContext output as structured input.",
  };
};

const analyzeExerciseForm = async () => {
  return {
    source: "placeholder",
    message: "Pose/form analysis service is not connected yet.",
    nextStep: "Connect a pose detection pipeline and map keypoints to Exercise.aiMetadata.formCheckPoints.",
  };
};

module.exports = {
  buildFitnessAiContext,
  getPersonalizedRecommendation,
  analyzeExerciseForm,
};
