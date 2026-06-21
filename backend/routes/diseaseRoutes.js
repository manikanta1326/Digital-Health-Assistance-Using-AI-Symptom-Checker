const express = require("express");

const router = express.Router();

const {
    createDisease,
    getDiseases
} = require("../controllers/diseaseController");

router.post("/", createDisease);

router.get("/", getDiseases);

module.exports = router;