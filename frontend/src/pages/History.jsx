import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/history.css";

function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      
      // Using user.id here to ensure it maps accurately matching your log metrics
      const res = await axios.get(`http://localhost:5000/api/history/${user?.id || user?._id}`);
      
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="history-page">
      <div className="history-container">
        
        {/* Navigation Header */}
        <div className="history-header">
          <button onClick={() => navigate("/dashboard")} className="back-to-dash-btn">
            ← Dashboard
          </button>
          <h1 className="history-title">📋 Prediction History</h1>
          <div style={{ width: "115px" }}></div> {/* Keeps title perfectly centered */}
        </div>

        {loading ? (
          <div className="loading-state">
            <h2>Loading records...</h2>
          </div>
        ) : history.length === 0 ? (
          <div className="history-card empty-card">
            <h3>No History Found</h3>
            <p>Start using the Symptom Checker to see your records here.</p>
            <button onClick={() => navigate("/checker")} className="check-now-btn">
              🩺 Check Symptoms Now
            </button>
          </div>
        ) : (
          <>
            {/* Step 3: Professional Upgrade - Statistics Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Predictions</h3>
                <p>{history.length}</p>
              </div>

              <div className="stat-card">
                <h3>Latest Check</h3>
                <p>
                  {history.length > 0 ? history[0].disease : "None"}
                </p>
              </div>
            </div>

            {/* Step 1: Updated History List Map Section */}
            <div className="history-list">
              {history.map((item) => (
                <div key={item._id} className="history-card">

                  <div className="card-header">
                    <h2>🩺 {item.disease}</h2>
                    <span
                      className={
                        item.severity === "High"
                          ? "badge-high"
                          : item.severity === "Medium"
                          ? "badge-medium"
                          : "badge-low"
                      }
                    >
                      {item.severity}
                    </span>
                  </div>

                  <div className="card-body">
                    <p>
                      <strong>Confidence:</strong>{" "}
                      {item.confidence}
                    </p>
                    <p>
                      <strong>Symptoms:</strong>{" "}
                      {item.symptoms?.join(", ")}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="precaution-box">
                    <h4>🛡 Recommended Precautions</h4>
                    <ul>
                      {item.precautions?.map((p, index) => (
                        <li key={index}>{p}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default History;