import "./Promo.css";

import landing from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__main">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.
        </h1>
        <p className="promo__text">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="promo__button" type="button">
          Узнать больше
        </button>
      </div>
      <img className="promo__earth" src={landing} alt="планета земля" />
    </section>
  );
}

export default Promo;
