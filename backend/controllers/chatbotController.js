const { GoogleGenAI } = require("@google/genai");
const Chat = require("../models/Chat");

// Initialize the modern SDK client with your key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.chatbot = async (req, res) => {
  try {
    // Destructure userId along with message from req.body
    const { userId, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required." });
    }

    let attempt = 0;
    const maxRetries = 3;

    while (attempt < maxRetries) {
      try {
        // Query Gemini 2.5 Flash using the new client syntax
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: message,
          config: {
            // Passing instructions in the dedicated configuration field
            systemInstruction: `
              You are an AI Health Assistant.
              Rules:
              - Keep responses under 120 words.
              - Use simple language.
              - Give:
                1. Possible causes
                2. Precautions
                3. When to consult a doctor
              - Never claim a diagnosis with certainty.
              - Use bullet points.
            `,
          },
        });

        const responseText = result.text;

        // Save session history records straight into your MongoDB database
        await Chat.create({
          userId,
          message,
          reply: responseText,
        });

        return res.status(200).json({ reply: responseText });
      } catch (err) {
        const isQuotaError =
          err.message?.includes("429") ||
          err.message?.includes("Too Many Requests") ||
          err.message?.includes("quota");

        if (isQuotaError && attempt < maxRetries - 1) {
          const retryDelay = Math.pow(2, attempt) * 2000; // 2s, 4s, 8s
          console.log(`Quota hit. Retrying in ${retryDelay / 1000}s...`);
          await sleep(retryDelay);
          attempt++;
        } else {
          throw err;
        }
      }
    }
  } catch (error) {
    console.error("Chatbot API Worker Crash:", error);

    const isQuotaError =
      error.message?.includes("429") || 
      error.message?.includes("quota");

    res.status(isQuotaError ? 429 : 500).json({
      message: isQuotaError
        ? "AI service is temporarily unavailable due to rate limits. Please try again later."
        : "AI service error: " + error.message,
    });
  }
};