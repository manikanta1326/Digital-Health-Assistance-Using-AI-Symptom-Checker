require('dotenv').config(); // This loads the variables from your .env file

// Now you can access it anywhere using:
const apiKey = process.env.GEMINI_API_KEY;

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// 1. Connect to MongoDB Atlas
connectDB();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Connect API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/diseases", require("./routes/diseaseRoutes"));
app.use("/api/test", require("./routes/testRoute"));

// 4. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});

app.use(
  "/api/predict",
  require("./routes/predictionRoutes")
);

app.use(
  "/api/history",
  require("./routes/historyRoutes")
);

app.use(
  "/api/chatbot",
  require("./routes/chatbotRoutes")
);
app.use(
  "/api/chat-history",
  require("./routes/chatHistoryRoutes")
);
app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/admin/diseases",
  require("./routes/adminDiseaseRoutes")
);