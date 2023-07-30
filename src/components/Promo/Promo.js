import "./Promo.css";

import landing from "../../images/landing-logo.svg";

function Promo({ aboutRef }) {
    return (
        <section className="promo">
            <div className="promo__main">
                <h1 className="promo__title">
                  Учебный проект студента факультета Веб-разработки.
                </h1>
                <p className="promo__text">
                  Листайте ниже, чтобы узнать больше про этот проект и его создателя.
                </p>
            </div>

        </section>
    )
}