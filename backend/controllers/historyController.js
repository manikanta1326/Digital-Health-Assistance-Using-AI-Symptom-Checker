const History = require("../models/History");

exports.getHistory = async (req, res) => {
  try {

    const history = await History.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.status(200).json(history);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};