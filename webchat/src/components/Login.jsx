import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { getUserOffline } from "../hooks/useIndexedDB";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true); // Start loading state

    try {
      // Get the user from IndexedDB using the email
      const user = await getUserOffline(email);

      if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
      }

      // Save the logged-in user to the global state
      dispatch({ type: "SET_USER", payload: user });
      navigate("/chat"); // Redirect to the chat page
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <p>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default Login;
