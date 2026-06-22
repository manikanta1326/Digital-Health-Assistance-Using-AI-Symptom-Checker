import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      console.log("Attempting login with:", email);
      
      const res = await axios.post(
        "https://digital-health-backend-05jc.onrender.com/api/auth/login",
        { email, password }
      );

      console.log("RAW LOGIN RESPONSE FROM SERVER:", res.data);

      // Check if the response contains the expected data
      if (!res.data || (!res.data.user && !res.data.token)) {
        throw new Error("Backend response format is missing user or token fields!");
      }

      // Safeguard against nested or flat structures
      const userToSave = res.data.user ? res.data.user : { id: res.data.id, name: res.data.name, email: res.data.email };
      const tokenToSave = res.data.token;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...userToSave,
          token: tokenToSave,
        })
      );
      
      console.log("SUCCESSFULLY SAVED TO LOCALSTORAGE:", localStorage.getItem("user"));
      
      alert("Login Successful");
      navigate("/dashboard");

    } catch (error) {
      console.error("LOGIN CRASHED ERROR:", error);
      alert(
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        
        <div className="login-header">
          <h1>🏥 Health Assistant</h1>
          <p>Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email} // Controlled input component practice
              placeholder="name@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password} // Controlled input component practice
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <Link to="/register" className="register-link">
            New User? <span>Register here</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;