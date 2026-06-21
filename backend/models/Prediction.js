const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    symptoms: [String],

    disease: String,

    severity: String,

    confidence: String,

    precautions: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Prediction",
  predictionSchema
);