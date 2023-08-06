import "./MoviesCard.css";
import save from "../../images/save.svg";

function MoviesCard() {
    return (
        <li className="card">
            <div className="card__header">
                <div>
                  <h2 className="card__title">33 слова о дизайне</h2>
                  <p className="card__duration">1ч 47м</p>
                </div>
                <button className="card__save" type="button"><img src={save} alt="кнопка сохранения фильма"/></button>
            </div>
            <img className="card__film" alt="стопкадр фильма" src="#"/>
        </li>
    )
}

export default MoviesCard;