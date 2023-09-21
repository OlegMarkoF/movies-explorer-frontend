import "./Login.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Login({ handleLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailClick, setEmailClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [emailError, passwordError]);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    const regexForEmail =
      /^((([0-9A-Za-z]{1}[-0-9A-z.]+[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]+[0-9А-Яа-я]{1}))@([-A-Za-z]+\.){1,2}[-A-Za-z]{2,})$/u;
    if (!regexForEmail.test(String(e.target.value).toLowerCase())) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
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
    handleLogin({ email, password });
  };

  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="login__form" noValidate>
        <Logo />
        <p className="login__welcome">Рады видеть!</p>
        <label className="login__label" htmlFor="email">
          E-mail
        </label>
        <div className="register__box-input">
        <input
          className="login__input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          onBlur={handleClear}
          required
          placeholder=""
        />
        <span
          id="email-error"
          className={
            emailClick && emailError
              ? "error login__span email-error"
              : "error email-error"
          }
        >
          {emailError}
        </span>
        </div>
        <label className="login__label" htmlFor="password">
          Пароль
        </label>
        <div className="register__box-input">
        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          minLength="2"
          maxLength="16"
          placeholder=""
          required
          onBlur={handleClear}
        />
        <span
          id="password-error"
          className={
            passwordClick && passwordError
              ? "error login__span password-error"
              : "error password-error"
          }
        >
          {passwordError}
        </span>
        </div>
        <div className="login__button-container">
          <button
            type="submit"
            onSubmit={handleSubmit}
            className={isFormValid ? "login__link" : "login__link_disabled"}
            disabled={!isFormValid}
          >
            Войти
          </button>
        </div>
      </form>
      <div className="login__signin">
        <p className="login__login-text">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__login-link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
