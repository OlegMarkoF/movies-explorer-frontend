import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__page-title">7 технологий</h3>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className="techs__list">
        <li className="techs__list-li">
            <p className="techs__list-li-p">HTML</p>
        </li>
        <li className="techs__list-li">
            <p className="techs__list-li-p">CSS</p>
        </li>
        <li className="techs__list-li">
            <p className="techs__list-li-p">JS</p>
        </li>
        <li className="techs__list-li">
            <p className="techs__list-li-p">React</p>
        </li>
        <li className="techs__list-li">
            <p className="techs__list-li-p">Git</p>
        </li>
        <li className="techs__list-li">
            <p className="techs__list-li-p">Express.js</p>
        </li>
        <li className="techs__list-li">
            <p className="techs__list-li-p">mongoDB</p>
        </li>
      </ul>
    </section>
  );
}

export default Techs;