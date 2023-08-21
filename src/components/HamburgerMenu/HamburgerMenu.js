import "./HamburgerMenu.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../../images/icon-account.svg";
import close from "../../images/Close.svg";

function HamburgerMenu({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <main className={isOpen ? `hamburger hamburger_opened` : `hamburger`}>
      <section className="hamburger__box">
        <button
          className="hamburger__close-button"
          type="button"
          onClick={onClose}
        >
          <img className="hamburger__close" src={close} alt="закрыть меню" />
        </button>
        <div className="hamburger__main">
          <Link className={location.pathname === "/" ? `hamburger__link hamburger__link_active` : `hamburger__link`} to="/">
            Главная
          </Link>
          <Link className={location.pathname === "/movies" ? `hamburger__link hamburger__link_active` : `hamburger__link`} to="/movies">
            Фильмы
          </Link>
          <Link className={location.pathname === "/saved-movies" ? `hamburger__link hamburger__link_active` : `hamburger__link`} to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </div>
        <button
          className="hamburger__account"
          onClick={() => navigate("/profile")}
        >
          Аккаунт
          <img className="hamburger__icon" src={icon} alt="значек аккаунта" />
        </button>
      </section>
    </main>
  );
}

export default HamburgerMenu;
