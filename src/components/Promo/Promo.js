import "./Promo.css";

import landing from "../../images/landing-logo.svg";
import { useNavigate } from "react-router-dom";

function Promo() {
  const navigate = useNavigate();
  return (
    <section className="promo">
      <img className="promo__earth" src={landing} alt="планета земля" />
      <div className="promo__main">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <p className="promo__text">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="promo__button" type="button" onClick={() => navigate("#about-me")}>
          Узнать больше
        </button>
      </div>
    </section>
  );
}

export default Promo;
