import React, { useState } from "react";
import axios from "axios";
import "./Sign.css";

const Sign = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    // if (password !== confirmPassword) {
    //   console.error("Passwords do not match");
    //   return;
    // }
    try {
      const response = await axios.post("http://localhost:5001/sign", {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        password,
      });
      console.log("User registered:", response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  return (
    <div className="sign-form">
      <h1>User Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /> */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Sign;
