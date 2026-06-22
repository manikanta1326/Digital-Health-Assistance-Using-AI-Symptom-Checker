import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/chatbot.css";

function Chatbot() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const user = JSON.parse(
  localStorage.getItem("user")
);

const res = await axios.post(
  "https://digital-health-backend-05jc.onrender.com/api/chatbot"
  {
    userId: user.id,
    message,
  }
);

      const botMessage = {
        sender: "bot",
        text: res.data.reply,
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (error) {
      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "AI service unavailable at the moment. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  // Allows user to press "Enter" key on their keyboard to send message
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-container">
        
        {/* Chat Header utilities */}
        <div className="chat-header">
          <button onClick={() => navigate("/dashboard")} className="chat-back-btn">
            ← Dashboard
          </button>
          <h1 className="chat-title">
            🤖 AI Health Chatbot
          </h1>
          <div style={{ width: "115px" }}></div> {/* Equal balancer space */}
        </div>

        {/* Message Window Area */}
        <div className="chat-box">
          {chat.length === 0 ? (
            <div className="chat-welcome-placeholder">
              <h3>Hello there! 👋</h3>
              <p>Ask me anything about your symptoms, health parameters, or preventive care practices.</p>
            </div>
          ) : (
            chat.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "user" ? "user-message" : "bot-message"}
              >
                {msg.text}
              </div>
            ))
          )}

          {loading && (
            <div className="bot-message thinking-state">
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Messaging Inputs Bar */}
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Describe your symptoms or ask a medical question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage} className="chat-send-btn">
            Send
          </button>
        </div>

      </div>
    </div>
  );
}

export default Chatbot;