import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accessLevel: "user" || "admin",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", userData);
      setMessage("User registered successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Error registering user");
    }
  };

  return (
    <div className="form-container">
      <img
        src="https://www.indt.org.br/assets/img/logo/logo_new.png"
        alt=""
        style={{ padding: "10px" }}
      />
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          type="text"
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          name="lastName"
          type="text"
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <select name="accessLevel" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        <center>
          {" "}
          <Link to="/">Back to Login</Link>
        </center>
      </form>
    </div>
  );
};

export default Register;
