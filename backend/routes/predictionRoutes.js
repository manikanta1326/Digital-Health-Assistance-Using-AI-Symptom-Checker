const express = require("express");

const router = express.Router();

const Prediction = require("../models/Prediction");
const {
    predictDisease
} = require("../controllers/predictionController");

router.post("/", predictDisease);

module.exports = router;