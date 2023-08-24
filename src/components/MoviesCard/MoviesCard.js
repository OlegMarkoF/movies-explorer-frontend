import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { durationMovie } from "../../utils/utils";

function MoviesCard({ card, isSaved, onCardDelete, onCardSave }) {
  const location = useLocation();
  const API_MOVIES_URL = "https://api.nomoreparties.co";

  function handleSaveCard() {
    onCardSave(card);
  }
  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">{card.nameRU.trim()}</h2>
          <p className="card__duration">{durationMovie(card.duration)}</p>
        </div>
        {location.pathname === "/movies" ? (
          <button
            className={`${isSaved(card) ? "card__save_active" : "card__save"}`}
            type="button"
            onClick={handleSaveCard}
          ></button>
        ) : (
          <button
            className="card__delete"
            type="button"
            onClick={handleDeleteCard}
          ></button>
        )}
      </div>
      <a
        className="card__link"
        href={card.trailerLink}
        target="blank"
        rel="noreferrer"
      >
        <img
          className="card__film"
          alt={`стопкадр фильма ${card.nameRU.trim()}`}
          src={
            location.pathname === "/movies"
              ? `${API_MOVIES_URL}${card.image.url}`
              : `${card.image}`
          }
        />
      </a>
    </li>
  );
}

export default MoviesCard;
