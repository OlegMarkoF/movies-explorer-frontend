import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
        <h2 className="project__title">О проекте</h2>
        <div className="project__plan">
            <div className="project__stages">
              <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
              <p className="project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </div>
            <div className="project__stages">
              <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
              <p className="project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
        </div>
        <div className="project__table">
          <h3 className="project__week">1 неделя</h3>
          <h3 className="project__weeks">4 недели</h3>
          <p className="project__speciality">Back-end</p>
          <p className="project__speciality">Front-end</p>
        </div>
    </section>
  )
}

export default AboutProject;