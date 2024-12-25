import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../instantDb"; // Ensure db is properly initialized
import { saveUserOffline } from "../hooks/useIndexedDB";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async () => {
    const { name, email, number, password } = formData;

    if (!name || !email || !number || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      // Check if db.users is properly initialized
      // if (!db.users) {
      //   throw new Error("InstantDB users collection is not initialized.");
      // }

      // Create the new user object
      const newUser = {
        id: crypto.randomUUID(),
        name,
        email,
        number,
        password,
      };

      // Add the user to InstantDB using the correct method for adding data
      //await db.users.add(newUser); // Ensure that db.users exists and is initialized properly

      // Save user to IndexedDB for offline storage
      await saveUserOffline(newUser);

      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>Signup</h2>
      <input
        name="name"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        name="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        name="number"
        placeholder="Phone Number"
        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
      />
      <input
        name="password"
        placeholder="Password"
        type="password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
