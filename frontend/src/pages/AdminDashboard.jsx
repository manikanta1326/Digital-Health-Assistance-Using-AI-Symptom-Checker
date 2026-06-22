import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 1. Added Hook Import
import "../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate(); // 2. Initialized navigation instance
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPredictions: 0,
    totalDiseases: 0,
    totalChats: 0,
  });
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllAdminData();
  }, []);

  const fetchAllAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, predictionsRes, usersRes] = await Promise.all([
        axios.get("https://digital-health-backend-05jc.onrender.com/api/admin/stats"),
        axios.get("https://digital-health-backend-05jc.onrender.com/api/admin/recent-predictions"),
        axios.get("https://digital-health-backend-05jc.onrender.com/api/admin/users"),
      ]);

      setStats(statsRes.data);
      setRecentPredictions(predictionsRes.data);
      setUsers(usersRes.data);
    } catch (error) {
      console.error("Error fetching admin metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page loading-container">
        <h2>🔄 Loading secure admin metrics...</h2>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <h1>⚙️ Admin Dashboard</h1>

      {/* 3. Styled Action Bar Container wrapped around the redirect control */}
      <div 
        className="admin-action-bar" 
        style={{ maxWidth: "1200px", margin: "0 auto 25px auto", display: "flex", justifyContent: "flex-end" }}
      >
        <button 
          onClick={() => navigate("/admin/diseases")} // Corrected path parameter mapping matching App.jsx
          className="back-to-dash-btn"
          style={{ background: "#16a34a", fontWeight: "600" }}
        >
          🦠 Manage Diseases →
        </button>
      </div>

      {/* Grid containing 4 stats cards (Including Upgrade 3: Chats) */}
      <div className="stats-grid grid-4-cols">
        <div className="admin-card">
          <h3>👥 Users</h3>
          <p>{stats.totalUsers ?? 0}</p>
        </div>

        <div className="admin-card">
          <h3>🩺 Predictions</h3>
          <p>{stats.totalPredictions ?? 0}</p>
        </div>

        <div className="admin-card">
          <h3>📚 Diseases</h3>
          <p>{stats.totalDiseases ?? 0}</p>
        </div>

        <div className="admin-card">
          <h3>🤖 Total Chats</h3>
          <p>{stats.totalChats ?? 0}</p>
        </div>
      </div>

      <div className="admin-content-layout">
        {/* Upgrade 1 View: Recent Predictions */}
        <div className="table-section">
          <h2>⏱️ Recent Diagnostic Activity (Last 10)</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Disease</th>
                  <th>Severity</th>
                  <th>Confidence</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.length === 0 ? (
                  <tr><td colSpan="4" className="empty-row">No recent records.</td></tr>
                ) : (
                  recentPredictions.map((pred) => (
                    <tr key={pred._id}>
                      <td className="bold-text">🩺 {pred.disease}</td>
                      <td>
                        <span className={`admin-badge badge-${pred.severity?.toLowerCase()}`}>
                          {pred.severity}
                        </span>
                      </td>
                      <td>{pred.confidence}</td>
                      <td>{new Date(pred.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upgrade 2 View: User Profiles List */}
        <div className="table-section">
          <h2>👤 Registered User Base</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="3" className="empty-row">No users registered.</td></tr>
                ) : (
                  users.map((u) => (
                    <tr key={u._id}>
                      <td className="bold-text">{u.name}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-tag tag-${u.role || 'user'}`}>
                          {u.role || "user"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;