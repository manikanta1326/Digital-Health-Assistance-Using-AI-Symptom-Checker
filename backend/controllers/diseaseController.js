const Disease = require("../models/Disease");

// Create Disease
exports.createDisease = async (req, res) => {
    try {

        const disease = await Disease.create(req.body);

        res.status(201).json({
            success: true,
            disease
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Diseases
exports.getDiseases = async (req, res) => {

    try {

        const diseases = await Disease.find();

        res.status(200).json({
            success: true,
            diseases
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};