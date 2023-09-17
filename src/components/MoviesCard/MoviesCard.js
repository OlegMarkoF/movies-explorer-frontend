import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { durationMovie } from "../../utils/utils";
import { useEffect, useState } from "react";

function MoviesCard({ movie, onCardDelete, isMoviesLiked, savedMovies, onCardSave }) {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();
  const API_MOVIES_URL = "https://api.nomoreparties.co";

  useEffect(() => {
    savedMovies?.map((i) => {
      if (movie._id === i._id) {
        setIsSaved(true);
      }
    })
  }, [savedMovies]);

  function handleSave() {
    onCardSave(movie);
    setIsSaved(true);
  }
  function handleDelete() {
    onCardDelete(movie);
    setIsSaved(false);
  }

  return (
    <li className="card">
      <div className="card__header">
        <div>
          <h2 className="card__title">{movie.nameRU}</h2>
          <p className="card__duration">{durationMovie(movie.duration)}</p>
        </div>
        {location.pathname === "/movies" ? (
          <button
            className={`${(isMoviesLiked) ? "card__save" : "card__save_active"}`}
            type="button"
            onClick={handleSave}
          ></button>
        ) : (
          <button
            className="card__delete"
            type="button"
            onClick={handleDelete}
          ></button>
        )}
      </div>
      <a
        className="card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="card__film"
          alt={`стопкадр фильма ${movie.nameRU}`}
          src={
            location.pathname === "/movies"
              ? `${API_MOVIES_URL}${movie.image.url}`
              : `${movie.image}`
          }
        />
      </a>
    </li>
  );
}

export default MoviesCard;