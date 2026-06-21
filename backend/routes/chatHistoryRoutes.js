const express = require("express");

const router = express.Router();

const {
  getChatHistory,
} = require(
  "../controllers/chatController"
);

router.get("/:userId", getChatHistory);

module.exports = router;