import "./HamburgerMenu.css";
import { Link } from "react-router-dom";
import icon from "../../images/icon-account.svg";
import close from "../../images/Close.svg";

function HamburgerMenu() {
  return (
    <section className="hamburger">
      <button className="hamburger__close-button">
        <img className="hamburger__close" src={close} alt="закрыть меню" />
      </button>
      <div className="hamburger__box">
        <div className="hamburger__main">
          <Link className="hamburger__link" to="/">
            Главная
          </Link>
          <Link className="hamburger__link" to="/movies">
            Фильмы
          </Link>
          <Link className="hamburger__link" to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </div>
        <button className="hamburger__account">
          Аккаунт
          <img className="hamburger__icon" src={icon} alt="значек аккаунта" />
        </button>
      </div>
    </section>
  );
}

export default HamburgerMenu;
