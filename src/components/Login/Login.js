import "./Login.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../../hooks/useFormValidation";
import Logo from "../Logo/Logo";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailClick, setEmailClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();
  const [emailError, setEmailError] = useState(
    "Необходимо указать адрес почты"
  );
  const [passwordError, setPasswordError] = useState(
    "Необходимо указать пароль"
  );
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
    setEmailError("");
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

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({email, password});
  };

  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="login__form" noValidate>
        <Logo />
        <p className="login__welcome">Рады видеть!</p>
        <label className="login__label" htmlFor="email">
          E-mail
        </label>
        <input
          className="login__input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          required
          placeholder=""
          onBlur={handleClear}
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
        <label className="login__label" htmlFor="password">
          Пароль
        </label>
        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          minLength="2"
          maxLength="40"
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
