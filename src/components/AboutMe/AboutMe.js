import "./AboutMe.css";

import avatar from "../../images/avatar.jpg";

function AboutMe() {
    return (
        <section className="about-me"  id="about-me">
          <h2 className="about-me__title">Студент</h2>
          <div className="about-me__box">
            <img className="about-me__img" src={avatar} alt="фото студента"/>
            <article className="about-me__biography">
              <h3 className="about-me__name">Олег</h3>
              <p className="about-me__job">Фронтенд-разработчик, 37 лет</p>
              <p className="about-me__text">
                Я родился теплым летним днем в провинциальном городке в Самарской области.
                После окончания СамГТУ, на протяжении 12 лет, занимался офисной работой.
                В 2019 году ушел в "свободное плавание" и занялся фрилансом, 
                одним из направлений которого стала Веб-разработка.
              </p>
              <a className="about-me__link" href="https://github.com/OlegMarkoF" target="blank">Github</a>
            </article>
          </div>
        </section>
    );
}

export default AboutMe;