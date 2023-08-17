import "./NotFound.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="notfound">
      <section className="notfound__box">
        <h2 className="notfound__404">404</h2>
        <p className="notfound__text">Страница не найдена</p>
        <Link className="notfound__link" to="/">
        Назад
      </Link>
      </section>
    </main>
  );
}

export default NotFound;
