import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();     

    const response = await login({ email, password });

    if (response.status === "success") {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      if(response.user.role === "admin") {
        navigate("/admin/orders");
      } else {  
        navigate("/home"); 
      }
    } else {
      setError(response.message || "Invalid credentials");
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <p>Sign in to your account</p>
          </div>

          <form className="login-form" id="loginForm" onSubmit={handleLogin}>
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email Address</label>
                <span className="focus-border"></span>
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper password-wrapper">
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
                <span className="focus-border"></span>
              </div>
            </div>

            <button type="submit" className="login-btn btn">
              <span className="btn-text">Sign In</span>
            </button>

            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          </form>

          <div className="signup-link">
            <p>
              Don't have an account? <a href="/signup">Sign up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
