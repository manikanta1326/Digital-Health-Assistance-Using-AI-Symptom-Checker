const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  symptoms: [String],

  disease: String,

  confidence: String
},
{
  timestamps: true
});

module.exports = mongoose.model("History", historySchema);