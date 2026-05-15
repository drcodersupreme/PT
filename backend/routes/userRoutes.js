const express = require("express");
const {
  getCurrentUser,
  getFavoriteExercises,
  toggleFavoriteExercise,
  updateCurrentUser,
  updateWorkoutPreferences,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { validateObjectId, validateUserUpdate } = require("../middleware/validationMiddleware");

const router = express.Router();

router.use(protect);

router.get("/me", getCurrentUser);
router.put("/me", validateUserUpdate, updateCurrentUser);
router.put("/preferences", updateWorkoutPreferences);
router.get("/favorites", getFavoriteExercises);
router.post("/favorites/:exerciseId", validateObjectId("exerciseId"), toggleFavoriteExercise);

module.exports = router;
