import React, { useState } from "react";
import axios from "axios";
import "./login.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";
const Login = () => {
  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5003/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
      history("/home");
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
