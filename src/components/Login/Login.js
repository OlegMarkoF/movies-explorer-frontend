import "./Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };
  
    return (
      <div className="login">
        <p className="login__welcome">Рады видеть!</p>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__label" htmlFor="email">E-mail</label>
          <input 
            className="login__input"
            id="email" 
            name="email" 
            type="email" 
            value={email} 
            onChange={handleChangeEmail} 
            required
          />
          <span id="email-error" className="popup__field-error"></span>
          <label className="login__label" htmlFor="password">Пароль</label>
          <input 
            className="login__input"
            id="password" 
            name="password" 
            type="password" 
            value={password} 
            onChange={handleChangePassword}
            minLength="2"
            maxLength="40"
            required
          />
          <span id="password-error" className="popup__field-error"></span>
          <div className="login__button-container">
            <button type="submit" onSubmit={handleSubmit} className="login__link">Войти</button>
          </div>
        </form>
        <div className="login__signin">
        <p className="login__login-text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__login-link">
          Регистрация
        </Link>
      </div>
      </div>
    );
  }
  
  export default Login;