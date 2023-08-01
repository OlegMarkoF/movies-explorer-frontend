import "./MoviesHeader.css";
import logo from "../../images/logo.svg";
import icon from "../../images/icon-account.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import AccountLink from "../AccountLink/AccountLink";

function MoviesHeader() {
    return (
        <header className="movies-header">
            <Link to="/movies" >
                <img className="header__logo" src={logo} alt="смайлик" />
            </Link>
            <Navigation/>
            <AccountLink>
                <img className="movies-header__logo" src={icon} alt="значёк аккаунта" />
            </AccountLink>
        </header>
    )
}

export default MoviesHeader;