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
  moviesFound,
  isPreloaderActive,
}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [moviesCount, setMoviesCount] = useState(0);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
    // handleMoviesButtonClick();
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, []);

  const renderMovies = (showMovies) => {
    if (location.pathname === "/movies") {
      return movies.slice(0, showMovies).map((movie) => {
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
      {isPreloaderActive ? (<Preloader />) : (
      <>
      <ul className="movies__list">
      {(moviesFound === false && movies.length === 0) 
      ? (<p className="movies__text">Ничего не найдено</p>) 
      : renderMovies(showMovies)}
      </ul>      
      {location.pathname === "/movies" && movies.length > showMovies ? (
        <button
          className="movies__more"
          type="button"
          onClick={handleMoviesButtonClick}
        >
          Ещё
        </button>
      ) : ("")}
      </>
    )}
    </section>
  )}


export default MoviesCardList;
