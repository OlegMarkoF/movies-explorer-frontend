import "./Navigation.css";
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import icon from "../../images/icon-account.svg";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const openHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <Link className="navigation__link navigation__link_active" to="/movies">
            Фильмы
          </Link>
        </li>
        <li>
          <Link className="navigation__link" to="/saved-movies">
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
      <button className="navigation__menu" onClick={() => navigate("/profile")}>
        Аккаунт
        <img className="navigation__icon" src={icon} alt="значек аккаунта" />
      </button>
      {isOpen ? (
        <HamburgerMenu
          isOpen={openHamburger}
          onClose={openHamburger}
        ></HamburgerMenu>
      ) : (
        <button
          className="navigation__burger"
          onClick={openHamburger}
          type="button"
        ></button>
      )}
    </nav>
  );
}

export default Navigation;
