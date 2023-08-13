import "./MoviesCard.css";
import film from "../../images/film.jpg";

function MoviesCard({isMovies, onDelete, onSave}) {

  function handleSave () {
    onSave();
  }
  function handleDelete () {
    onDelete();
  }

  return (
    <li className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">33 слова о дизайне</h2>
          <p className="card__duration">1ч 47м</p>
        </div>
        <button className={isMovies ? `card__save` : `card__delete` } type="button" onClick={isMovies ? handleSave : handleDelete}></button>
      </div>
      <img className="card__film" alt="стопкадр фильма" src={film} />
    </li>
  );
}

export default MoviesCard;
