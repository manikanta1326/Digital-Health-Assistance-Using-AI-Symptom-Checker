import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">
          Digital Health Assistant
        </h1>

        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="main-content">

        {/* Welcome Card */}
        <div className="welcome-card">
          <h2>Welcome, {user?.name} 👋</h2>
          <p className="welcome-subtitle">
            Your AI-powered health assistant is ready.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="cards-grid">

          {/* AI Symptom Checker */}
          <div className="card">
            <h3>AI Symptom Checker</h3>
            <p>Select symptoms and get disease predictions.</p>
            <button
              onClick={() => navigate("/checker")}
              className="btn blue-btn"
            >
              Check Symptoms
            </button>
          </div>

          {/* Prediction History */}
          <div className="card">
            <h3>Prediction History</h3>
            <p>View all your previous health checks.</p>
            <button
              onClick={() => navigate("/history")}
              className="btn green-btn"
            >
              View History
            </button>
          </div>

          {/* AI Health Chat */}
          <div className="card">
            <h3>🤖 AI Health Chat</h3>
            <p>Ask health questions and get AI guidance.</p>
            <button
              onClick={() => navigate("/chatbot")} // Added standard navigation routing path
              className="btn purple-btn"
            >
              Open Chat
            </button>
          </div>
          <div className="feature-card">
  <h3>👤 Profile</h3>

  <p>
    View and manage your profile.
  </p>

  <button
    onClick={() => navigate("/profile")}
  >
    Open Profile
  </button>
</div>

        </div>
        

        {/* Daily Health Tips */}
        <div className="tips-section">
          <h3>💡 Daily Health Tips</h3>

          <div className="tips-grid">
            <div className="tip-box tip-water">
              💧 Drink 2–3 liters of water daily
            </div>

            <div className="tip-box tip-sleep">
              😴 Sleep at least 7–8 hours
            </div>

            <div className="tip-box tip-exercise">
              🏃 Exercise 30 minutes every day
            </div>

            <div className="tip-box tip-diet">
              🍎 Eat fruits and vegetables
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;