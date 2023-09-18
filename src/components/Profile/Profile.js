import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect, useState } from "react";
// import useFormValidation from "../../hooks/useFormValidation";

function Profile({ handleChangeProfile, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [nameClick, setNameClick] = useState(false);
  const [emailClick, setEmailClick] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  // const { values, errors, isValid, handleChange, setValues, setValid } = useFormValidation({
  //   name: currentUser.name,
  //   email: currentUser.email,
  // });

  useEffect(() => {
    if (emailError || nameError) {
      setIsFormValid(false);
    } else if (email === currentUser.email && name === currentUser.name) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [
    nameError,
    emailError,
    currentUser.name,
    currentUser.email,
    nameClick,
    emailClick,
    name,
    email,
  ]);

  useEffect(() => {
    currentUser.name !== undefined && setName(currentUser.name);
    currentUser.email !== undefined && setEmail(currentUser.email);
  }, [currentUser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 16) {
      setNameError("Имя должно быть длиннее двух символов");
      if (!e.target.value) {
        setNameError("Поле не должно быть пустым");
      }
    } else {
      setEmailError("");
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChangeProfile({ name, email });
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
        <form className="profile__form" name="profile" onSubmit={handleSubmit} noValidate>
          <h2 className="profile__title">Привет, {name}!</h2>
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
          <input
            className="profile__input"
            id="email"
            name="email"
            type="email"
            onChange={handleChangeEmail}
            onBlur={handleClear}
            value={email}
            minLength="2"
            maxLength="16"
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
          <button
            onSubmit={handleSubmit}
            type="submit"
            disabled={isFormValid}
            className={
              (isFormValid) ? "profile__button_disabled" : "profile__button"
            }
            // className="profile__button"
          >
            Редактировать
          </button>
          <Link className="profile__link" to="/signin" onClick={handleLogout}>
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  );
}

export default Profile;