import "./AboutMe.css";

import avatar from "../../images/avatar.jpg";

function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <article className="about-me__biography">
              <h3 className="about-me__name">Олег</h3>
              <p className="about-me__job">Фронтенд-разработчик, 37 лет</p>
              <p className="about-me__text">
                I was burn on the Earth
              </p>
              <a className="about-me__link" href="https://github.com/OlegMarkoF">GitHub</a>
              <img className="about-me__img" src={avatar} alt="фото студента"/>
            </article>
        </section>
    );
}

export default AboutMe;