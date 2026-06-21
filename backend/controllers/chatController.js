const Chat = require("../models/Chat");

exports.getChatHistory = async (
  req,
  res
) => {
  try {
    const chats = await Chat.find({
      userId: req.params.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(chats);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};