import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__ul">
        <li className="portfolio__li">
          <a
            className="portfolio__link"
            href="https://github.com/OlegMarkoF/how-to-learn"
            target="blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
          </a>
        </li>
        <li className="portfolio__li">
          <a
            className="portfolio__link"
            href="https://olegmarkof.github.io/russian-travel/"
            target="blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
          </a>
        </li>
        <li className="portfolio__li">
          <a
            className="portfolio__link"
            href="https://github.com/OlegMarkoF/react-mesto-api-full-gha"
            target="blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
