import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <p className="register__welcome">Добро пожаловать!</p>
      <form onSubmit={handleSubmit} className="register__form">
      <label className="register__label" htmlFor="name">Имя</label>
        <input
          className="register__input register__input_name"
          id="name"
          name="name"
          type="name"
          onChange={handleChangeEmail}
          required
        />
        <span id="name-error" className="popup__field-error"></span>
        <label className="register__label" htmlFor="email">E-mail</label>
        <input
          className="register__input register__input_email"
          id="email"
          name="email"
          type="email"
          onChange={handleChangeEmail}
          required
        />
        <span id="email-error" className="popup__field-error"></span>
        <label className="register__label" htmlFor="password">Пароль</label>
        <input
          className="register__input register__input_password"
          id="password"
          name="password"
          type="password"
          onChange={handleChangePassword}
          required
        />
        <span id="password-error" className="popup__field-error"></span>
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
