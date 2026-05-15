const express = require("express");
const {
  createExercise,
  deleteExercise,
  filterExercises,
  getExerciseById,
  getExercises,
  searchExercises,
  updateExercise,
} = require("../controllers/exerciseController");
const { admin, protect } = require("../middleware/authMiddleware");
const { validateExercise, validateObjectId } = require("../middleware/validationMiddleware");

const router = express.Router();

router.get("/", getExercises);
router.get("/search", searchExercises);
router.get("/filter", filterExercises);
router.get("/:id", validateObjectId("id"), getExerciseById);

router.post("/", protect, admin, validateExercise, createExercise);
router.put("/:id", protect, admin, validateObjectId("id"), updateExercise);
router.delete("/:id", protect, admin, validateObjectId("id"), deleteExercise);

module.exports = router;
