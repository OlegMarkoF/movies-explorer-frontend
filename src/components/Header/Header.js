import "./Header.css";
import React from "react";
import Logo from "../Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const headerMovies = () => {
    if (!loggedIn && location.pathname === "/") {
      return (
        <header className="header__menu">
          <Logo />
          <div className="header__links">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <button
              className="header__signin"
              onClick={() => navigate("/signin")}
            >
              Войти
            </button>
          </div>
        </header>
      );
    } else {
      return (
        <header className="header__menu">
          <Logo />
          <Navigation />
        </header>
      );
    }
  };

  return <header className="header">{headerMovies()}</header>;
}

export default Header;
