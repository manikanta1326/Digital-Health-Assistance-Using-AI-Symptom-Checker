const User = require("../models/User");
const Prediction = require("../models/Prediction");
const Disease = require("../models/Disease");

// Optional import for Chat Model if you implement it later
let Chat;
try {
  Chat = require("../models/Chat");
} catch (e) {
  // Chat model doesn't exist yet, which is fine!
}

// Get aggregate dashboard counting statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPredictions = await Prediction.countDocuments();
    const totalDiseases = await Disease.countDocuments();

    // Upgrade 3: Safely calculate total chats if model exists
    let totalChats = 0;
    if (Chat && typeof Chat.countDocuments === "function") {
      totalChats = await Chat.countDocuments();
    }

    res.status(200).json({
      totalUsers,
      totalPredictions,
      totalDiseases,
      totalChats, // Sent dynamically
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Upgrade 1: Fetch the 10 most recent diagnostic predictions
exports.getRecentPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(predictions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Upgrade 2: Fetch all registered users excluding sensitive password fields
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};