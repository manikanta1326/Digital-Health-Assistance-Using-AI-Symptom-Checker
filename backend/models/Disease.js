const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
{
    diseaseName: {
        type: String,
        required: true
    },

    symptoms: {
        type: [String],
        required: true
    },

    precautions: {
        type: [String],
        required: true
    },

    severity: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Disease", diseaseSchema);