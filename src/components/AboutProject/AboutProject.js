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

    </section>
  )
}

export default AboutProject;