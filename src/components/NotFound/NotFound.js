import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="notfound">
      <section className="notfound__box">
        <h2 className="notfound__404">404</h2>
        <p className="notfound__text">Страница не найдена</p>
        <button
          className="notfound__link"
          onClick={() => navigate(-1)}
          type="button"
        >
          Назад
        </button>
      </section>
    </main>
  );
}

export default NotFound;
