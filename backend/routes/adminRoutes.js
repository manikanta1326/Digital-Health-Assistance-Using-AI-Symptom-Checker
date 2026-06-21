const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentPredictions,
  getUsers,
} = require("../controllers/adminController");

// Base stats route
router.get("/stats", getDashboardStats);

// Upgrade 1 Route
router.get("/recent-predictions", getRecentPredictions);

// Upgrade 2 Route
router.get("/users", getUsers);

module.exports = router;