const express = require("express");
const router = express.Router();
const Disease = require("../models/Disease");

const protectAdmin = require("../middleware/authMiddleware");

// GET ALL
router.get("/", protectAdmin, async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// CREATE
router.post("/", protectAdmin, async (req, res) => {
  try {
    const disease = await Disease.create(req.body);

    res.status(201).json({
      success: true,
      disease,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// UPDATE
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const disease = await Disease.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      disease,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// DELETE
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    await Disease.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Disease Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;