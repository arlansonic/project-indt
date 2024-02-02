import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        loginData
      );
      const token = response.data.token;
      const accessLevel = response.data.accessLevel;

      localStorage.setItem("token", token);
      localStorage.setItem("accessLevel", accessLevel);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setMessage("Login bem-sucedido!");
      navigate("/user-management");
      setIsLoggedIn(true);
    } catch (error) {
      setMessage("Falha no login. Verifique suas credenciais.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setIsLoggedIn(false);
    navigate("/");
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
        <button type="submit">Login</button>
        <p>
          Não tem uma conta? <Link to="/register">Registre-se aqui</Link>
        </p>
      </form>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
};

export default Login;
