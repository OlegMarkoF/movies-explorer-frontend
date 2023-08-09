import "./HamburgerMenu.css";
import { Link, useNavigate } from "react-router-dom";
import icon from "../../images/icon-account.svg";
import close from "../../images/Close.svg";

function HamburgerMenu({isOpen, onClose}) {
  const navigate = useNavigate();
  return (
    <section className={isOpen ? `hamburger hamburger_opened` : `hamburger`}>
      
      <div className="hamburger__box">
      <button className="hamburger__close-button" type="button" onClick={onClose}>
        <img className="hamburger__close" src={close} alt="закрыть меню" />
      </button>
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
        <button className="hamburger__account" onClick={() => navigate("/profile")}>
          Аккаунт
          <img className="hamburger__icon" src={icon} alt="значек аккаунта" />
        </button>
      </div>
    </section>
  );
}

export default HamburgerMenu;
