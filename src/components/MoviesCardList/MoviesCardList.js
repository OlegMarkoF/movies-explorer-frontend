import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  savedMovies,
  onCardDelete,
  isPreloaderActive,
  onCardSave,
  moviesFound,
  movies,
}) {
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  // const [moviesCount, setMoviesCount] = useState(0);
  const [moreMoviesCount, setMoreMoviesCount] = useState(0);
  const [showMovies, setShowMovies] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // hendleMoviesCounter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hendleMoviesCounter()
    window.addEventListener("resize", handleScreenWidth);
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, [movies]);

  const handleMoviesButtonClick = () => {
    setShowMovies(showMovies + moreMoviesCount);
  };

  const handleScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  const hendleMoviesCounter = () => {
    if (screenWidth >= 1280) {
      // setMoviesCount(12);
      setShowMovies(12);
      setMoreMoviesCount(3);
    } else if (screenWidth >= 800 && screenWidth < 1280) {
      // setMoviesCount(8);
      setShowMovies(8);
      setMoreMoviesCount(2);
    } else if (screenWidth < 800) {
      // setMoviesCount(5);
      setShowMovies(5);
      setMoreMoviesCount(2);
    }
  };

  const renderMovies = () => {
    if (location.pathname === "/saved-movies") {
      return savedMovies.map((movie) => {
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
    } else {
      return movies.slice(0, showMovies).map((movie) => {
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
      {isPreloaderActive ? (
        <Preloader />
        ) : (
        <>
          <ul className="movies__list">
            {(moviesFound !== false) 
            ? (
              renderMovies()
            ) : (
              <p className="movies__text">Ничего не найдено</p>
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
