import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

function Profile() {
  return (
    <>
      <Header />
      <section className="profile">
        <form className="profile__form">
          <h2 className="profile__title">Привет, Олег</h2>
            <input
              className="profile__input profile__input_name"
              id="name"
              name="name"
              type="name"
              required
              placeholder="Имя"
            />
            <span id="name-error" className="profile__name-error"></span>
          <input
            className="profile__input"
            id="email"
            name="email"
            type="email"
            minLength="2"
            maxLength="40"
            required
            placeholder="E-mail"
          />
          <span id="email-error" className="profile__email-error"></span>
          <button className="profile__button" type="submit">
            Редактировать
          </button>
          <Link className="profile__link" to="/signin">
            Выйти из аккаунта
          </Link>
        </form>
      </section>
    </>
  );
}

export default Profile;
