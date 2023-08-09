import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register({ handleRegister }) {
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
    handleRegister(email, password);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
      <img className="register__logo" src={logo} alt="лого"/>
      <h2 className="register__welcome">Добро пожаловать!</h2>
      <label className="register__label" htmlFor="name">Имя</label>
        <input
          className="register__input register__input_name"
          id="name"
          name="name"
          type="name"
          onChange={handleChangeEmail}
          required
        />
        <span id="name-error" className="register__span"></span>
        <label className="register__label" htmlFor="email">E-mail</label>
        <input
          className="register__input register__input_email"
          id="email"
          name="email"
          type="email"
          onChange={handleChangeEmail}
          required
        />
        <span id="email-error" className="register__span"></span>
        <label className="register__label" htmlFor="password">Пароль</label>
        <input
          className="register__input register__input_password"
          id="password"
          name="password"
          type="password"
          onChange={handleChangePassword}
          required
        />
        <span id="password-error" className="register__span"></span>
        <div className="register__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className="register__link"
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p className="register__login-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
