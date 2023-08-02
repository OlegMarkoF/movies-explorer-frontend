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
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Статичный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__li">
          <a
            className="portfolio__link"
            href="https://olegmarkof.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Адаптивный сайт</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
        <li className="portfolio__li">
          <a
            className="portfolio__link"
            href="https://github.com/OlegMarkoF/react-mesto-api-full-gha"
            target="_blank"
            rel="noreferrer"
          >
            <p className="portfolio__text">Одностраничное приложение</p>
            <p className="portfolio__arrow">↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
