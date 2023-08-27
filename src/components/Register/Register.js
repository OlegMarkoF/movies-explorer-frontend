import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Register.css";

function Register({ handleRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameClick, setNameClick] = useState(false);
  const [emailClick, setEmailClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const [nameError, setNameError] = useState(
    "Необходимо указать имя"
  );
  const [emailError, setEmailError] = useState(
    "Необходимо указать адрес почты"
  );
  const [passwordError, setPasswordError] = useState(
    "Необходимо указать пароль"
  );
  const [isFornValid, setIsFornValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || nameError) {
      setIsFornValid(false);
    } else {
      setIsFornValid(true);
    }
  }, [nameError, emailError, passwordError]);

  const handleChangeName = (e) => {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 16) {
      setNameError("Имя должно быть длинее 2 символов")
      if (!e.target.value) {
        setNameError("Поле имя не должно быть пустым")
      }
    } else {
      setNameError("");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 16) {
      setPasswordError("Пароль должен быть длинее 2 символов")
      if (!e.target.value) {
        setPasswordError("Укажите пароль")
      }
    } else {
      setPasswordError("");
    }
  };
  
  const handleClear = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "email":
        setEmailClick(true);
        break;
      case "password":
        setPasswordClick(true);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ name, email, password });
  };

  return (
    <section className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <Logo />
        <h2 className="register__welcome">Добро пожаловать!</h2>
        <label className="register__label" htmlFor="name">
          Имя
        </label>
        <input
          className="register__input register__input_name"
          id="name"
          name="name"
          type="name"
          value={name}
          onChange={handleChangeName}
          onBlur={handleClear}
          minLength="2"
          maxLength="30"
          required
          placeholder=""
        />
        <span id="name-error" className="register__span"></span>
        <label className="register__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="register__input register__input_email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          required
          onBlur={handleClear}
          placeholder=""
        />
        <span id="email-error" className="register__span"></span>
        <label className="register__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="register__input register__input_password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          required
          onBlur={handleClear}
          minLength="2"
          maxLength="16"
          placeholder=""
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
    </section>
  );
}

export default Register;
