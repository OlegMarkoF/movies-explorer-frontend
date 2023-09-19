import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  savedMovies,
  isMoviesLiked,
  onCardDelete,
  onCardSave,
  isPreloaderActive,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moviesCount, setMoviesCount] = useState(0);
  const [moreMoviesCount, setMoreMoviesCount] = useState(0);
  // const [moviesCount, setMoviesCount] = useState(moviesCount);
  const location = useLocation();

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleMoviesButtonClick = () => {
    setMoviesCount(moviesCount + moreMoviesCount);
  };

  const hendleMoviesCounter = () => {
    if (screenWidth >= 1280) {
      setMoviesCount(12);
      setMoviesCount(12);
      setMoreMoviesCount(3);
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      setMoviesCount(8);
      setMoviesCount(8);
      setMoreMoviesCount(2);
    } else if (screenWidth < 768) {
      setMoviesCount(5);
      setMoviesCount(5);
      setMoreMoviesCount(2);
    }
  };

  useEffect(() => {
    hendleMoviesCounter();
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
    handleMoviesButtonClick();
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, []);

  const renderMovies = (moviesCount) => {
    if (movies.length > 0) {
      return movies.slice(0, moviesCount).map((movie) => {
        return (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            onCardDelete={onCardDelete}
            isMoviesLiked={isMoviesLiked}
            savedMovies={savedMovies}
            onCardSave={onCardSave}
          />
        );
      });
    } else {
      return movies.map((movie) => {
        return (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            onCardDelete={onCardDelete}
            savedMovies={savedMovies}
            onCardSave={onCardSave}
          />
        );
      });
    }
  };

  return (
    <section className="movies">
      {location.pathname === "/movies" && movies.length === 0 && <p className="movies__info">Ничего не найдено</p>}
      <ul className="movies__list">
        {isPreloaderActive ? <Preloader /> : renderMovies(moviesCount)}{" "}
      </ul>
      {location.pathname === "/movies" && movies.length > moviesCount ? (
        <button
          className="movies__more"
          type="button"
          onClick={handleMoviesButtonClick}
        >
          Ещё
        </button>
      ) : (
        ""
      )}
    </section>
  );
}

export default MoviesCardList;
