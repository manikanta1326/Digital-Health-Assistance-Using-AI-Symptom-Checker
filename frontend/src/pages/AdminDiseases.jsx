import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/adminDiseases.css"; // Ensure this matches your CSS filename exactly

function AdminDiseases() {
  const [diseases, setDiseases] = useState([]);

  // Form Field States
  const [diseaseName, setDiseaseName] = useState("");
  const [severity, setSeverity] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [precautions, setPrecautions] = useState("");

  // Edit State Tracking
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDiseases();
  }, []);

  // Helper function to dynamically retrieve JWT token from localStorage
  const getAuthHeaders = () => {
    const userRecord = JSON.parse(localStorage.getItem("user"));
    return {
      headers: {
        Authorization: `Bearer ${userRecord?.token}`,
      },
    };
  };

  // 1. GET all diseases
  const fetchDiseases = async () => {
    try {
      const headersConfig = getAuthHeaders();
      
      // Safety check: Catch unauthenticated sessions early before making a network call
      if (!headersConfig.headers.Authorization || headersConfig.headers.Authorization === "Bearer undefined") {
        alert("Authentication Error: You are logged in, but your session doesn't have a security token. Please log out and log back in.");
        return;
      }

      const res = await axios.get(
        "https://digital-health-backend-05jc.onrender.com/api/admin/diseases", 
        headersConfig
      );
      
      console.log("RAW BACKEND RESPONSE DATA:", res.data);

      // Extract array layout properly whether wrapped or raw array
      if (Array.isArray(res.data)) {
        setDiseases(res.data);
      } else if (res.data && Array.isArray(res.data.diseases)) {
        setDiseases(res.data.diseases); 
      } else {
        alert("Data structure mismatch! Check browser console.");
        console.error("Backend sent data but it's not an array!", res.data);
      }

    } catch (error) {
      console.error("Error fetching diseases:", error);
      alert(`Backend Request Failed: ${error.response?.status || 'Network Error'} - ${error.response?.data?.message || error.message}`);
    }
  };

  // 2. POST create a new disease profile
  const addDisease = async () => {
    try {
      await axios.post(
        "https://digital-health-backend-05jc.onrender.com/api/admin/diseases",
        {
          diseaseName,
          severity,
          symptoms: symptoms.split(",").map((item) => item.trim()).filter(Boolean),
          precautions: precautions.split(",").map((item) => item.trim()).filter(Boolean),
        },
        getAuthHeaders()
      );

      alert("Disease Added");
      clearForm();
      fetchDiseases();
    } catch (error) {
      console.error("Add disease error:", error);
      alert(error.response?.data?.message || "Failed to add disease");
    }
  };

  // 3. PUT update an existing disease profile
  const updateDisease = async () => {
    try {
      await axios.put(
         `https://digital-health-backend-05jc.onrender.com/api/admin/diseases/${editingId}`,
        {
          diseaseName,
          severity,
          symptoms: symptoms.split(",").map((item) => item.trim()).filter(Boolean),
          precautions: precautions.split(",").map((item) => item.trim()).filter(Boolean),
        },
        getAuthHeaders()
      );

      alert("Disease Updated");
      clearForm();
      fetchDiseases();
    } catch (error) {
      console.error("Update disease error:", error);
      alert(error.response?.data?.message || "Failed to update disease");
    }
  };

  // 4. DELETE an existing disease profile
  const deleteDisease = async (id) => {
    if (!window.confirm("Are you sure you want to delete this disease?")) return;
    try {
      await axios.delete(
        `https://digital-health-backend-05jc.onrender.com/api/admin/diseases/${id}`, 
        getAuthHeaders()
      );
      alert("Disease Deleted");
      if (editingId === id) clearForm();
      fetchDiseases();
    } catch (error) {
      console.error("Delete disease error:", error);
      alert(error.response?.data?.message || "Failed to delete disease");
    }
  };

  // Helper utility to reset input forms back to original state
  const clearForm = () => {
    setEditingId(null);
    setDiseaseName("");
    setSeverity("");
    setSymptoms("");
    setPrecautions("");
  };

  return (
    <div className="admin-diseases-container">
      <h1>Disease Management System</h1>

      <div className="disease-management-layout">
        {/* Left Column: List Display with Edit & Delete Actions */}
        <div className="diseases-list-section">
          <h2>📚 Tracked Diseases Inventory</h2>
          {diseases.length === 0 ? (
            <p className="empty-state">No diseases found in library registry.</p>
          ) : (
            diseases.map((disease) => (
              <div key={disease._id} className="disease-item-row">
                <div className="disease-info">
                  <h3>Disease: {disease.diseaseName}</h3>
                  <p>
                    Severity Status:{" "}
                    <span className={`severity-badge severity-${disease.severity?.toLowerCase()}`}>
                      {disease.severity}
                    </span>
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="submit-btn"
                    style={{ background: "#f59e0b", padding: "8px 16px", marginTop: 0 }}
                    onClick={() => {
                      setEditingId(disease._id);
                      setDiseaseName(disease.diseaseName);
                      setSeverity(disease.severity);
                      setSymptoms(Array.isArray(disease.symptoms) ? disease.symptoms.join(", ") : "");
                      setPrecautions(Array.isArray(disease.precautions) ? disease.precautions.join(", ") : "");
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteDisease(disease._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Dynamic Form Section */}
        <div className="add-disease-form-section">
          <h2>{editingId ? "✏️ Edit Disease Record" : "➕ Add New Disease Records"}</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="Disease Name"
              value={diseaseName}
              onChange={(e) => setDiseaseName(e.target.value)}
            />

            <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input
              type="text"
              placeholder="Symptoms (comma separated)"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />

            <input
              type="text"
              placeholder="Precautions (comma separated)"
              value={precautions}
              onChange={(e) => setPrecautions(e.target.value)}
            />

            {/* Conditional Button Logic Switcher */}
            <button
              className="submit-btn"
              onClick={editingId ? updateDisease : addDisease}
            >
              {editingId ? "Update Disease" : "Add Disease"}
            </button>

            {editingId && (
              <button 
                className="delete-btn" 
                style={{ background: "#64748b", marginTop: "5px" }} 
                onClick={clearForm}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDiseases;