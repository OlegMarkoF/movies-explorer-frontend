import "./Register.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";

function Register({ handleRegister }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameClick, setNameClick] = useState(false);
  const [emailClick, setEmailClick] = useState(false);
  const [passwordClick, setPasswordClick] = useState(false);
  const [nameError, setNameError] = useState(" ");
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (emailError || passwordError || nameError) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 40) {
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
    if (e.target.value.length < 2 || e.target.value.length > 30) {
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
      case "name":
        setNameClick(true);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ name, email, password });
  };

  return (
    <section className="register">
      <form onSubmit={handleSubmit} className="register__form" noValidate>
        <Logo />
        <h2 className="register__welcome">Добро пожаловать!</h2>
        <label className="register__label" htmlFor="name">
          Имя
        </label>
        <div className="register__box-input">
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
        <span id="name-error" className={
            nameClick && nameError
              ? "error register__span name-error"
              : "error name-error"
          }>{nameError}</span>
        </div>
        <label className="register__label" htmlFor="email">
          E-mail
        </label>
        <div className="register__box-input">
        <input
          className="register__input register__input_email"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          onBlur={handleClear}
          placeholder=""
          required
        />
        <span id="email-error" className={
            emailClick && emailError
              ? "error register__span email-error"
              : "error email-error"
          }>{emailError}</span>
          </div>
        <label className="register__label" htmlFor="password">
          Пароль
        </label>
        <div className="register__box-input">
        <input
          className="register__input register__input_password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          onBlur={handleClear}
          minLength="2"
          maxLength="16"
          placeholder=""
          required
        />
        <span id="password-error" className={
            passwordClick && passwordError
              ? "error register__span password-error"
              : "error password-error"
          }>{passwordError}</span>
          </div>
        <div className="register__button-container">
          <button
          type="submit"
          onSubmit={handleSubmit}
          className={isFormValid ? "register__link" : "register__link_disabled"}
          disabled={!isFormValid}
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
