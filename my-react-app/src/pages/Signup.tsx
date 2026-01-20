import React, { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signup({ name, email, password });

    if (result.status === "success") {
      setMessage("Signup successful! You can now login.");
        navigate("/home");
    } else {
      setMessage(result.message || "Signup failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Signup</h2>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br/><br/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>

        <button type="submit">Signup</button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "blue" }}>{message}</p>
      )}
    </div>
  );
};

export default Signup;
