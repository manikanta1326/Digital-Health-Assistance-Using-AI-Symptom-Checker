const express = require("express");
const router = express.Router();

const Prediction = require("../models/Prediction");

router.get("/:userId", async (req, res) => {
  try {
    const history = await Prediction.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;