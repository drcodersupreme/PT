const express = require("express");
const {
  completeWorkout,
  generatePlan,
  getMyPlan,
  getWorkoutHistory,
  startWorkout,
} = require("../controllers/workoutController");
const { protect } = require("../middleware/authMiddleware");
const { validateWorkoutGeneration } = require("../middleware/validationMiddleware");

const router = express.Router();

router.use(protect);

router.post("/generate", validateWorkoutGeneration, generatePlan);
router.get("/my-plan", getMyPlan);
router.get("/history", getWorkoutHistory);
router.post("/start", startWorkout);
router.post("/complete", completeWorkout);

module.exports = router;
