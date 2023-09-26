import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";

function Profile({ handleChangeProfile, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [nameClick, setNameClick] = useState(false);
  const [emailClick, setEmailClick] = useState(false);
  const [nameError, setNameError] = useState(" ");
  const [emailError, setEmailError] = useState(" ");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isShowButton, setIsShowButton] = useState(false);
  
  useEffect(() => {
    currentUser.name !== undefined && setName(currentUser.name);
    currentUser.email !== undefined && setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    if (name === currentUser.name && email === currentUser.email ) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [
    currentUser.name,
    currentUser.email,
    name,
    email,
  ]);

  useEffect(() => {
    if (emailError || nameError) {
      setIsFormValid(false);
    }
  }, [
    nameError,
    emailError
  ]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 40) {
      setNameError("Имя должно быть длиннее 2 символов");
      if (!e.target.value) {
        setNameError("Поле имя не должно быть пустым");
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

  // const handleButtonClick = () => {
  //   setIsShowButton(true);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeProfile({ name, email });
    if (nameError || emailError) {
      setIsShowButton(true);
    } else {
      setIsShowButton(false);
    }
  };

  const handleClear = (e) => {
    // eslint-disable-next-line default-case
    switch (e.target.name) {
      case "email":
        setEmailClick(true);
        break;
      case "name":
        setNameClick(true);
        break;
    }
  };

  return (
    <>
      <Header />
      <section className="profile">
        <form
          className="profile__form"
          name="profile"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="profile__title">Привет, {name}!</h2>
	  <div className="register__box-input">
          <input
            className="profile__input profile__input_name"
            id="name"
            name="name"
            type="name"
            value={name}
            onChange={handleChangeName}
            onBlur={handleClear}
            minLength="2"
            maxLength="30"
            required
            placeholder="Имя"
          />
          <span
            id="name-error"
            className={
              nameClick && nameError
                ? "error error_active profile__name-error"
                : "error profile__name-error"
            }
          >
            {nameError}
          </span>
	  </div>
	  <div className="register__box-input">
          <input
            className="profile__input"
            id="email"
            name="email"
            type="email"
            onChange={handleChangeEmail}
            onBlur={handleClear}
            value={email}
            minLength="2"
            maxLength="30"
            required
            placeholder="E-mail"
          />
          <span
            id="email-error"
            className={
              emailClick && emailError
                ? "error error_active profile__email-error"
                : "error profile__email-error"
            }
          >
            {emailError}
          </span>
	  </div>
          {isFormValid && !isShowButton ? (
            <button
              type="submit"
	            onSubmit={handleSubmit}
              // onClick={handleButtonClick}
              className="profile__button"
	            disabled={!isFormValid}
            >
              Сохранить
            </button>
          ) : (
            <>
              <button
                onSubmit={handleSubmit}
                type="submit"
                disabled={!isFormValid}
                className={
                  isFormValid ? "profile__button" : "profile__button_disabled"
                }
              >
                Редактировать
              </button>
              <Link
                className="profile__link"
                to="/"
                onClick={handleLogout}
              >
                Выйти из аккаунта
              </Link>
            </>
          )}
        </form>
      </section>
    </>
  );
}

export default Profile;
