import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if user is logged in AND has an admin role
  if (!user || user.role !== "admin") {
    // Redirect malicious or regular profiles back to the normal dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;