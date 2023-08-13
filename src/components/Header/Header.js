import "./Header.css";
import React from "react";
import Logo from "../Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const headerMovies = () => {
    if (location.pathname === "/") {
      return (
        <div className="header__menu">
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
        </div>
      );
    } else {
      return (
        <div className="header__menu">
          <Logo />
          <Navigation />
        </div>
      );
    }
  };

  return <header className="header">{headerMovies()}</header>;
}

export default Header;
