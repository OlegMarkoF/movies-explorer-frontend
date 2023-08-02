import "./Navigation.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="navigation">
        <ul className="navigation__links">
            <li>
                <Link>Главная</Link>
            </li>
            <li>
                <Link>Фильмы</Link>
            </li>
            <li>
                <Link>Сохраненные фильмы</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navigation;