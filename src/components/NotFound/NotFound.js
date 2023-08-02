import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="notfound">
      <h2 className="notfound__404">404</h2>
      <p className="notfound__text">Страница не найдена</p>
      <Link className="notfound__link">Назад</Link>
    </section>
  );
}

export default NotFound;
