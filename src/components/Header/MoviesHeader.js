import "./MoviesHeader.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function MoviesHeader() {
    return (
        <header className="movies-header">
            <Link to="/movies" >
                <img className="header__logo" src={logo} alt="смайлик" />
            </Link>
            <Navigation/>
        </header>
    )
}

export default MoviesHeader;