import "./Navigation.css";
import { useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import icon from "../../images/icon-account.svg";
import { Link } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const openHamburger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li>
          <Link className="navigation__film" to="/movies">
            Фильмы
          </Link>
        </li>
        <li>
          <Link className="navigation__save" to="/saved-movies">
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
      <button className="navigation__menu">
        Аккаунт
        <img className="navigation__icon" src={icon} alt="значек аккаунта" />
      </button>
      <HamburgerMenu
        isOpen={openHamburger}
        onClose={openHamburger}
      ></HamburgerMenu>
    </nav>
  );
}

export default Navigation;
