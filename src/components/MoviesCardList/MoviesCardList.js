import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
// import { getSavedStatus } from "../../utils/utils";

function MoviesCardList({
  movies,
  savedMovies,
  isMoviesLiked,
  onCardDelete,
  onCardSave,
  moviesFound,
  isPreloaderActive,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moviesCount, setMoviesCount] = useState(12);
  const [moreMoviesCount, setMoreMoviesCount] = useState(0);
  const [showMovies, setShowMovies] = useState(moviesCount);
  const location = useLocation();

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleMoviesButtonClick = () => {
    setShowMovies(showMovies + moreMoviesCount);
  };

  const hendleMoviesCounter = () => {
    if (screenWidth >= 1280) {
      setMoviesCount(12);
      setShowMovies(12);
      setMoreMoviesCount(3);
    } else if (screenWidth >= 768 && screenWidth < 1280) {
      setMoviesCount(8);
      setShowMovies(8);
      setMoreMoviesCount(2);
    } else if (screenWidth < 768) {
      setMoviesCount(5);
      setShowMovies(5);
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

  console.log();

  return (
    <section className="movies">
      {isPreloaderActive ? (
        <Preloader />
      ) : (
        <>
          <ul className="movies__list">
            {movies.length > 0 ? location.pathname === "/movies" ? (
              movies.slice(4, showMovies).map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie.id || movie.movieId}
                    isMoviesLiked={isMoviesLiked}
                    savedMovies={savedMovies}
                    onCardSave={onCardSave}
                    onCardDelete={onCardDelete}
                  />
                );
              })
            ) : (
              movies.map((movie) => {
                return (
                  <MoviesCard
                    movie={movie}
                    key={movie.id || movie.movieId}
                    isMoviesLiked={isMoviesLiked}
                    savedMovies={savedMovies}
                    onCardSave={onCardSave}
                    onCardDelete={onCardDelete}
                  />
                );
              })
            ) : (
              <p className="movies__info">Ничего не найдено</p>
            )}
          </ul>
          {location.pathname === "/movies" && movies.length > showMovies ? (
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
        </>
      )}
    </section>
  );
}

export default MoviesCardList;