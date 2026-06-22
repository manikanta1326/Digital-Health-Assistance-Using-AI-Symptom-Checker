import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/symptomChecker.css";
import generatePDF from "../utils/generatePDF";

function SymptomChecker() {
  const navigate = useNavigate();

  const symptomList = [
    "fever",
    "cough",
    "headache",
    "fatigue",
    "body pain",
    "chills",
    "sweating",
    "sore throat",
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckbox = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(
        selectedSymptoms.filter((s) => s !== symptom)
      );
    } else {
      setSelectedSymptoms([
        ...selectedSymptoms,
        symptom,
      ]);
    }
  };

  const checkSymptoms = async () => {
    if (selectedSymptoms.length === 0) {
      alert("Please select at least one symptom");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.post(
        "https://digital-health-backend-05jc.onrender.com/api/predict",
        {
          userId: user.id,
          symptoms: selectedSymptoms,
        }
      );

      setResult(res.data);
    } catch (error) {
      console.log(error);
      alert("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="symptom-page">
      <div className="container-max">

        {/* Header Navigation */}
        <div className="top-bar">
          <button
            onClick={() => navigate("/dashboard")}
            className="back-btn"
          >
            ← Dashboard
          </button>

          <button
            onClick={() => navigate("/history")}
            className="history-btn"
          >
            📋 History
          </button>
        </div>

        {/* Hero Title */}
        <div className="heading">
          <h1>🏥 AI Symptom Checker</h1>
          <p>
            Select your symptoms and receive an instant AI-powered health assessment
          </p>
        </div>

        {/* Symptom Selection Card */}
        <div className="symptom-card">
          <h2>Select Symptoms</h2>

          <div className="symptom-grid">
            {symptomList.map((symptom) => (
              <label
                key={symptom}
                className={`symptom-item ${
                  selectedSymptoms.includes(symptom) ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleCheckbox(symptom)}
                />
                <span>{symptom}</span>
              </label>
            ))}
          </div>

          <div className="center-btn-wrapper">
            <button
              onClick={checkSymptoms}
              disabled={loading}
              className="check-btn"
            >
              {loading ? "🔍 Analyzing..." : "🩺 Check Symptoms"}
            </button>
          </div>
        </div>

        {/* Dynamic Prediction Result Card */}
        {result && (
          <div className="result-card">
            <h2>✅ Prediction Result</h2>

            <div className="metrics-grid">
              <div className="metric-box box-blue">
                <h4>Disease</h4>
                <p>{result.disease}</p>
              </div>

              <div className="metric-box box-yellow">
                <h4>Confidence</h4>
                <p>{result.confidence}</p>
              </div>

              <div className="metric-box box-red">
                <h4>Severity</h4>
                <span
                  className={`severity-badge ${
                    result.severity === "High"
                      ? "severity-high"
                      : result.severity === "Medium"
                      ? "severity-medium"
                      : "severity-low"
                  }`}
                >
                  {result.severity}
                </span>
              </div>
              
            </div>

            <div className="precautions-box">
              <h3>🛡 Recommended Precautions</h3>
              <ul>
                {result.precautions.map((item) => (
                  <li key={item}>
                    ✅ {item}
                  </li>
                ))}
              </ul>
            </div><button  onClick={() => generatePDF(result)  }  className="download-btn">  📄 Download Report</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default SymptomChecker;