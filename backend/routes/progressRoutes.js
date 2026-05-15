const express = require("express");
const {
  getProgressHistory,
  getProgressStats,
  updateProgress,
} = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");
const { validateProgressUpdate } = require("../middleware/validationMiddleware");

const router = express.Router();

router.use(protect);

router.post("/update", validateProgressUpdate, updateProgress);
router.get("/history", getProgressHistory);
router.get("/stats", getProgressStats);

module.exports = router;
