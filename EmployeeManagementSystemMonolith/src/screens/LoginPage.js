import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Simple login page for Employee Management System
 * Demo logins:
 *   - hr / any password => HR
 *   - manager / any password => Manager
 *   - anything else => Employee
 */
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await auth.login(username, password);
      if (result.success) {
        // Route based on role for later flexibility
        if (username === "hr") navigate("/hr");
        else if (username === "manager") navigate("/manager");
        else navigate("/employee");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Authentication failed");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Username"
            autoFocus
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button type="submit" className="btn" style={{ width: "100%" }}>
          Sign In
        </button>
      </form>
      <div style={{ marginTop: 24, color: "#aaa" }}>
        <div>
          <b>Demo:</b> <br />
          HR Staff: <code>hr</code> / any<br />
          Manager: <code>manager</code> / any<br />
          Employee: anything else / any
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
