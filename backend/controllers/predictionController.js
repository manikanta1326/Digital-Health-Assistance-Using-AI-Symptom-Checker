const Disease = require("../models/Disease");
const History = require("../models/History");
const Prediction = require("../models/Prediction");
exports.predictDisease = async (req, res) => {

    try {

        const { symptoms } = req.body;

        const diseases = await Disease.find();

        let bestMatch = null;
        let highestScore = 0;

        diseases.forEach((disease) => {

            const matchedSymptoms =
                disease.symptoms.filter(symptom =>
                    symptoms.includes(symptom)
                ).length;

            const score =
                (matchedSymptoms / disease.symptoms.length) * 100;

            if (score > highestScore) {
                highestScore = score;
                bestMatch = disease;
            }
        });

        if (!bestMatch) {
            return res.status(404).json({
                message: "No matching disease found"
            });
        }

        await Prediction.create({
  userId: req.body.userId,
  symptoms,
  disease: bestMatch.diseaseName,
  confidence: `${highestScore.toFixed(0)}%`,
  severity: bestMatch.severity,
  precautions: bestMatch.precautions,
});

res.status(200).json({
  success: true,
  disease: bestMatch.diseaseName,
  confidence: `${highestScore.toFixed(0)}%`,
  severity: bestMatch.severity,
  precautions: bestMatch.precautions,
});
    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};