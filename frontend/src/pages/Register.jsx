import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    try {
      axios.post(
  "https://digital-health-backend-05jc.onrender.com/api/auth/register",
  formData
);

      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join us to monitor and track your daily health</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
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
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <div className="register-footer">
          <Link to="/" className="login-link">
            Already have an account? <span>Login</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Register;