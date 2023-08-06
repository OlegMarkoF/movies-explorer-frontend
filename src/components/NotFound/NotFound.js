import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="notfound">
      <div className="notfound__box">
        <h2 className="notfound__404">404</h2>
        <p className="notfound__text">Страница не найдена</p>
      </div>
      <Link className="notfound__link" to="/">
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
